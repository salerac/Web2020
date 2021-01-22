Vue.component('rezervacija-prikaz', {
    data: function(){
        return{
            props: {
                rezervacija: Object
            },
            rezervacija: null,
        }
    },
    template:/*html*/`
    <div class="container-fluid border shadow mt-3" style="border-radius: 10px">
        <div class="row" style="border-radius:10px">
            <img :src="rezervacija.slika" class="mt-2" style="width:100%;height:100%;">
        </div>
        <div class="row">
            <span>Početni datum: <b>{{convertDatum()}}</b></span>
        </div>
        <div class="row">
            <span>Broj noćenja: <b>{{rezervacija.brojNocenja}}</b></span>
        </div>
        <div class="row">
            <span>Cena: <b>{{rezervacija.cena}}</b> RSD</span>
        </div>
        <div class="row">
            <span>Status: <h5><b>{{rezervacija.status}}</b></h5></span>
        </div>
        <div class="row">
            <div class="col">
                <button class="btn btn-light border mb-2" v-on:click="odustani()">Odustani</button>
            </div>
            <div class="col">
            </div>
            <div class="col"></div>
        </div>
    </div>
    
    `,
    methods: {
      convertDatum: function(){
        return new Intl.DateTimeFormat('sr-Latn-RS').format(new Date(this.rezervacija.pocetniDatum));
      },
      odustani: function(){
        user = JSON.parse(localStorage.getItem('user'));  
        userId = user.id;
        header = "Bearer " + user.jwt;
        axios.delete("/gost/odustaniOdRezervacije", {
            headers: {
            Authorization: "Authorization " + header,
            },
            data: {
                userId: userId,
                rezervacijaId: this.rezervacija.id
            }
        })
        .then(response => {

        });
      }  
    },
    mounted: function(){
        this.rezervacija = this.$attrs.rezervacija;
    }
})