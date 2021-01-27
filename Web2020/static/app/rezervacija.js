Vue.component('rezervacija',{
    data: function(){
        return {
            user: null,
            apartman: null,
            myCalendar: null,
            pocetniDatum: null,
            krajnjiDatum: null,
            showDatum: "",
            showDatumKraj: "",
            brojNocenja: 1,
            poruka: null,
            minus1: "height:25px;width:25px;opacity:0.3;",
            minus2: "height:25px;width:25px;opacity:1",
            prikaziNocenja: false,
            alert: false,
            alertError: false,
            alertText: null,
        }
    },
    template:/*html*/`
    <div class="container-fluid h-100">
        <div class="row h-100 mt-5">
            <div class="col"></div>
            <div class="col-4 border shadow my-auto pl-4 pr-4">
                <div class="row mt-3">
                    <h4><b>Vaša rezervacija</b></h4>
                </div>
                <div class="row mt-2">
                    <div class="col-4">
                        <img :src="apartman.slike[0]" class="pregled-slike" style="width:100%; height:100%;">
                    </div>
                    <div class="col">
                        <div class="row">
                            <span v-if="apartman.tip"><b>Jedna soba</b></span>
                            <span v-else><b>Ceo apartman</b></span>
                        </div>
                        <div class="row">
                            <span>u mestu <b>{{apartman.lokacija.adresa.grad}}</b></span>
                        </div>
                        <div class="row">
                            <span>Cena/noći: <b>{{apartman.cenaPoNoci}}</b> RSD</span>
                        </div>
                        <div class="row">
                            <span>Ukupna cena: <h5><b>{{apartman.cenaPoNoci*brojNocenja}} RSD</b></h5></span>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="row mt-3">
                    <h5><b>Početni datum</b></h5>
                </div>
                <div class="row mt-2">
                    <div class="col-6" style="width:320px;">
                        <div class="border" ref="kalendar" style="width:300px;height:330px"></div>
                    </div>
                    <div class="col">
                        <span>Odaberite početni datum rezervacije klikom na jedan od ponuđenih datuma. Datumi označeni crvenom bojom su nedostupni.</span>
                    </div>
                </div>
                <div class="row mt-2 mb-3">
                    <div class="col-1" style="width:150px;">
                        <span><b>Datum dolaska: </b></span>
                    </div>
                    <div class="col">
                        <span>{{showDatum}}</span>
                    </div>
                </div>
                <div class="row mb-3" v-if="prikaziNocenja">
                    <div class="col-1" style="width:150px;">
                        <span><b>Broj noćenja:</b></span>
                    </div>
                    <div class="col">
                        <div class="">
                            <img src="/icons/remove.png" id="minus1" class="rounded-circle border p-1 mr-3 plusminus" v-bind:style="minus1" v-on:click="umanjiBrojNocenja">
                            <span class="font-weight-bold">{{brojNocenja}}</span>
                            <img src="/icons/plus.png" id="plus1" class="rounded-circle border p-1 ml-3 plusminus" :style="minus2" v-on:click="uvecajBrojNocenja">
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="row mt-3">
                    <h5><b>Poruka za domaćina</b></h5>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <textarea style="width:100%; height:150px" v-model="poruka"></textarea>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <button class="border btn btn-info" style="width:30%" v-on:click="submit" :disabled="validate()">Završi</button>
                    </div>
                </div>
                <div class="moj-alert alert alert-success text-center" role="alert" v-show="alert">
                    <b>{{alertText}}</b>
                </div>
                <div class="moj-alert alert alert-danger text-center" role="alert" v-show="alertError">
                    <b>{{alertText}}</b>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>
    `,
    methods: {
        umanjiBrojNocenja: function(e){
            if(this.brojNocenja == 1) return;
            this.brojNocenja--;
            this.minus2 = "height:25px;width:25px;opacity:1;";
            date = new Date(this.krajnjiDatum);
            date.setDate(date.getDate() - 1);
            this.krajnjiDatum = date.getTime();
            this.showDatumKraj = new Intl.DateTimeFormat('sr-Latn-RS').format(date);
            if(this.brojNocenja == 1)
                this.minus1 = "height:25px;width:25px;opacity:0.3;";
        },
        uvecajBrojNocenja: function(e){
            date = new Date(this.krajnjiDatum);
            date.setDate(date.getDate() + 1);
            if(!this.apartman.datumi.includes(date.getTime())){
                return
            }
            this.minus1 = "height:25px;width:25px;opacity:1;"; 
            this.brojNocenja++;
            date = new Date(this.krajnjiDatum);
            date.setDate(date.getDate() + 1);
            this.krajnjiDatum = date.getTime();
            this.showDatumKraj = new Intl.DateTimeFormat('sr-Latn-RS').format(date);

            date = new Date(this.krajnjiDatum);
            date.setDate(date.getDate() + 1);
            if(!this.apartman.datumi.includes(date.getTime())){
                this.minus2 = "height:25px;width:25px;opacity:0.3;";
            }
        },
        validate: function(){
            if(this.pocetniDatum == null || this.brojNocenja == 0){
                return true;
            }
            else return false;
        },
        submit: function(){
            rezervacija = {
                apartmanId: this.apartman.id,
                pocetniDatum: this.pocetniDatum,
                brojNocenja: this.brojNocenja,
                cena: this.brojNocenja * this.apartman.cenaPoNoci,
                poruka: this.poruka,
                gostId: this.user.id
            }
            header = "Bearer " + this.user.jwt;
            axios
                .post('/gost/postRezervacija', rezervacija, {headers: {'Authorization': header}})
                .then(response => {
                    this.$root.$emit('reload');
                    this.alert = true;
                    this.alertText = response.data['message'];
                    setTimeout(() => {
                        this.alert = false;
                        this.$router.push({name: "landingPage"});
                    }, 2000);
                })
                .catch(error => {
                    this.alertError = true;
                    this.alertText = error.response.data['message'];
                })
        },
        load: function(){
            axios
            .get('/getApartmanById', {params: this.$route.query})
            .then(response => {
                this.apartman = response.data;
            }); 
        }
    },
    mounted: function(){
        user = JSON.parse(localStorage.getItem('user'));
        if(user == null){
            this.$router.push({name: "login"})
        }
        if(user.uloga != "GOST"){
            console.log(localStorage.getItem("user").uloga)
            this.$router.push({name: "unauthorized"})
        }
        else{
            this.user = JSON.parse(localStorage.getItem("user"));
            this.load();  
        }
        
    },
    created: function(){
        this.$root.$on('logout', () => {
            if(this.$options.name == this.$route.name){
            console.log("rezervacija gura")
            this.$router.push({name: "login", query: {putanja :this.$route.fullPath}});
            }
        });
        this.$root.$on('logoin', () => {
            this.load();
        })
    },
    updated: function(){
        element = this.$refs.kalendar;
        if(this.myCalendar == null){ 
        this.myCalendar = jsCalendar.new(element);
        this.myCalendar.onDateRender((date, element, info) => {
            if(!this.apartman.datumi.includes(date.getTime())){ 
                element.style.fontWeight = 'bold';
                element.style.color = '#ffb4b4';
                element.style.backgroundColor = "#c32525";
                element.style.opacity = "0.4";
                element.style.cursor = "not-allowed";
            }
            if(date < new Date()){
                element.style.opacity = "0.2";
                element.style.backgroundColor = "white";
                element.style.color = "black";
                element.style.cursor = "not-allowed";
            }
            else{
                if(this.apartman.datumi.includes(date.getTime())){
                    element.style.cursor = "pointer";
                    element.style.color = "black";
                }
            }
            if(new Date(this.pocetniDatum) <= date && date <= new Date(this.krajnjiDatum) && this.apartman.datumi.includes(date.getTime())){
                element.style.backgroundColor = "aquamarine";
                element.style.color = "white";
            }
        });
        this.myCalendar.onDateClick((event, date) => {
            if(date >= new Date() && this.apartman.datumi.includes(date.getTime())){
                this.brojNocenja = 1;
                this.myCalendar.set(date);
                this.pocetniDatum = date.getTime();
                this.krajnjiDatum = this.pocetniDatum;
                datumProvere = new Date(this.krajnjiDatum);
                datumProvere.setDate(datumProvere.getDate() + 1);
                if(!this.apartman.datumi.includes(datumProvere.getTime())){
                    this.minus2 = "height:25px;width:25px;opacity:0.3;";
                }
                else{
                    this.minus2 = "height:25px;width:25px;opacity:1;";
                }
                datumProvere = new Date(this.pocetniDatum);
                datumProvere.setDate(datumProvere.getDate() - 1);
                if(!this.apartman.datumi.includes(datumProvere.getTime()) || this.brojNocenja == 1){
                    this.minus1 = "height:25px;width:25px;opacity:0.3;";
                }
                else {
                    this.minus1 = "height:25px;width:25px;opacity:1;";
                }
                this.showDatum = new Intl.DateTimeFormat('sr-Latn-RS').format(this.pocetniDatum);
                console.log(this.showDatum);
                this.prikaziNocenja = true;
            }
            
        });
        this.myCalendar.onMonthRender(function(index, element, info) {
            // Show month index
            var month = index + 1;
            element.textContent += ' (' + (month > 9 ? '' : '0') + month + '/' + (info.start.getYear() + 1900) + ')';
        });
        }
        this.myCalendar.refresh();
    }
    
})