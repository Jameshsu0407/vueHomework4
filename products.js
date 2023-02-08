import {apiUrl, apiPath} from './config.js'
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
// 匯入分頁元件
import pagination from "./components/pagination.js";
// 匯入新增、編輯元件
import productModal from './components/productModal.js';
// 匯入刪除元件
import delProductModal from './components/delProductModal.js'

const app = createApp({
	data() {
		return {
			products: [],
			tempProduct: {},
			pagination: {},
			isNew: false,
		};
	},
	methods: {
		/**
		 * 確認是否登入
		 */
		checkLogin() {
			const url = `${apiUrl}/api/user/check`;
			axios
				.post(url)
				.then(() => {
					this.getData();
				})
				.catch((err) => {
					alert(err.data.message);
					window.location = "login.html";
				});
		},
		/**
		 * 取得資料
		 */
		getData(page = 1) {
			const url = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;
			axios
				.get(url)
				.then((res) => {
					const {products, pagination} = res.data;
					this.products = products;
					this.pagination = pagination;
					console.log(this.products);
				})
				.catch((err) => {
					alert(err.data.message);
				});
		},
		/**
		 * 打開modal
		 * @param   {[string]}  status   [狀態：新增、編輯、刪除]
		 * @param   {[object]}  product  [待處理的產品]
		 */
		openModal(status, product) {
			switch (status) {
				case "ADD":
					this.isNew = true;
					this.tempProduct = {};
					this.tempProduct.imagesUrl = [];
					this.$refs.productModal.showModal();
					break;
				case "EDIT":
					this.isNew = false;
					this.tempProduct = JSON.parse(JSON.stringify(product));
					this.tempProduct.imagesUrl ??= [];
					this.$refs.productModal.showModal();
					break;
				case "DELETE":
					this.tempProduct = { ...product };
					this.$refs.delProductModal.showModal();
					break;
				default:
					break;
			}
		}
	},
	components: {
		pagination, productModal, delProductModal
	},
	mounted() {
		// 取出 Token
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)cationToken\s*=\s*([^;]*).*$)|^.*$/,
			"$1"
		);
		axios.defaults.headers.common.Authorization = token;
		this.checkLogin();
	},
});

app.mount("#app");
