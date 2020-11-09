const Login = { template: '<login-page></login-page>'}

const router = new VueRouter({
	mode: 'hash',
	routes:[
		{path: "/login", component: Login}
	]
});


var app = new Vue({ 
	router,
	el: '#main',
	data: {
		user: {}
	}
});