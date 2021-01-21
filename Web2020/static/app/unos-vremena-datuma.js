Vue.component('unos-vremena-datuma', {
    data: function(){
        return {
            vremePrijave: 14,
            vremeOdjave: 10,
            datumi: [],
            pocetniDatum: null,
            krajnjiDatum: null,
            disabled: true,
            periodi: [],
            brojPerioda: 0,
            brojRedova: 0,
        }
    },
    template: /*html*/`
    <div class="col">
        <div class="row">
            <h2>Vremena i datumi</h2>
        </div>
        <div class="row">
            <div class="col">
                <label class="font-weight-bold mt-3">Vreme prijave:</label>
            </div>
            <div class="col">
                <div class="mt-3 brojac">
                    <img src="/icons/remove.png" id="minus1" class="rounded-circle border p-1 mr-3 plusminus" style="height:25px;width:25px" v-on:click="umanjiVremePrijave">
                    <span class="font-weight-bold">{{dajVreme(vremePrijave)}}:00</span>
                    <img src="/icons/plus.png" id="plus1" class="rounded-circle border p-1 ml-3 plusminus" style="height:25px;width:25px" v-on:click="uvecajVremePrijave">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label class="font-weight-bold mt-3">Vreme odjave:</label>
            </div>
            <div class="col">
                <div class="mt-3 brojac">
                    <img src="/icons/remove.png" id="minus1" class="rounded-circle border p-1 mr-3 plusminus" style="height:25px;width:25px" v-on:click="umanjiVremeOdjave">
                    <span class="font-weight-bold">{{dajVreme(vremeOdjave)}}:00</span>
                    <img src="/icons/plus.png" id="plus1" class="rounded-circle border p-1 ml-3 plusminus" style="height:25px;width:25px" v-on:click="uvecajVremeOdjave">
                </div>
            </div>
        </div>
        <hr/>
        <div class="row mt-3">
            <div class="col">
                <h3>Dostupnost</h3>
                <h5>Izaberite periode dostupnosti apartmana.</h5>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col">
                <b>Pocetni datum:</b>
            </div>
            <div class="col">
                <b>Krajnji datum:</b>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col">
                <input type="date" v-model="pocetniDatum" v-on:change="proveriSelekciju">
            </div>
            <div class="col">
                <input type="date" v-model="krajnjiDatum" v-on:change="proveriSelekciju">
            </div>
        </div>
        <div class="row mt-1">
            <div class="col">
                <button class="mt-1" style="width:100px;" :disabled="disabled" v-on:click="dodajDatum">Dodaj</button>
            </div>
        </div>
        <hr class="mt-4" v-if="brojPerioda"/>
        <div class="row mt-1" v-if="brojPerioda">
            <h3>Izabrani periodi:</h3>
        </div>
        <div class="row mt-1" v-for="red in brojRedova">
            <div class="col">
                <div class="border p-1 text-center" v-if="displayDiv(2, red) " v-on:mouseover="prikaziX(red, 1)" v-on:mouseleave="ukloniX(red, 1)">
                    <img :ref="red + '-' + 1" src="/icons/close.png" class="rounded-circle border slikax mx-auto" style="height:25px;width:25px;display:none;" v-on:click="ukloniPeriod(red,2)">
                    {{displaySadrzaj(2,red)}}
                </div>
            </div>
            <div class="col">
                <div class="border p-1 text-center pointer-cursor" v-if="displayDiv(1, red)" v-on:mouseover="prikaziX(red, 2)" v-on:mouseleave="ukloniX(red, 2)">
                    <img :ref="red + '-' + 2" src="/icons/close.png" class="rounded-circle border slikax mx-auto" style="height:25px;width:25px;display:none;" v-on:click="ukloniPeriod(red,1)">
                    {{displaySadrzaj(1,red)}}
                </div>
            </div>
        </div>
        
    </div>

    `,
    methods: {
        prikaziX: function(red, i){
            this.$refs[red + '-' + i][0].style.display = "block";
        },
        ukloniX: function(red, i){
            this.$refs[red + '-' + i][0].style.display = "none";
        },
        displaySadrzaj: function(i, red){
            period = this.periodi[red*2-i];
            return period;
        },
        ukloniPeriod: function(red, i){
            index = red*2-i;
            pocetniDatum = new Date(this.periodi[index].slice(0, 10));
            krajnjiDatum = new Date(this.periodi[index].slice(13, 23));
            console.log(pocetniDatum);
            console.log(krajnjiDatum);
            for(pocetniDatum; pocetniDatum <= krajnjiDatum; pocetniDatum.setDate(pocetniDatum.getDate() + 1)){ 
                i1 = this.datumi.map(Number).indexOf(+pocetniDatum);;
                console.log(i1);
                this.datumi.splice(i1, 1);
            }
            this.periodi.splice(index,1);
            this.brojPerioda--;
        },
        displayDiv: function(i, red)
        {
            if(this.periodi.length <= red*2-i){
                return false;
            }
            return true;
        },
        umanjiVremePrijave: function(){
            if(this.vremePrijave == 0){
                this.vremePrijave = 23;
                return;
            };
            this.vremePrijave--;
        },
        uvecajVremePrijave: function(){
            if(this.vremePrijave == 23){
                this.vremePrijave = 0;
                return;
            }
            this.vremePrijave++;
        },
        umanjiVremeOdjave: function(){
            if(this.vremeOdjave == 0){
                this.vremeOdjave = 23;
                return;
            };
            this.vremeOdjave--;
        },
        uvecajVremeOdjave: function(){
            if(this.vremeOdjave == 23){
                this.vremeOdjave = 0;
                return;
            }
            this.vremeOdjave++;
        },
        dajVreme: function(n){
            return (n < 10) ? ("0" + n) : n
        },
        proveriSelekciju: function(){
            if(this.pocetniDatum != null && this.krajnjiDatum != null && this.pocetniDatum < this.krajnjiDatum){
                this.disabled = false;
            }
            else this.disabled = true;
        },
        dodajDatum: function(){
            if(!this.periodi.includes(this.pocetniDatum + " - " + this.krajnjiDatum)){ 
                for(var p = new Date(this.pocetniDatum); p <= new Date(this.krajnjiDatum); p.setDate(p.getDate() + 1)){
                    date = new Date(p);
                    date.setHours(date.getHours() - 1); 
                    this.datumi.push(date.getTime());
                    console.log(new Date(p));
                }
                this.brojPerioda++;
                this.brojRedova = Math.ceil(this.brojPerioda/2);
                this.periodi.push(this.pocetniDatum + " - " + this.krajnjiDatum);
            }
        },
    },
    mounted: function(){
        this.$root.$on('submitPodatke',() => {
            this.$root.$emit('submitVremeDatum', this.vremePrijave, this.vremeOdjave, this.datumi);
        })
    }
})