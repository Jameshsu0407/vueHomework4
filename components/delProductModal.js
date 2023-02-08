// 刪除元件

// 匯入 path 來使用
import { apiUrl, apiPath } from '../config.js';

// 匯出
export default{
    template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
        aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 id="delProductModalLabel" class="modal-title">
                        <span>刪除產品</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    是否刪除
                    <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        取消
                    </button>
                    <button type="button" class="btn btn-danger" @click="delProduct(tempProduct)">
                        確認刪除
                    </button>
                </div>
            </div>
        </div>
    </div>`,
    props: ['tempProduct'],
    data() {
        return{
            delModal: null
        }
    },
	mounted() {
		this.delModal = new bootstrap.Modal(document.getElementById("delProductModal"));
	},
	methods: {
        /**
         * 打開modal
         */
        showModal() {
            this.delModal.show();
        },
        /**
         * 關閉modal
         */
        hideModal() {
            this.delModal.hide();
        },
		/**
		 * 刪除
		 */
		delProduct(product) {
			const url = `${apiUrl}/api/${apiPath}/admin/product/${product.id}`;

			axios
				.delete(url)
				.then((response) => {
					alert(response.data.message);
					this.hideModal();
					this.$emit('update');
				})
				.catch((err) => {
					alert(err.data.message);
				});
		},
	}
}