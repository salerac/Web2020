Vue.component('pregled-rezervacija', {
    data: function(){
        return {
            rezervacije: null,
            brojRedova: null,
            globalKey: 0,
            alert: false,
            apartmanId: null,
            domacin: false,
        }
    },
    template:/*html*/`
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="row"  v-if="!domacin">
                    <h3 class="mt-3"><b>Vaše rezervacije</b></h3>
                </div>
                <div class="row"  v-if="domacin">
                    <div class="col-1">
                        <img src="/icons/back.png" class="border mt-2 p-1 pointer-cursor" style="height:50px;width:50px;" v-on:click="back()">
                    </div>
                    <div class="col">
                        <h3 class="mt-3"><b>Rezervacije za selektovan apartman</b></h3>
                    </div>
                </div>
                <div class="row" v-for="red in brojRedova" :key="red">
                    <div class="col">
                        <rezervacija-prikaz v-if="displayDiv(4, red)" :key="globalKey" :rezervacija="getIndex(4, red)" :domacin="domacin"></rezervacija-prikaz>
                    </div>
                    <div class="col">
                        <rezervacija-prikaz v-if="displayDiv(3, red)" :key="globalKey" :rezervacija="getIndex(3, red)" :domacin="domacin"></rezervacija-prikaz>
                    </div>
                    <div class="col">
                        <rezervacija-prikaz  v-if="displayDiv(2, red)" :key="globalKey" :rezervacija="getIndex(2, red)" :domacin="domacin"></rezervacija-prikaz>
                    </div>
                    <div class="col">
                        <rezervacija-prikaz  v-if="displayDiv(1, red)" :key="globalKey" :rezervacija="getIndex(1, red)" :domacin="domacin"></rezervacija-prikaz>
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
            axios
                .get("/gost/getGostRezervacije", config)
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