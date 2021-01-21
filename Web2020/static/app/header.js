Vue.component('my-header', {
    data: function(){
        return {
            drop: false

        }
    },
    template:/*html*/`
    <div class="row" style="height:70px;background-color:darkslategray;">
        <div class="col" style="height:100%">
            <div class="row" style="height:100%">
                <div class="col-2">
                    <h2 class="mt-3 text-light">Web2020</h2>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        checkUser: function(){
            user = JSON.parse(localStorage.getItem("user"));
            if(user == null){
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
            this.$router.push({name: "login"})
        },
        registracija: function(){
            this.$router.push({name: "registracija"});
        }
    } 
})