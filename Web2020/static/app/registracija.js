Vue.component('registracija',{
    data: function(){
        return {
            user: {
                username: "",
                ime: "",
                prezime: "",
                lozinka: "",
                pol: null,
            },
            potvrda: null,
            showPol: "Odaberite pol",
            showUsernameError: false,
            showLozinkaError: false,
            showPoljaError: false,
            alertText: null,
            alertError: false,
        }
    },
    template:/*html*/`
    <div class="component-fluid h-100">
        <div class="row h-100">
            <div class="col"></div>
            <div class="col-3 p-3 border shadow my-auto" style="width:470px">
                <div class="row text-center mt-2 mb-0">
                    <h3><b>Registracija</b></h3>
                </div>
                <hr class="mt-2"/>
                <div class="row">
                    <h5><b>Unesite korisničko ime</b></h5>
                </div>
                <div class="row">
                    <span class="small">Korisničko ime mora biti jedinstveno.</span>
                </div>
                <div class="row">
                    <div class="col">
                        <input class="login-input form-control form-control-good" v-model="user.username" placeholder="Korisničko ime">
                    </div>
                </div>
                <div class="row">
                    <span class="small" v-if="showUsernameError" style="color:red">Korisničko ime nije jedinstveno.</span>
                </div>
                <div class="row mt-2">
                    <h5><b>Unesite ime</b></h5>
                </div>
                <div class="row">
                    <div class="col">
                        <input class="login-input form-control form-control-good" v-model="user.ime" placeholder="Ime">
                    </div>
                </div>
                <div class="row mt-2">
                    <h5><b>Unesite prezime</b></h5>
                </div>
                <div class="row">
                    <div class="col">
                        <input class="login-input form-control form-control-good" v-model="user.prezime" placeholder="Prezime">
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col">
                        <button class="btn border btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           {{showPol}}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" v-on:click="staviMuski()">Muški</a>
                            <a class="dropdown-item" v-on:click="staviZenski()">Ženski</a>
                        </div>
                    </div>
                    <div class="col"></div>
                </div>
                <div class="row mt-2">
                    <h5><b>Unesite lozinku</b></h5>
                </div>
                <div class="row">
                    <div class="col">
                        <input class="login-input form-control form-control-good" type="password" v-model="user.lozinka" v-on:input="proveriLozinke()" placeholder="Lozinka">
                    </div>
                </div>
                <div class="row mt-2">
                    <h5><b>Potvrdite lozinku</b></h5>
                </div>
                <div class="row">
                    <span class="small">Lozinke se moraju poklapati.</span>
                </div>
                <div class="row">
                    <div class="col">
                        <input class="login-input form-control form-control-good" type="password" v-model="potvrda" v-on:input="proveriLozinke()" placeholder="Potvrda">
                    </div>
                </div>
                <div class="row">
                    <span class="small" v-if="showLozinkaError" style="color:red">Lozinke se ne podudaraju.</span>
                </div>
                <div class="row">
                    <div class="col mt-3">
                        <button class="btn btn-success login-btn" v-on:click="submit()" :disabled="proveriUslove()">Registrujte se</button>
                    </div>
                </div>
                <div class="row mb-2 mt-1">
                    <span class="small" v-if="showPoljaError" style="color:red">Morate uneti sva polja.</span>
                </div>
                <div class="moj-alert alert alert-danger text-center" role="alert" v-show="alertError">
                    <b>{{alertText}}</b>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>
    `,
    methods: {
        staviMuski: function(){
            this.user.pol = false;
            this.showPol = "Muški";
        },
        staviZenski: function(){
            this.user.pol = true;
            this.showPol = "Ženski";
        },
        proveriLozinke: function(){
            console.log("usao")
            if(this.user.lozinka != this.potvrda){
                this.showLozinkaError = true
            }
            else{
                this.showLozinkaError = false;
            }
        },
        proveriUslove: function(){
            if(this.showLozinkaError == true || this.showUsernameError == true){
                return true;
            }
            else{
                return false;
            }
        },
        submit: function(){
            if(this.user.username == "" || this.user.lozinka == "" || this.user.ime == "" || this.user.prezime == "" || this.user.pol == null || this.showLozinkaError == true){
                this.showPoljaError = true;
                return;
            }
            user = JSON.parse(localStorage.getItem('user'));
            if(user != null){  
                header = "Bearer " + user.jwt;
                options = {
                    headers: {'Authorization': header}
                }
                path = "/admin/registerDomacin"
            } else {
                path = "/registerGost";
                options = null
            }
            axios
                .post(path, this.user, options)
                .then(response => {
                    if(user != null){
                        this.$router.push({name: "dashboard"});
                    }
                    else{ 
                    window.localStorage.setItem('user', JSON.stringify(response.data));
                    this.$router.push({name: "landingPage"});
                    }
                })
                .catch(error => {
                    this.alertError = true;
                    this.alertText = error.response.data['message'];
                });
        }
    }
})