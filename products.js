import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let productModal = null;
let delModal = null;

const app = createApp({
	data() {
		return {
			apiUrl: "https://vue3-course-api.hexschool.io/v2",
			apiPath: "cation_api",
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
			const url = `${this.apiUrl}/api/user/check`;
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
			const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
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
					productModal.show();
					break;
				case "EDIT":
					this.isNew = false;
					this.tempProduct = JSON.parse(JSON.stringify(product));
					this.tempProduct.imagesUrl ??= [];
					productModal.show();
					break;
				case "DELETE":
					this.tempProduct = { ...product };
					delModal.show();
					break;
				default:
					break;
			}
		}
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

// 分頁元件
app.component('pagination', {
	template: '#pagination',
	props: ['pagination'],
	methods: {
		emitPages(item){
			this.$emit('emit-pages', item);
		}
	},
});

// 新增、編輯元件
app.component('productModal', {
	template: '#productModal',
	props: ['tempProduct', 'isNew', 'apiUrl', 'apiPath'],
	mounted() {
		productModal = new bootstrap.Modal(document.getElementById("productModal"));
	},
	methods: {
		/**
		 * 新增/修改
		 * @param   {[object]}  product  [待處理的產品]
		 */
		updateProduct(product, apiUrl, apiPath, isNew) {
			let url = `${apiUrl}/api/${apiPath}/admin/product`;
			let http = "post";

			if (!isNew) {
				url = `${apiUrl}/api/${apiPath}/admin/product/${product.id}`;
				http = "put";
			}

			axios[http](url, { data: product })
				.then((response) => {
					alert(response.data.message);
					productModal.hide();
					this.$emit('update');
				})
				.catch((err) => {
					alert(err.data.message);
				});
		},
	}
});

// 刪除元件
app.component('delProductModal', {
	template: '#delProductModal',
	props: ['tempProduct', 'apiUrl', 'apiPath'],
	mounted() {
		delModal = new bootstrap.Modal(document.getElementById("delProductModal"));
	},
	methods: {
		/**
		 * 刪除
		 */
		delProduct(product, apiUrl, apiPath) {
			const url = `${apiUrl}/api/${apiPath}/admin/product/${product.id}`;

			axios
				.delete(url)
				.then((response) => {
					alert(response.data.message);
					delModal.hide();
					this.$emit('update');
				})
				.catch((err) => {
					alert(err.data.message);
				});
		},
	}
});

app.mount("#app");
