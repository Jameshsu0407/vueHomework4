import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
	data() {
		return {
			loginInfo: {
				username: "",
				password: "",
			},
		};
	},
	methods: {
		login() {
			const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
			axios
				.post(api, this.loginInfo)
				.then((res) => {
					const { token, expired } = res.data;
                    // 將token expired存到cookie
                    document.cookie = `cationToken=${token}; expires=${new Date(expired)};`
					window.location = "products.html";
				})
				.catch((err) => {
                    alert(err.data.message);
				});
		},
	},
}).mount("#app");
