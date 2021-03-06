Vue.component('apartman-prikaz', {
    data: function(){
        return{
            apartman: null,
            trenutna: 0,
            brojRedova: 0,
            myCalendar: null,
            map: null,
            marker: null,
            config: null,
            komentari: null,
            user: null,
            admin: false,
            domacin: false,
        }
    },
    template:/*html*/`
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-2"></div>
            <div class="col">
                <div class="row">
                    <div class="col">
                        <div class="row" style="height:100%">
                            <div style="position:relative;height:100%">
                                <img :src="apartman.slike[trenutna]" class="pregled-slike-velika" style="width:100%; height:100%;">
                                <div class="slike-back pointer-cursor" v-on:click="previousPicture()">
                                    <img src="icons/back.png" style="width:100%; height:100%;">
                                </div>
                                <div class="slike-next pointer-cursor" v-on:click="nextPicture()">
                                    <img src="icons/next.png" style="width:100%; height:100%">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="row">
                            <div class="col">
                                <div id="map" class="map" style="width:100%;height:200px"></div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <div class="row">
                                    <div class="col-2 mr-1">
                                        <img class="sadrzaj-ikonica" src="icons/pin.png">
                                    </div>
                                    <div class="col">
                                        <span>{{apartman.lokacija.adresa.grad}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="row">
                                    <div class="col-2 mr-1">
                                        <img class="sadrzaj-ikonica" src="icons/living-room.png">
                                    </div>
                                    <div class="col ml-1">
                                        <span v-if="apartman.tip">Soba</span>
                                        <span v-else>Ceo Apartman</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <div class="row">
                                    <div class="col-2">
                                        <img class="sadrzaj-ikonica" src="icons/door.png">
                                    </div>
                                    <div class="col">
                                        <span>{{apartman.brojSoba}} soba</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="row">
                                    <div class="col-2">
                                        <img class="sadrzaj-ikonica" src="icons/osoba.png">
                                    </div>
                                    <div class="col">
                                        <span>Max {{apartman.brojGostiju}} osoba</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <div class="row">
                                    <div class="col-2">
                                        <img class="sadrzaj-ikonica" src="icons/dollar.png">
                                    </div>
                                    <div class="col">
                                        <span>{{apartman.cenaPoNoci}}.00 RSD/noći</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col">

                            </div>
                        </div>
                        <div class="row mt-3">
                            <h5 class="ml-1"><b>Sadržaj apartmana</b></h5>
                        </div>
                        <div v-for="red in brojRedova" class="row mt-2">
                            <div class="col">
                                <div class="p-1 text-center border" v-if="displayDiv(3, red)">{{displaySadrzaj(3,red)}}
                                </div>
                            </div>
                            <div class="col">
                                <div class="p-1 text-center border" v-if="displayDiv(2, red)">{{displaySadrzaj(2,red)}}
                                </div>
                            </div>
                            <div class="col">
                                <div class="p-1 text-center border" v-if="displayDiv(1, red)">{{displaySadrzaj(1,red)}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <hr/>
                        <div class="row mt-3">
                            <h3><b>Smeštaj u mestu {{apartman.lokacija.adresa.grad}}</b></h3>
                        </div>
                        <div class="row mt-3">
                            <h4><b>Dostupnost</b></h4>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <div class="border shadow" ref="kalendar" style="width:300px;"></div>
                            </div>
                            <div class="col">
                                <div class="row">
                                    <h5><b>Rezervacija</b></h5>
                                </div>
                                <div class="row">
                                    <span>Na kalendaru su prikazani datumi tokom kojih je smeštaj dostupan. Datumi tokom kojih je smeštaj nedostupan označeni su crvenom bojom.</span>
                                </div>
                                <div class="row">
                                    <button class="btn btn-info ml-2 mt-2" style="width:150px;" v-if="!admin && !domacin" v-on:click="rezervisi()">Rezerviši</button>
                                </div>
                            </div>
                            <div class="col-2"></div>
                        </div>
                        <hr/>
                        <div class="row mb-3">
                            <h4><b>Komentari korisnika</b></h4>
                        </div>
                        <div class="row mb-3" v-for="k in komentari">
                            <div class="col">
                                <div class="row">
                                    <div class="col">
                                        <h5><b>{{k.user.ime}}</b></h5>
                                    </div>
                                    <div class="col"></div>
                                    <div class="col-1">
                                        <img class="my-auto text-center pointer-cursor" v-if="!k.objavljen && checkDomacinKomentari()" src="icons/checkmark.png" v-on:click="objaviKomentar(k)" style="width:20px; height:20px;">
                                        <img class="my-auto text-center pointer-cursor" v-if="k.objavljen && checkDomacinKomentari()" src="icons/close.png" v-on:click="sakrijKomentar(k)" style="width:20px; height:20px;">
                                    </div>
                                </div>
                                <div class="row">
                                    <span><b>Ocena: {{k.ocena}}</b></span>
                                </div>
                                <div class="row">
                                    <span>{{k.tekst}}</span>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    <div class="col-4">
                    </div>
                    
                </div>
            </div>
            <div class="col-2"></div>
        </div>
    </div> 

    `,
    mounted: function(){
        this.user = JSON.parse(localStorage.getItem('user'));
        let script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMGnRyzotturmaqorihBs1rP3ztn8vT7o&libraries=places&callback=initMap';
        window.initMap = this.initMap;
        document.head.appendChild(script);
        if(this.user != null){ 
            if(this.user.uloga == "DOMACIN"){
                this.domacin = true;
            }
            if(this.user.uloga == "ADMINISTRATOR"){
                this.admin = true;
            }
            header = "Bearer " + this.user.jwt;
            this.config = {
                headers: {'Authorization': header},
            }
        }
        this.load();
        if(this.admin || this.domacin){
            this.loadKomentariSvi();
        }
    },
    created: function(){
        this.$root.$on('reload',() => {
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
        });
        this.myCalendar.onMonthRender(function(index, element, info) {
            // Show month index
            var month = index + 1;
            element.textContent += ' (' + (month > 9 ? '' : '0') + month + '/' + (info.start.getYear() + 1900) + ')';
        });
        }
        this.myCalendar.refresh();
        if(this.map == null){
            initMap();
        }
    },
    methods: {
        load: function(){
            axios
            .get('/getApartmanById', {params: this.$route.query})
            .then(response => {
                this.apartman = response.data;
                this.brojRedova = Math.ceil(this.apartman.sadrzaji.length/3);
            });
            if(this.user == null || (!this.domacin && !this.admin)){ 
            axios
                .get('/getKomentari', {params: this.$route.query})
                .then(response => {
                    this.komentari = response.data;
                });
            }
        },
        loadKomentariSvi: function(){
            if(this.domacin){
                path = '/domacin/getKomentari';
            } else path = "/admin/getKomentari";
            axios
            .get(path, {params: this.$route.query, headers: this.config.headers})
            .then(response => {
                this.komentari = response.data;
            });
        },
        objaviKomentar: function(komentar){
            if(this.domacin){
                path = "/domacin/objaviKomentar";
            } else path = "/admin/objaviKomentar";
            axios
                .post(path, komentar, this.config)
                .then(response => {
                    this.loadKomentariSvi();
                })
        },
        sakrijKomentar: function(komentar){
            if(this.domacin){
                path = "/domacin/sakrijKomentar";
            } else path = "/admin/sakrijKomentar";
            axios
                .post(path, komentar, this.config)
                .then(response => {
                    this.loadKomentariSvi();
                })
        },
        checkDomacinKomentari: function(){
            if(this.user == null) return false;
            if(this.user.username == this.apartman.domacinUsername){
                return true;
            }else return false;
        },
        getStyle: function(){
            return "background-image: url('" + this.apartman.slike[0] + "');width:100%; height:100%;";
        },
        nextPicture: function(){
            if(this.trenutna == this.apartman.slike.length - 1){
                this.trenutna = 0
                return;
            }
            this.trenutna++;
        },
        previousPicture: function(){
            if(this.trenutna == 0){
                this.trenutna = this.apartman.slike.length - 1;
                return
            }
            this.trenutna--;
        },
        displaySadrzaj: function(i, red){
            naziv = this.apartman.sadrzaji[red*3-i].naziv;
            return naziv;
        },
        displayDiv: function(i, red)
        {
            if(this.apartman.sadrzaji.length <= red*3-i){
                return false;
            }
            return true;
        },
        initMap: function(){
            this.map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: this.apartman.lokacija.duzina, lng: this.apartman.lokacija.sirina },
                zoom: 13,
            });
            this.marker = new google.maps.Marker({
                position: { lat: this.apartman.lokacija.duzina, lng: this.apartman.lokacija.sirina },
                map: this.map,
                title: "pocetni",
            });
            console.log(this.map)
        },
        rezervisi: function(){
            if(localStorage.getItem("user") != null){ 
                this.$router.push({name: 'rezervacija', query: {id: this.apartman.id}});
            }
            else{
                this.$router.push({name: 'login', query: {putanja :this.$route.fullPath}}); 
            }
        },
    }
})