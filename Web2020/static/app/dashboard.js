Vue.component('dashboard', {
    data: function(){
        return{
            komponente: [],
            trenutnaKomponenta: 0

        }
    },
    template:/*html*/`
    <div class="container-fluid">
        <my-header></my-header>
        <div class="row">
            <div class="col-2">
            </div>
            <div class="col">
                <div class="row">
                    <div class="col-1 border-right">
                        <div class="row pointer-cursor shadow" :ref="0" v-on:click="selektujTab($event,0)">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/osoba.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                        <div class="row pointer-cursor" :ref="1" v-on:click="selektujTab($event,1)">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/calendar.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <transition name="fade" mode="out-in">
                            <keep-alive>
                                <component :is="komponente[trenutnaKomponenta]"></component>
                            </keep-alive>
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
        selektujTab: function(e,i){
            this.trenutnaKomponenta = i;
            for(var ref in this.$refs){
                this.$refs[ref].className = "row pointer-cursor";
            }
            this.$refs[i].className = "row pointer-cursor shadow";
        }
    },
    created: function(){
        this.$root.$on('logout',() => {
            if(!this._inactive)
            this.$router.replace({name: "login", query: {putanja :this.$route.fullPath}});
        })
        this.$root.$on('login',() => {
            this.$forceUpdate();
        })
    },
    mounted: function(){
        user = JSON.parse(localStorage.getItem('user'));
        if(user.uloga == "GOST"){
            this.komponente = ["licni-podaci", "pregled-rezervacija"];
        }
    },
})