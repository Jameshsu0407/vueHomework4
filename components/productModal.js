// 新增、編輯元件

// 匯入 path 來使用
import { apiUrl, apiPath } from '../config.js';

// 匯出
export default{
    template: `<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h4 id="productModalLabel" class="modal-title">
                        <span>{{isNew ? '新增產品' : '編輯產品'}}</span>
                    </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="mb-2">
                                <div class="mb-3">
                                    <label for="imageUrl" class="form-label">主要圖片</label>
                                    <input type="text" class="form-control" placeholder="請輸入圖片連結"
                                        v-model="tempProduct.imageUrl">
                                </div>
                                <img class="img-fluid" :src="tempProduct.imageUrl">
                            </div>
                            <label class="form-label">其他圖片</label>

                            <div v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                                <div class="mb-2">
                                    <div class="mb-3">
                                        <label for="imagesUrl" class="form-label">圖片網址</label>
                                        <input type="text" class="form-control" placeholder="請輸入圖片連結"
                                            v-model="tempProduct.imagesUrl[key]">
                                    </div>
                                    <img class="img-fluid" :src="image">
                                </div>
                                <div class="mb-3">
                                    <button class="btn btn-outline-danger btn-sm d-block w-100"
                                        @click="tempProduct.imagesUrl.splice(key, 1)">
                                        刪除圖片
                                    </button>
                                </div>
                            </div>

                            <!-- 陣列不得為空 且 網址不得為空 且 出現在頭尾-->
                            <div class="mb-3" v-if="tempProduct.imagesUrl !== undefined && 
                            !tempProduct.imagesUrl.includes('') && 
                            (tempProduct.imagesUrl.length == 0 || tempProduct.imagesUrl.length)">
                                <button class="btn btn-outline-primary btn-sm d-block w-100"
                                    @click="tempProduct.imagesUrl.push('')">
                                    新增圖片
                                </button>
                            </div>

                        </div>
                        <div class="col-sm-8">
                            <div class="mb-3">
                                <label for="title" class="form-label">標題</label>
                                <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                                    v-model="tempProduct.title">
                            </div>

                            <div class="row">
                                <div class="mb-3 col-md-6">
                                    <label for="category" class="form-label">分類</label>
                                    <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                                        v-model="tempProduct.category">
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="price" class="form-label">單位</label>
                                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                                        v-model="tempProduct.unit">
                                </div>
                            </div>

                            <div class="row">
                                <div class="mb-3 col-md-6">
                                    <label for="origin_price" class="form-label">原價</label>
                                    <input id="origin_price" type="number" min="0" class="form-control"
                                        placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="price" class="form-label">售價</label>
                                    <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                                        v-model.number="tempProduct.price">
                                </div>
                            </div>
                            <hr>

                            <div class="mb-3">
                                <label for="description" class="form-label">產品描述</label>
                                <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                                    v-model="tempProduct.description">
                </textarea>
                            </div>
                            <div class="mb-3">
                                <label for="content" class="form-label">說明內容</label>
                                <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                                    v-model="tempProduct.content">
                </textarea>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1"
                                        :false-value="0" v-model="tempProduct.is_enabled">
                                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        取消
                    </button>
                    <button type="button" class="btn btn-primary" @click="updateProduct(tempProduct, isNew)">
                        確認
                    </button>
                </div>
            </div>
        </div>
    </div>`,
    props: ['tempProduct', 'isNew'],
    data() {
        return {
            modal: null,
        }
    },
	mounted() {
        // 初始化時先將跳窗元素存到 modal
		this.modal = new bootstrap.Modal(document.getElementById("productModal"));
	},
	methods: {
        /**
         * 打開modal
         */
        showModal() {
            this.modal.show();
        },
        /**
         * 關閉modal
         */
        hideModal() {
            this.modal.hide();
        },
		/**
		 * 新增/修改
		 * @param   {[object]}  product  [待處理的產品]
		 */
		updateProduct(product, isNew) {
			let url = `${apiUrl}/api/${apiPath}/admin/product`;
			let http = "post";

			if (!isNew) {
				url = `${apiUrl}/api/${apiPath}/admin/product/${product.id}`;
				http = "put";
			}

			axios[http](url, { data: product })
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