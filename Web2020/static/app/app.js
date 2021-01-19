const Login = { template: '<login-page></login-page>' }
const PregledApartmana = { template: '<pregled-apartmana></pregled-apartmana>' }
const LandingPage = { template: '<landing-page></landing-page>' }
const UnosApartmana = { template: '<unos-apartmana></unos-apartmana>' }
const ApartmanPrikaz = { template: '<apartman-prikaz></apartman-prikaz>' }
const Rezervacija = { template: '<rezervacija></rezervacija>' }

const router = new VueRouter({
	mode: 'hash',
	routes:[
		{
			path: "",
			component: LandingPage
		},
		{
			path: "/login",
			name: "login",
			component: Login
		},
		{
			path: "/pregled",
			name: "pregled",
			component: PregledApartmana,
		},
		{
			path: "/apartman",
			name: "apartman",
			component: ApartmanPrikaz,
		},
		{
			path: "/rezervacija",
			name: "rezervacija",
			component: Rezervacija
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