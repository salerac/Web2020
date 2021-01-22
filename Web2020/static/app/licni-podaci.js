Vue.component('licni-podaci', {
    data: function(){
        return{
            get user() {
                return JSON.parse(localStorage.getItem('user')) || 0;
            },
            izmenjenUser: null,
            izmena: true,
            lozinkaUneta: false,
            lozinkaProvera: "",
            lozinkaNetacna: false,
            lozinkeSePodudaraju: false,
            novaLozinka: "",
            potvrda: "",
            showPoljaError: false,
        }
    },
    template:/*html*/`
    <div class="container-fluid">
        <div class="row">
            <div class="col p-3 pt-2" style="width:470px">
                <div class="row mt-1 mb-0">
                    <h3><b>Vaši podaci</b></h3>
                </div>
                <hr class="mt-2"/>
                <div class="row">
                    <h5><b>Korisničko ime</b></h5>
                </div>
                <div class="row">
                    <span class="small">Korisničko ime mora biti jedinstveno.</span>
                </div>
                <div class="row">
                    <div class="col">
                        <input class="login-input form-control form-control-good" placeholder="Korisničko ime" v-model="izmenjenUser.username" disabled="true">
                    </div>
                </div>
                <div class="row mt-2">
                    <h5><b>Ime</b></h5>
                </div>
                <div class="row">
                    <div class="col">
                        <input class="login-input form-control form-control-good" placeholder="Ime" v-model="izmenjenUser.ime" :disabled="izmena">
                    </div>
                </div>
                <div class="row mt-2">
                    <h5><b>Prezime</b></h5>
                </div>
                <div class="row">
                    <div class="col">
                        <input class="login-input form-control form-control-good" placeholder="Prezime" v-model="izmenjenUser.prezime" :disabled="izmena">
                    </div>
                </div>
                <div class="row mt-2">
                    <h5><b>Pol</b></h5>
                </div>
                <div class="row mt-2">
                    <div class="col">
                        <button class="btn border btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="izmena">
                            {{getPol()}}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item pointer-cursor" v-on:click="staviMuski()">Muški</a>
                            <a class="dropdown-item pointer-cursor" v-on:click="staviZenski()">Ženski</a>
                        </div>
                    </div>
                    <div class="col"></div>
                </div>
                <div class="row mt-2" v-if="lozinkaUneta">
                    <h5><b>Nova Lozinka</b></h5>
                </div>
                <div class="row" v-if="lozinkaUneta">
                    <div class="col">
                        <input type="password" class="login-input form-control form-control-good" v-on:input="proveriLozinke()" v-model="izmenjenUser.lozinka" placeholder="Lozinka">
                    </div>
                </div>
                <div class="row mt-2" v-if="lozinkaUneta">
                    <h5><b>Potvrdite lozinku</b></h5>
                </div>
                <div class="row">
                    <span class="small" v-if="lozinkaUneta">Lozinke se moraju poklapati.</span>
                </div>
                <div class="row" v-if="lozinkaUneta">
                    <div class="col">
                        <input type="password" class="login-input form-control form-control-good" v-on:input="proveriLozinke()" v-model="potvrda" placeholder="Potvrda">
                    </div>
                </div>
                <div class="row">
                    <span class="small" style="color:red" v-if="lozinkeSePodudaraju">Lozinke se ne podudaraju.</span>
                </div>
                <div class="row">
                    <div class="col mt-3">
                        <button v-show="lozinkaUneta" v-on:click="odustani()" type="button" class="btn btn-light border">Odustani</button>
                        <button v-show="lozinkaUneta" v-on:click="submit()" type="button" class="btn btn-danger border">Izmeni</button>
                        <button v-show="!lozinkaUneta" type="button" class="btn btn-danger" v-on:click="showModal()">Izmeni</button>
                    </div>
                    <div class="row mb-2 mt-1">
                        <span class="small" v-if="showPoljaError" style="color:red">Morate uneti sva polja.</span>
                    </div>
                </div>
                <div class="moj-alert alert alert-danger text-center" role="alert">
                    <b></b>
                </div>
            </div>
            <div class="col"></div>
        </div>


        <!-- Modal -->
        <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered" style="width:300px;">
            <!-- Modal content-->
            <div class="modal-content my-modal">
                <div class="modal-body">
                    <p>Unesite lozinku:</p>
                    <input type="password" class="login-input form-control form-control-good mt-2" v-model="lozinkaProvera" placeholder="Lozinka">
                    <span class="small mt-2" style="color:red" v-if="lozinkaNetacna">Lozinka netačna.</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary mt-1" v-on:click="proveriLozinku">Pošalji</button>
                </div>
            </div>
        </div>
        </div>

        <input :value="user.id" v-on:change="logout()" style="display:none">
    </div>
    `,
    methods: {
        getPol: function(){
            if(this.izmenjenUser.pol == false){
                return "Muški";
            }
            else{
                return "Ženski";
            }
        },
        staviMuski: function(){
            this.izmenjenUser.pol = false;
        },
        staviZenski: function(){
            this.izmenjenUser.pol = true;
        },
        proveriLozinke: function(){
            if(this.izmenjenUser.lozinka != this.potvrda){
                this.lozinkeSePodudaraju = true
            }
            else{
                this.lozinkeSePodudaraju = false;
            }
        },
        proveriLozinku: function(){
            axios
            .post('/login', {"username": ''+this.user.username, "lozinka": ''+this.lozinkaProvera})
            .then(response => {
                this.lozinkaUneta = true;
                this.izmenjenUser.staraLozinka = this.lozinkaProvera;
                $('#myModal').modal('hide');
                this.izmena = false;
            })
            .catch(error => {
                this.lozinkaNetacna = true;
            })
        },
        showModal: function(){
            $('#myModal').modal('show');
        },
        odustani: function(){
            this.lozinkaUneta = false;
            this.izmena = true;
            this.izmenjenUser = this.user;
            this.izmenjenUser.lozinka = "";
        },
        submit: function(){
            if(this.izmenjenUser.username == "" || this.izmenjenUser.ime == "" || this.izmenjenUser.prezime == "" || this.izmenjenUser.pol == null || this.lozinkeSePodudaraju == true){
                this.showPoljaError = true;
                return;
            }
            header = "Bearer " + this.user.jwt;
            axios
                .post("/gost/editGost", this.izmenjenUser, {headers: {'Authorization': header}})
                .then(response => {
                    window.localStorage.setItem('user', JSON.stringify(response.data));
                    this.lozinkaUneta = false;
                    this.izmena = false;
                    this.$router.push({name: "landingPage"});
                })
                .catch(error => {
                    this.alertError = true;
                    this.alertText = error.response.data['message'];
                });
        }

    },
    mounted: function(){
        if(localStorage.getItem("user") == null){
            this.$router.push({name: "login", query: {putanja :this.$route.fullPath}});
        }else{ 
        this.izmenjenUser = this.user;
        this.izmenjenUser.lozinka = "";
        }
    },
    created: function(){
        this.$root.$on('login',() => {
            this.izmenjenUser = this.user;
        })
    }
})