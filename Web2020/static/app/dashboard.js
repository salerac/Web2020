Vue.component('dashboard', {
    data: function(){
        return{
            user: null,
            komponente: [],
            trenutnaKomponenta: 0,
            props: ["tab"],
            gost: false,
            domacin: false,
            admin: false,
            apartmanId: null,
            globalKey: 0,
            promenio: false,
        }
    },
    template:/*html*/`
    <div class="container-fluid">
        <div class="row">
            <div class="col-2">
            </div>
            <div class="col">
                <div class="row">
                    <div class="col-1 border-right">
                        <div class="row pointer-cursor shadow" :ref="getRef(0)" v-on:click="selektujTab($event,0,getRef(0))">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/user1.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                        <div class="row pointer-cursor" v-if="gost" :ref="getRef(1)" v-on:click="selektujTab($event,1,getRef(1))">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/calendar1.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                        <div class="row pointer-cursor" v-if="domacin || admin"  :ref="getRef(1)" v-on:click="selektujTab($event,1,getRef(1))">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/home.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                        <div class="row pointer-cursor" v-if="admin" :ref="getRef(2)" v-on:click="selektujTab($event,2,getRef(2))">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/calendar1.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                        <div class="row pointer-cursor" v-if="admin"  :ref="getRef(3)" v-on:click="selektujTab($event,3,getRef(3))">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/customer.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                        <div class="row pointer-cursor" v-if="admin"  :ref="getRef(4)" v-on:click="selektujTab($event,4,getRef(4))">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/sadrzaj.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                        <div class="row pointer-cursor" v-if="domacin"  :ref="getRef(3)" v-on:click="selektujTab($event,3,getRef(3))">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/closed.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                        <div class="row pointer-cursor" v-if="domacin"  :ref="getRef(4)" v-on:click="selektujTab($event,4,getRef(4))">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/customer.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <transition name="fade" mode="out-in">
                            
                                <component :is="komponente[trenutnaKomponenta]" :key="globalKey" :domacin="isDomacin()" :admin="isAdmin()" :apartmanId="apartmanId" :neaktivni="getNeaktivni()"></component>

                        </transition>
                    </div>
                    <div class="col-1"></div>
                </div>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
    `,
    methods: {
        selektujTab: function(e,komponenta,j){
            console.log(komponenta)
            console.log(j)
            this.trenutnaKomponenta = komponenta;
            for(var ref in this.$refs){
                this.$refs[ref].className = "row pointer-cursor";
            }
            this.$refs[j].className = "row pointer-cursor shadow";
        },
        getRef: function(i){
            if(this.gost == true){
                return i; 
            }
            if(this.domacin == true){
                return i+100; 
            }
            if(this.admin == true){
                return i+200; 
            }
        },
        getNeaktivni: function(){
            if(this.trenutnaKomponenta == 3){
                return true;
            }
            else return false;
        },
        isDomacin: function(){
            if(this.user.uloga == "DOMACIN"){
                return true;
            }
            else return false;
        },
        isAdmin: function(){
            if(this.user.uloga == "ADMINISTRATOR"){
                return true;
            }
            else return false;
        }
    },
    created: function(){
        this.$root.$on('logout',() => {
            if(!this._inactive){    
                //this.$router.push({name: "login", query: {putanja :this.$route.fullPath}});
                this.$router.push({name: "login", params: {putanja: this.$route.name}});
            }
        });
        this.$root.$on("rezervacije", (id) => {
            console.log("usao")
            this.apartmanId = id;
            this.trenutnaKomponenta = 2;
        })
        this.$root.$on('back',() => {
            this.trenutnaKomponenta = 1;
        });
        this.$root.$on('login',() => {
            //this.$forceUpdate();
        });
        this.$root.$on('promeniTab',(i) => {
            this.selektujTab(null, i, this.getRef(i));
        });
        this.$root.$on("izmena", () => {
            /*this.alert = true;
            setTimeout(() => {
                this.alert = false;
            }, 2000);*/
            this.globalKey++;
        })
    },
    mounted: function(){
        this.user = JSON.parse(localStorage.getItem('user'));
        if(this.user.uloga == "GOST"){
            this.gost = true
            this.komponente = ["licni-podaci", "pregled-rezervacija"];
        }
        else if(this.user.uloga == "DOMACIN"){
            this.domacin = true;
            this.komponente = ["licni-podaci", "pregled-apartmana", "pregled-rezervacija", "pregled-apartmana-neaktivni", "pregled-korisnika"]
        }
        else if(this.user.uloga == "ADMINISTRATOR"){
            this.admin = true;
            this.komponente = ["licni-podaci", "pregled-apartmana", "pregled-rezervacija","pregled-korisnika","pregled-sadrzaja"]
        }
    },
    updated: function(){
        if(this.promenio == false){ 
            if(this.$route.params.tab != null){
                this.selektujTab(null, this.$route.params.tab, this.getRef(this.$route.params.tab));
                this.promenio = true;
            }
        }
    }
})