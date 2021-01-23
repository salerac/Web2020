Vue.component('dashboard', {
    data: function(){
        return{
            komponente: [],
            trenutnaKomponenta: 0,
            props: ["tab"],
            gost: false,
            domacin: false,
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
                        <div class="row pointer-cursor shadow" :ref="0" v-on:click="selektujTab($event,0)">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/osoba.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                        <div class="row pointer-cursor" :ref="1" v-if="gost" v-on:click="selektujTab($event,1)">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/calendar.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                        <div class="row pointer-cursor" :ref="1" v-if="domacin" v-on:click="selektujTab($event,1)">
                            <div class="col p-3 d-flex align-items-center justify-content-center">
                                <img class="my-auto text-center" src="icons/home.png" style="width:30px; height:30px;">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <transition name="fade" mode="out-in">
                            <keep-alive>
                                <component :is="komponente[trenutnaKomponenta]" :domacin="true"></component>
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
            if(!this._inactive){ 
                console.log(this.$route.fullPath + " putanja")    
                //this.$router.push({name: "login", query: {putanja :this.$route.fullPath}});
                this.$router.push({name: "login"});
            }
        });
        this.$root.$on('login',() => {
            //this.$forceUpdate();
        });
        this.$root.$on('promeniTab',(i) => {
            this.selektujTab(null, i);
        });
    },
    mounted: function(){
        user = JSON.parse(localStorage.getItem('user'));
        if(user.uloga == "GOST"){
            this.gost = true
            this.komponente = ["licni-podaci", "pregled-rezervacija"];
        }
        else if(user.uloga == "DOMACIN"){
            this.domacin = true;
            this.komponente = ["licni-podaci", "pregled-apartmana"]
        }
        if(this.$route.params.tab != null){
            this.selektujTab(null, 1);
        }
    },
})