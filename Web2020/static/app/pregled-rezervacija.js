Vue.component('pregled-rezervacija', {
    data: function(){
        return {
            rezervacije: null,
            brojRedova: null,
            globalKey: 0,
            alert: false,
            apartmanId: null,
            domacin: false,
            admin: false,
            search: null,
        }
    },
    template:/*html*/`
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="row"  v-if="!domacin && !admin">
                    <h3 class="mt-3"><b>Vaše rezervacije</b></h3>
                </div>
                <div class="row"  v-if="admin">
                    <h3 class="mt-3"><b>Rezervacije u sistemu</b></h3>
                </div>
                <div class="row"  v-if="domacin">
                    <div class="col-1">
                        <img src="/icons/back.png" class="border mt-2 p-1 pointer-cursor" style="height:50px;width:50px;" v-on:click="back()">
                    </div>
                    <div class="col">
                        <h3 class="mt-3"><b>Rezervacije za selektovan apartman</b></h3>
                    </div>
                </div>
                <div class="row"  v-if="domacin || admin">
                    <h5 class="mt-3"><b>Pretraga</b></h5>
                    <input id="search" class="login-input border ml-2" placeholder="Korisnicko ime" style="width:200px;background-color:white" v-model="search" v-on:input="trazi()">
                </div>
                <div class="row" v-for="red in brojRedova" :key="red">
                    <div class="col">
                        <rezervacija-prikaz v-if="displayDiv(4, red)" :key="globalKey" :rezervacija="getIndex(4, red)" :domacin="domacin" :admin="admin"></rezervacija-prikaz>
                    </div>
                    <div class="col">
                        <rezervacija-prikaz v-if="displayDiv(3, red)" :key="globalKey" :rezervacija="getIndex(3, red)" :domacin="domacin" :admin="admin"></rezervacija-prikaz>
                    </div>
                    <div class="col">
                        <rezervacija-prikaz  v-if="displayDiv(2, red)" :key="globalKey" :rezervacija="getIndex(2, red)" :domacin="domacin" :admin="admin"></rezervacija-prikaz>
                    </div>
                    <div class="col">
                        <rezervacija-prikaz  v-if="displayDiv(1, red)" :key="globalKey" :rezervacija="getIndex(1, red)" :domacin="domacin" :admin="admin"></rezervacija-prikaz>
                    </div>
                </div>
                <div class="moj-alert alert alert-success text-center" role="alert" v-show="alert">
                    <b>Rezervacija otkazana</b>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        trazi: function(){
            if(this.search == ""){
                this.$root.$emit("izmena");
                document.getElementById("search").focus();
                return;
            }
            user = JSON.parse(localStorage.getItem('user'));
            header = "Bearer " + user.jwt;
            if(this.domacin == true){
                path = "/domacin/pretragaRezervacija"
            }
            else path = "/admin/pretraziRezervacije"
            axios 
                .post(path,{apartman: this.apartmanId, user: this.search}, {headers: {'Authorization': header}})
                .then(response => {
                    this.rezervacije = response.data;
                })
        },
        getIndex: function(i, red){
            index = this.rezervacije[red*4 - i];
            return index;
        },
        displayDiv: function(i, red)
        {
            if(this.rezervacije.length <= red*4-i){
                return false;
            }
            return true;
        },
        back: function(){
            this.$root.$emit("back");
        },
        load: function(){
            user = JSON.parse(localStorage.getItem('user'));
            header = "Bearer " + user.jwt;
            let config = {
                headers: {'Authorization': header},
                params: {
                    id: user.id,
                },
            }
            if(this.admin == true){
                path = "/admin/getRezervacije";
            }
            else path = "/gost/getGostRezervacije";
            axios
                .get(path, config)
                .then(response => {
                    this.rezervacije = response.data;
                    this.brojRedova = Math.ceil(this.rezervacije.length/4);
                    this.globalKey++;
                })
        },
        loadDomacin: function(){
            user = JSON.parse(localStorage.getItem('user'));
            header = "Bearer " + user.jwt;
            let config = {
                headers: {'Authorization': header},
                params: {
                    id: this.apartmanId,
                },
            }
            axios
                .get("/domacin/getApartmanRezervacije", config)
                .then(response => {
                    this.rezervacije = response.data;
                    this.brojRedova = Math.ceil(this.rezervacije.length/4);
                    this.globalKey++;
                })
        }
    },
    mounted: function(){
        if(typeof this.$attrs.apartmanId == "number"){
            this.apartmanId = this.$attrs.apartmanId;
            this.domacin = true;
            this.loadDomacin();
        }
        else if(this.$attrs.admin == true){
            this.admin = true;
            this.load();
        }
        else
        {
            this.load();
        }
    },
    created: function(){
        this.$root.$on("izmena", () => {
            this.alert = true;
            setTimeout(() => {
                this.alert = false;
            }, 2000);
            this.load();
        })
    }
})