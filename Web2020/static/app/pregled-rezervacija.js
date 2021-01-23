Vue.component('pregled-rezervacija', {
    data: function(){
        return {
            rezervacije: null,
            brojRedova: null,
            globalKey: 0,
            alert: false,
        }
    },
    template:/*html*/`
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="row">
                    <h3 class="mt-3"><b>Vaše rezervacije</b></h3>
                </div>
                <div class="row" v-for="red in brojRedova" :key="red">
                    <div class="col">
                        <rezervacija-prikaz v-if="displayDiv(4, red)" :key="globalKey" :rezervacija="getIndex(4, red)"></rezervacija-prikaz>
                    </div>
                    <div class="col">
                        <rezervacija-prikaz v-if="displayDiv(3, red)" :key="globalKey" :rezervacija="getIndex(3, red)"></rezervacija-prikaz>
                    </div>
                    <div class="col">
                        <rezervacija-prikaz  v-if="displayDiv(2, red)" :key="globalKey" :rezervacija="getIndex(2, red)"></rezervacija-prikaz>
                    </div>
                    <div class="col">
                        <rezervacija-prikaz  v-if="displayDiv(1, red)" :key="globalKey" :rezervacija="getIndex(1, red)"></rezervacija-prikaz>
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
        }
    },
    mounted: function(){
        this.load();
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