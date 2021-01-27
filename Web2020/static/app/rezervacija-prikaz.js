Vue.component('rezervacija-prikaz', {
    data: function(){
        return{
            props: {
                rezervacija: Object
            },
            rezervacija: null,
            domacin: false,
            admin: false,
            komentar: null,
            errorKomentar: false,
            errorOcena: false,
            ocena: null,
            alert: false,
            alertError: false,
            alertText: null,
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
            <span>Gost: <b>{{rezervacija.user.username}}</b></span>
        </div>
        <div class="row">
            <span>Status: <h5><b>{{rezervacija.status}}</b></h5></span>
        </div>
        <div class="row" v-if="!domacin && !admin">
            <div class="col">
                <button class="btn btn-light border mb-2" v-if="prikazOdustani()" v-on:click="potvrdi()">Odustani</button>
            </div>
            <div class="col">
            </div>
            <div class="col"></div>
        </div>
        <div class="row" style="" v-if="domacin">
            <div class="col pr-1">
                <button class="btn btn-light border mb-2 p-1" v-if="checkKreirana() && !checkZavrsena()" v-on:click="prihvati()">Prihvati</button>
                <button class="btn btn-light border mb-2 p-1" v-if="checkZavrsena() && !isZavrsena()" v-on:click="zavrsi()">Završi</button>
            </div> 
            <div class="col pl-0">
                <button class="btn btn-light border mb-2 p-1" v-if="checkKreiranaPrihvacena() && !checkZavrsena()" v-on:click="odbij()">Odbij</button>
            </div>
        </div>
        <div class="row" v-if="!domacin && !admin">
            <div class="col pr-1">
                <button class="btn btn-light border mb-2 p-1" v-if="isZavrsena()" v-on:click="dodajKomentar()">Dodaj komentar</button>
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

        <div :id="getId2()" class="modal fade" role="dialog">
            <div class="modal-dialog modal-dialog-centered" style="width:450px;">
                <!-- Modal content-->
                <div class="modal-content my-modal">
                    <div class="modal-body">
                        <p>Dodajte komentar</p>
                        <textarea v-model="komentar" style="width:300px;height:150px;"></textarea>
                        <p class="small" v-if="errorKomentar" style="color:red">Niste uneli komentar.</p>
                        <p class="mt-1">Ocena: </p>
                        <select style="width:100px;" v-model="ocena">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <p class="small" v-if="errorOcena" style="color:red">Niste uneli ocenu.</p>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-3">
                                    <button type="button" class="btn btn-light border mt-1" v-on:click="odustani2()">Odustani</button>
                                </div>
                                <div class="col"></div>
                                <div class="col-3">
                                    <button type="button" class="btn btn-danger mt-1" v-on:click="submitKomentar">Završi</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="moj-alert alert alert-success text-center" role="alert" v-show="alert">
            <b>{{alertText}}</b>
        </div>
        <div class="moj-alert alert alert-danger text-center" role="alert" v-show="alertError">
            <b>{{alertText}}</b>
        </div>
    </div>
    
    `,
    methods: {
      getId: function(){
        return "myModal" + this.rezervacija.id;
      },
      getId2: function(){
        return "Modal" + this.rezervacija.id;
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
        krajnji = new Date(this.rezervacija.pocetniDatum);
        krajnji.setDate(krajnji.getDate() + this.rezervacija.brojNocenja);
        trenutni = new Date();
        if(krajnji < trenutni){
            return true;
        }
        else {
            return false;
        }
      },
      isZavrsena: function(){
        if(this.rezervacija.status == "ZAVRSENA"){
            return true;
        } else return false;
      },
      potvrdi: function(){
        $('#myModal' + this.rezervacija.id).modal('show');
      },
      odustani: function(){
        $('#myModal' + this.rezervacija.id).modal('hide');
      },
      odustani2: function(){
        $('#Modal' + this.rezervacija.id).modal('hide');
      },
      dodajKomentar: function(){
        $('#Modal' + this.rezervacija.id).modal('show'); 
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
      },
      zavrsi: function(){
        user = JSON.parse(localStorage.getItem('user'));  
        userId = user.id;
        header = "Bearer " + user.jwt;
        axios
            .post("/domacin/zavrsiRezervaciju", this.rezervacija, {headers: {'Authorization': header}})
            .then(() => {
                this.$root.$emit("izmena");
            }) 
      },
      submitKomentar: function(){
        if(this.komentar == null || this.komentar == ""){
            this.errorKomentar = true;
            return;
        }
        if(this.ocena == null || this.ocena == ""){
            this.errorOcena = true;
            return;
        }
        user = JSON.parse(localStorage.getItem('user'));  
        userId = user.id;
        header = "Bearer " + user.jwt;
        komentar = {
            apartmanId: this.rezervacija.apartmanId,
            gostId: user.Id,
            tekst: this.komentar,
            ocena: this.ocena,
        }
        axios
            .post("/gost/addKomentar", komentar, {headers: {'Authorization': header}})
            .then((response) => {
                this.odustani2();
                this.errorKomentar = false;
                this.errorOcena = false;
                this.alert = true;
                this.alertText = response.data['message'];
                setTimeout(() => {
                    this.alert = false;
                    this.$root.$emit("izmena");
                }, 2000);
                //this.$root.$emit("izmena");
            })
            .catch(error => {
                this.alertError = true;
                this.alertText = error.response.data['message'];
            }) 
      }, 
    },
    mounted: function(){
        if(this.$attrs.domacin == true){
            this.domacin = true;
        }
        if(this.$attrs.admin == true){
            this.admin = true;
        }
        this.rezervacija = this.$attrs.rezervacija;
    }
})