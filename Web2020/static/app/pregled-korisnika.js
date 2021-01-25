Vue.component('pregled-korisnika', {
    data: function(){
        return {
            korisnici: null,
            config: null,
            search: null,
        }
    },
    template:/*html*/`
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col ml-3">
                <div class="row">
                    <h3 class="pl-0"><b>Vaše mušterije</b></h3>
                </div>
                <div class="row">
                    <hr class="mt-1 ml-0"/>
                </div>
                <div class="row">
                    <h5 class="mt-1 pl-0"><b>Pretraga</b></h5>
                    <input class="" placeholder="Korisničko ime, pol" style="width:200px" v-model="search" v-on:input="trazi()">
                </div>
                <div class="row border border-dark p-1 mt-2">
                    <div class="col border-right">
                        <span><b>Korisničko ime</b></span>
                    </div>
                    <div class="col border-right">
                        <span><b>Ime</b></span>
                    </div>
                    <div class="col border-right">
                        <span><b>Prezime</b></span>
                    </div>
                    <div class="col">
                        <span><b>Pol</b></span>
                    </div>
                </div>
                <div class="row border border-dark border-top-0 p-1" v-for="k in korisnici">
                    <div class="col border-right">
                        {{k.username}}
                    </div>
                    <div class="col border-right">
                        {{k.ime}}
                    </div>
                    <div class="col border-right">
                        {{k.prezime}}
                    </div>
                    <div class="col border-right">
                        {{getPol(k)}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    mounted: function(){
        user = JSON.parse(localStorage.getItem('user'));
        header = "Bearer " + user.jwt;
        this.config = {
            headers: {'Authorization': header},
        }
        axios
            .get("/domacin/getDomacinKorisnici", this.config)
            .then(response => {
                this.korisnici = response.data;
            })

    },
    methods: {
        trazi: function(){
            if(this.search == ""){
                this.$root.$emit("izmena");
            }
            axios 
                .post("/domacin/pretraziDomacinKorisnike",{apartman: null, user: this.search}, this.config)
                .then(response => {
                    this.korisnici = response.data;
                })
        },
        getPol: function(i){
            pol = i.pol;
            if(pol == false){
                return "Muški";
            }
            else return "Ženski";
        }
    }
})