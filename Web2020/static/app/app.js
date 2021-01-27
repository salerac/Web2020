const Login = { template: '<login-page></login-page>' }
const PregledApartmana = { template: '<pregled-apartmana></pregled-apartmana>' }
const LandingPage = { template: '<landing-page></landing-page>' }
const UnosApartmana = { template: '<unos-apartmana></unos-apartmana>' }
const ApartmanPrikaz = { template: '<apartman-prikaz></apartman-prikaz>' }
const Rezervacija = { template: '<rezervacija></rezervacija>' }
const Registracija = { template: '<registracija></registracija>' }
const Dashboard = { template: '<dashboard></dashboard>' }
const pregledKorisnika = { template: '<pregled-korisnika></pregled-korisnika>' }
const Unauthorized = { template: '<unauthorized></unauthorized>' }

const router = new VueRouter({
	mode: 'hash',
	routes:[
		{
			path: "",
			component: LandingPage,
			name: "landingPage"
		},
		{
			path: "/login",
			name: "login",
			component: Login,
			props: true
		},
		{
			path: "/pregled",
			name: "pregled",
			component: PregledApartmana,
		},
		{
			path: "/unosApartmana",
			name: "unosApartmana",
			component: UnosApartmana
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
		},
		{
			path: "/registracija",
			name: "registracija",
			component: Registracija
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: Dashboard,
			props: true
		},
		{
			path: "/pregledKorisnika",
			name: "pregledKorisnika",
			component: pregledKorisnika,
			props: true,
		},
		{
			path: "/unauthorized",
			name: "unauthorized",
			component: Unauthorized
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