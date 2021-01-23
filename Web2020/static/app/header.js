Vue.component('my-header', {
    data: function(){
        return {
            drop: false,
            user: null,
        }
    },
    template:/*html*/`
    <div class="row" style="height:70px;background-color:darkslategray;">
        <div class="col" style="height:100%">
            <div class="row" style="height:100%">
                <div class="col-2">
                    <h2 class="mt-3 text-light pointer-cursor" v-on:click="goToLandingPage()" style="width:150px;">Web2020</h2>
                </div>
                <div class="col"></div>
                <div class="col-1 my-auto">
                    <div class="row h-100">
                        <div class="text-center border-0 rounded-circle p-0 pointer-cursor" v-on:click="toggleDrop()" style="width:40px; height:40px; background-color:white;" >
                            <img src="icons/menu.png" class="menu-image p-0" style="width:25px">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2">

                </div>
                <div class="col">
                    
                </div>
                <div class="col-1">
                    <div class="container border shadow dropdown" v-if="drop">
                        <div class="row menu-item mt-1 mb-1 pointer-cursor" v-if="checkUser()" v-on:click="login()">
                            <span class="my-auto">Ulogujte se</span>
                        </div>
                        <div class="row menu-item mt-1 mb-1 pointer-cursor" v-if="checkUser()">
                            <span class="my-auto" v-on:click="registracija()">Registrujte se</span>
                        </div>
                        <div class="row menu-item mt-1 mb-1 pointer-cursor" v-if="!checkUser()">
                            <span class="my-auto" v-on:click="goToDashboard()">Vaš profil</span>
                        </div>
                        <div class="row menu-item mt-1 mb-1 pointer-cursor" v-if="!checkUser()">
                            <span class="my-auto" v-on:click="goToDashboardRez()">Vaše rezervacije</span>
                        </div>
                        <div class="row menu-item mt-1 mb-1 pointer-cursor" v-if="!checkUser()">
                            <span class="my-auto" v-on:click="logout()">Izlogujte se</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        checkUser: function(){
            this.user = JSON.parse(localStorage.getItem("user"));
            if(this.user == null){
                return true;
            }
            else {
                return false;
            }
        },
        toggleDrop: function(){
            this.drop = !this.drop;
        },
        login: function(){
            this.toggleDrop();
            this.$router.push({name: "login", query: {putanja :this.$route.fullPath}})
        },
        logout: function(){
            this.toggleDrop();
            localStorage.removeItem("user");
            this.$root.$emit("logout");
            this.user = null;
        },
        registracija: function(){
            this.toggleDrop();
            this.$router.push({name: "registracija"});
        },
        goToLandingPage: function(){
            this.toggleDrop();
            this.$router.push({name: "landingPage"});
        },
        goToDashboard: function(){
            this.toggleDrop();
            this.$router.push({name: "dashboard"});
            this.$root.$emit("promeniTab", 0);
        },
        goToDashboardRez: function(){
            this.toggleDrop();
            this.$router.push({name: "dashboard", params: {tab: 1}});
            this.$root.$emit("promeniTab", 1);
        }
    } 
})