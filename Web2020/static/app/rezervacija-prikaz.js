Vue.component('rezervacija-prikaz', {
    data: function(){
        return{
            props: {
                rezervacija: Object
            },
            rezervacija: null,
            domacin: false,
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
        <div class="row" style="height:50px;" v-if="!domacin">
            <div class="col">
                <button class="btn btn-light border mb-2" v-if="prikazOdustani()" v-on:click="potvrdi()">Odustani</button>
            </div>
            <div class="col">
            </div>
            <div class="col"></div>
        </div>
        <div class="row" style="height:50px;" v-if="domacin">
            <div class="col pr-1">
                <button class="btn btn-light border mb-2 p-1" v-if="checkKreirana() && !checkZavrsena()" v-on:click="prihvati()">Prihvati</button>
                <button class="btn btn-light border mb-2 p-1" v-if="checkZavrsena()">Završi</button>
            </div> 
            <div class="col pl-0">
                <button class="btn btn-light border mb-2 p-1" v-if="checkKreiranaPrihvacena() && !checkZavrsena()" v-on:click="odbij()">Odbij</button>
            </div>
        </div>

        <!-- Modal -->
        <div :id="getId()" class="modal fade" role="dialog">
            <div class="modal-dialog modal-dialog-centered" style="width:300px;">
                <!-- Modal content-->
                <div class="modal-content my-modal">
                    <div class="modal-body">
                        <p>Da li ste sigurni da želite da odustanete?</p>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-3">
                                    <button type="button" class="btn btn-light border mt-1" v-on:click="odustani()">Ne</button>
                                </div>
                                <div class="col"></div>
                                <div class="col-3">
                                    <button type="button" class="btn btn-danger mt-1" v-on:click="otkazi()">Da</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `,
    methods: {
      getId: function(){
        return "myModal" + this.rezervacija.id;
      },
      convertDatum: function(){
        return new Intl.DateTimeFormat('sr-Latn-RS').format(new Date(this.rezervacija.pocetniDatum));
      },
      prikazOdustani: function(){
          if(this.rezervacija.status == "KREIRANA" || this.rezervacija.status == "PRIHVACENA"){
              return true;
          }
          else{
              return false;
          }
      },
      checkKreirana: function(){
          if(this.rezervacija.status == "KREIRANA"){
              return true;
          }
          else{
              return false;
          }
      },
      checkKreiranaPrihvacena: function(){
        if(this.rezervacija.status == "KREIRANA" || this.rezervacija.status == "PRIHVACENA"){
            return true;
        }
        else{
            return false;
        }
    
    },
      checkZavrsena: function(){
        pocetni = new Date(this.rezervacija.pocetniDatum);
        krajnji = new Date();
        krajnji.setDate(pocetni.getDate() + this.rezervacija.brojNocenja);
        trenutni = new Date();
        console.log(new Date(krajnji))
        console.log(new Date(trenutni.setDate(trenutni.getDate() + 1)))
        if(krajnji < trenutni.setDate(trenutni.getDate() + 1)){
            return true;
        }
        else {
            return false;
        }
      },
      potvrdi: function(){
        $('#myModal' + this.rezervacija.id).modal('show');
      },
      odustani: function(){
        $('#myModal' + this.rezervacija.id).modal('hide');
      },
      otkazi: function(){
        $('#myModal' + this.rezervacija.id).modal('hide');
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
            this.$root.$emit("izmena");
        });
      },
      odbij: function(){
        user = JSON.parse(localStorage.getItem('user'));  
        userId = user.id;
        header = "Bearer " + user.jwt;
        axios
            .post("/domacin/odbijRezervaciju", this.rezervacija, {headers: {'Authorization': header}})
            .then(() => {
                this.$root.$emit("izmena");
            }) 
      },
      prihvati: function(){
        user = JSON.parse(localStorage.getItem('user'));  
        userId = user.id;
        header = "Bearer " + user.jwt;
        axios
            .post("/domacin/prihvatiRezervaciju", this.rezervacija, {headers: {'Authorization': header}})
            .then(() => {
                this.$root.$emit("izmena");
            }) 
      }  
    },
    mounted: function(){
        if(this.$attrs.domacin == true){
            this.domacin = true;
        }
        this.rezervacija = this.$attrs.rezervacija;
    }
})