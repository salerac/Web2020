Vue.component('landing-page', {
    data: function(){
        return {
            showPrijava: false,
            showOdjava: false,
            showCena: false,
            showGosti: false,
            showSobe: false,
            prijavaReset: false,
            odjavaReset: false,
            brojGostiju: 0,
            brojSoba: 0,
            minus1: "height:25px;width:25px;opacity:0.3;",
            minus2: "height:25px;width:25px;opacity:0.3;",
            minus3: "height:25px;width:25px;opacity:0.3;",
            prijava: "Prijava",
            odjava:  "Odjava",
            cena: "Cena",
            brojGostiju: "Gosti",
            brojSoba: "Sobe",
            pretraga: {
                lokacija: null,
                datumPrijave: null,
                datumOdjave: null,
                brojGostiju: 0,
                sobeOd: 0,
                sobeDo: 0,
                cenaOd: 0,
                cenaDo: 0,
            },
            myCalendar: null,
            myCalendar2: null,
        }
    },
    template: /*html*/`
    <div class="container-fluid">
        <div class="row search" style="height:750px;">
        <div class="row mt-5" style="height:60px;">
            <div class="col"></div>
            <div class="col-5" style="width:850px;">
                <div class="row">
                    <div class="col-3 p-0 border rounded-left-3 border-right-0 small">
                        <input class="rounded-left-3 input-border-0 fw-bold p-3 shadow" v-model="pretraga.lokacija" type="text" placeholder="Lokacija" style="background-color:#f8f9fa;width:100%;height:100%;">
                    </div>
                    <div class="col border border-right-0 small d-flex align-items-center pointer-cursor search-target shadow" v-on:click="otvoriPrijava" v-on:mouseover="function(){prijavaReset = true}" v-on:mouseleave="function(){prijavaReset = false}">
                        <div class="row">
                            <div class="col">
                                <b>{{prijava}}</b>
                            </div>
                            <div class="col-1 mr-2 my-auto">
                                <img src="/icons/close.png" class="rounded-circle border slikax" style="height:15px;width:15px;" v-if="prijavaReset" v-on:click="resetPrijava">
                            </div>
                        </div>
                    </div>
                    <div class="col border border-right-0 small d-flex align-items-center pointer-cursor search-target shadow" v-on:click="otvoriOdjava" v-on:mouseover="function(){odjavaReset = true}" v-on:mouseleave="function(){odjavaReset = false}">
                        <div class="row">
                            <div class="col">
                                <b>{{odjava}}</b>
                            </div>
                            <div class="col-1 mr-2 my-auto">
                                <img src="/icons/close.png" class="rounded-circle border slikax" style="height:15px;width:15px;" v-if="odjavaReset" v-on:click="resetOdjava">
                            </div>
                        </div>
                    </div>
                    <div class="col border border-right-0 small d-flex align-items-center pointer-cursor search-target shadow" v-on:click="otvoriCena">
                        <b>{{cena}}</b>
                    </div>
                    <div class="col border border-right-0 small d-flex align-items-center pointer-cursor search-target shadow" v-on:click="otvoriGosti">
                        <b>{{brojGostiju}}</b>
                    </div>
                    <div class="col border border-right-0 small d-flex align-items-center pointer-cursor search-target shadow" v-on:click="otvoriSobe">
                        <b>{{brojSoba}}</b>
                    </div>
                    <div class="col-1 border rounded-right-3 small d-flex align-items-center pointer-cursor search-target shadow" v-on:click="search">
                        <img src="/icons/loupe.png" class="p-1 ml-1" style="height:28px;width:28px">
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
        <div class="row mt-2" style="height:720px;">
            <div class="col"></div>
            <div class="col-5" style="width:850px">
                <div class="row" style="height:200px;">
                    <div class="col-3"></div>
                    <div class="col">
                        <div class="calendar-window shadow arrow-top" id="kalendar1" v-show="showPrijava"></div>
                    </div>
                    <div class="col">
                        <div class="calendar-window shadow arrow-top" id="kalendar2" v-show="showOdjava" style="left:-50px;"></div>
                    </div>
                    <div class="col">
                        <div class="container cena-window border shadow arrow-top" v-show="showCena" style="left:0px;">
                            <div class="row mt-2">
                                <h6><b>Cena noćenja</b></h6>
                            </div>
                            <div class="row mt-2">
                                <div class="col">
                                    Od:
                                </div>
                                <div class="col">
                                    <input type="number" v-on:change="cenaOd">
                                </div>
                                <div class="col small">
                                    RSD
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col">
                                    Do:
                                </div>
                                <div class="col">
                                    <input type="number" v-on:change="cenaDo">
                                </div>
                                <div class="col small">
                                    RSD
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="container gosti-window border shadow arrow-top" v-show="showGosti">
                            <div class="row">
                                <div class="col">
                                    <label class="mt-3">Broj gostiju:</label>
                                </div>
                                <div class="col">
                                    <div class="mt-3" style="width:110px;">
                                        <img src="/icons/remove.png" id="minus1" class="rounded-circle border p-1 mr-3 plusminus" v-bind:style="minus1" v-on:click="umanjiBrojGostiju">
                                        <span class="font-weight-bold">{{pretraga.brojGostiju}}</span>
                                        <img src="/icons/plus.png" id="plus1" class="rounded-circle border p-1 ml-3 plusminus" style="height:25px;width:25px" v-on:click="uvecajBrojGostiju">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                    <div class="container cena-window border shadow arrow-top" v-show="showSobe" style="width:280px;left:125px;">
                            <div class="row mt-2">
                                <h6><b>Broj soba</b></h6>
                            </div>
                            <div class="row mt-2">
                                <div class="col">
                                    Min:
                                </div>
                                <div class="col">
                                    <div class="">
                                        <img src="/icons/remove.png" id="minus1" class="rounded-circle border p-1 mr-3 plusminus" v-bind:style="minus2" v-on:click="umanjiBrojSobaOd">
                                        <span class="font-weight-bold">{{pretraga.sobeOd}}</span>
                                        <img src="/icons/plus.png" id="plus1" class="rounded-circle border p-1 ml-3 plusminus" style="height:25px;width:25px" v-on:click="uvecajBrojSobaOd">
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col">
                                    Max:
                                </div>
                                <div class="col">
                                    <div class="">
                                        <img src="/icons/remove.png" id="minus1" class="rounded-circle border p-1 mr-3 plusminus" v-bind:style="minus3" v-on:click="umanjiBrojSobaDo">
                                        <span class="font-weight-bold">{{pretraga.sobeDo}}</span>
                                        <img src="/icons/plus.png" id="plus1" class="rounded-circle border p-1 ml-3 plusminus" style="height:25px;width:25px" v-on:click="uvecajBrojSobaDo">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-1"></div>
                </div>
            </div>
            <div class="col"></div>
        </div>
        </div>
    </div>
    `,
    methods: {
        otvoriPrijava: function(){
            this.showOdjava = false;
            this.showCena = false;
            this.showGosti = false;
            this.showSobe = false;
            this.showPrijava = true;
        },
        otvoriOdjava: function(){
            this.showOdjava = true;
            this.showGosti = false;
            this.showPrijava = false;
            this.showCena = false;
            this.showSobe = false;
        },
        otvoriCena: function(){
            this.showOdjava = false;
            this.showPrijava = false;
            this.showCena = true;
            this.showGosti = false;
            this.showSobe = false;
        },
        otvoriGosti: function(){
            this.showOdjava = false;
            this.showPrijava = false;
            this.showCena = false;
            this.showSobe = false;
            this.showGosti = true;
        },
        otvoriSobe: function(){
            this.showOdjava = false;
            this.showPrijava = false;
            this.showCena = false;
            this.showSobe = true;
            this.showGosti = false;
        },
        resetPrijava: function(){
            this.prijava = "Prijava";
            this.showPrijava = false;
            this.pretraga.datumPrijave = null;
            this.myCalendar.set(new Date());
        },
        resetOdjava: function(){
            this.odjava = "Odjava";
            this.showOdjava = false;
            this.pretraga.datumOdjave = null;
            this.myCalendar2.set(new Date());
        },
        umanjiBrojGostiju: function(e){
            if(this.pretraga.brojGostiju == 0) return;
            this.pretraga.brojGostiju--;
            this.brojGostiju = this.pretraga.brojGostiju + " osoba";
            if(this.pretraga.brojGostiju == 0)
                this.minus1 = "height:25px;width:25px;opacity:0.3;";
        },
        uvecajBrojGostiju: function(e){
            this.minus1 = "height:25px;width:25px;opacity:1;"; 
            this.pretraga.brojGostiju++;
            this.brojGostiju = this.pretraga.brojGostiju + " osoba";
        },
        umanjiBrojSobaOd: function(e){
            if(this.pretraga.sobeOd == 0) return;
            this.pretraga.sobeOd--;
            this.brojSoba = this.pretraga.sobeOd + " - " + this.pretraga.sobeDo + " soba";
            if(this.pretraga.sobeOd == 0)
                this.minus2 = "height:25px;width:25px;opacity:0.3;"; 
        },
        uvecajBrojSobaOd: function(e){
            this.minus2 = "height:25px;width:25px;opacity:1;";
            this.pretraga.sobeOd++;
            this.brojSoba = this.pretraga.sobeOd + " - " + this.pretraga.sobeDo + " soba";
        },
        umanjiBrojSobaDo: function(e){
            if(this.pretraga.sobeDo == 0) return;
            this.pretraga.sobeDo--;
            this.brojSoba = this.pretraga.sobeOd + " - " + this.pretraga.sobeDo + " soba";
            if(this.pretraga.sobeDo == 0)
                this.minus3 = "height:25px;width:25px;opacity:0.3;"; 
        },
        uvecajBrojSobaDo: function(e){
            this.minus3 = "height:25px;width:25px;opacity:1;";
            this.pretraga.sobeDo++;
            this.brojSoba = this.pretraga.sobeOd + " - " + this.pretraga.sobeDo + " soba";
        },
        cenaOd: function(e){
            this.pretraga.cenaOd = e.target.value;
            this.cena = this.pretraga.cenaOd + " - " + this.pretraga.cenaDo + " RSD";
        },
        cenaDo: function(e){
            this.pretraga.cenaDo = e.target.value;
            this.cena = this.pretraga.cenaOd + " - " + this.pretraga.cenaDo + " RSD";
        },
        search: function(){
            this.$router.push({name: 'pregled', query: this.pretraga});
        }
    },
    mounted: function(){
        var element = document.getElementById("kalendar1");
        var element2 = document.getElementById("kalendar2");
        this.myCalendar = jsCalendar.new(element);
        this.myCalendar.onDateClick((event, date) => {
            this.myCalendar.set(date);
            var options = { month: 'long'};
            day = date.getDate();
            month = new Intl.DateTimeFormat('sr-Latn-RS', options).format(date)
            this.prijava = day + '. ' + month;
            this.pretraga.datumPrijave = date.getTime();
            
        });
        this.myCalendar2 = jsCalendar.new(element2);
        this.myCalendar2.onDateClick((event, date) => {
            this.myCalendar2.set(date);
            var options = { month: 'long'};
            day = date.getDate();
            month = new Intl.DateTimeFormat('sr-Latn-RS', options).format(date)
            this.odjava = day + '. ' + month;
            this.pretraga.datumOdjave = date.getTime();
        });
    },
    
})