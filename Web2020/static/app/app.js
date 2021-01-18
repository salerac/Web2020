const Login = { template: '<login-page></login-page>' }
const PregledApartmana = { template: '<pregled-apartmana></pregled-apartmana>' }
const LandingPage = { template: '<landing-page></landing-page>' }
const UnosApartmana = { template: '<unos-apartmana></unos-apartmana>' }

const router = new VueRouter({
	mode: 'hash',
	routes:[
		{
			path: "",
			component: LandingPage
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/pregled",
			name: "pregled",
			component: PregledApartmana,
		}
	]
});


var app = new Vue({ 
	router,
	el: '#main',
	data: {
		user: {}
	}
});