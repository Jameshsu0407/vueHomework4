// 分頁元件

// 匯出
export default {
    template: `<nav aria-label="Page navigation example">
        <ul class="pagination">
            <!-- 上一頁 -->
            <li class="page-item"
                :class="pagination.current_page == 1 ? 'disabled' : '' ">
                <a  @click.prevent="emitPages(pagination.current_page - 1)"
                    class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <!-- 頁數 -->
            <li v-for="(item, index) in pagination.total_pages"
                :key="index"
                class="page-item"
                :class="item === pagination.current_page ? 'active' : '' ">
                <a class="page-link" href="#" @click.prevent="emitPages(item, pagination.current_page)">{{item}}</a>
            </li>
            <!-- 下一頁 -->
            <li class="page-item"
                :class="pagination.current_page == pagination.total_pages ? 'disabled' : '' ">
                <a  @click.prevent="emitPages(pagination.current_page + 1)"
                    class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`,
	props: ['pagination'],
	methods: {
		emitPages(page, currentPage){
			if(page !== currentPage){
				this.$emit('emit-pages', page);
			}
		}
	},
}