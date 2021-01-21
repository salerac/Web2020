Vue.component('pregled-apartmana',{
    data: function(){
        return {
            apartmani: null,
            filtriraniApartmani: null,
            brojRedova: 0,
            showTip: false,
            selektovaniTipovi: [false, false],
            selektovanSadrzaj: [],
            filterCheck: true,
            showSadrzaj: false,
            sadrzaj: null,
            sortToggle: false,
            sort: false,
            apartmaniPoTipu: null,
            apartmaniPoSadrzaju: null,
            }
    },
    template: /*html*/`
    <div class="container-fluid pregled-pozadina" v-on:click="sakrijFiltere">
        <div class="row">
            <div class="col" style="height:70px;background-color:darkslategray;width:100%;">
                <h2 class="mt-3 text-light">Web2020</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col">
                <div class="row mt-3">
                    <h1>Pronađen smeštaj</h1>
                </div>
                <div class="row mt-3">
                    <div class="col-3" style="width:400px;">
                        <div class="row">
                            <div class="col-3" style="width:86px">
                                <div class="row">
                                    <div v-if="sortToggle" class="col-1 pr-0">
                                        <img v-if="sort && sortToggle" class="mt-1" src="icons/up-arrow.png" style="width:10px;height:15px;">
                                        <img v-if="!sort && sortToggle" class="mt-1" src="icons/down-arrow.png" style="width:10px;height:15px;">
                                    </div>
                                    <div class="col pr-0">
                                        <button class="rounded-pill border" v-on:click="sortiraj">Cena</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-1 ml-0 pl-0">
                                <button class="rounded-pill border" v-on:click="openTip">Tip</button>
                            </div>
                            <div class="col-1 ml-2">
                                <button class="rounded-pill border" v-on:click="openSadrzaj">Sadrzaj</button>
                            </div>
                        </div>
                        <div class="row" style="height:0px;">
                            <div class="col-3" style="width:70px">
                            </div>
                            <div class="col-1 ml-1">
                                <div class="row tip-filter shadow border mt-2 pb-2" v-show="showTip">
                                    <div class="row mt-1">
                                        <div class="col-2">
                                            <input type="checkbox" class="big-checkbox mt-4" v-model="selektovaniTipovi[0]">
                                        </div>
                                        <div class="col">
                                            <b class="small">Ceo apartman</b>
                                            <span class="small">Gostima je dostupan ceo objekat</span>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-2">
                                            <input type="checkbox" class="big-checkbox mt-4" v-model="selektovaniTipovi[1]">
                                        </div>
                                        <div class="col">
                                            <b class="small">Soba</b>
                                            <span class="small">Gostima je dostupna jedna prostorija datog objekta</span>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <button class="rounded-pill border ml-2" v-on:click="filtriraj">Primeni</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col ml-2">
                                <div class="row tip-filter shadow border mt-2 pb-2" v-show="showSadrzaj">
                                    <div class="row" v-for="(s, i) in sadrzaj">
                                        <div class="col-3 ml-2">
                                            <input type="checkbox" class="big-checkbox mt-3" v-model="selektovanSadrzaj[i]">
                                        </div>
                                        <div class="col pt-3">
                                            <span class="">{{s.naziv}}</span>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <button class="rounded-pill border ml-2" v-on:click="filtriraj">Primeni</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                    </div>
                    <div class="col">
                    </div>
                    <div class="col"></div>
                </div>
                <div v-for="red in brojRedova" class="row mt-3">
                    <div class="col">
                        <apartman-detalji-mini class="pointer-cursor" v-if="displayDiv(5, red)" :apartman="getIndex(5, red)"></apartman-detalji-mini>
                    </div>
                    <div class="col">
                        <apartman-detalji-mini class="pointer-cursor" v-if="displayDiv(4, red)" :apartman="getIndex(4, red)"></apartman-detalji-mini>
                    </div>
                    <div class="col">
                        <apartman-detalji-mini class="pointer-cursor" v-if="displayDiv(3, red)" :apartman="getIndex(3, red)"></apartman-detalji-mini>
                    </div>
                    <div class="col">
                        <apartman-detalji-mini class="pointer-cursor" v-if="displayDiv(2, red)" :apartman="getIndex(2, red)"></apartman-detalji-mini>
                    </div>
                    <div class="col">
                        <apartman-detalji-mini class="pointer-cursor" v-if="displayDiv(1, red)" :apartman="getIndex(1, red)"></apartman-detalji-mini>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
    `,
    methods: {
        getIndex: function(i, red){
            index = this.filtriraniApartmani[red*5 - i];
            return index;
        },
        displayDiv: function(i, red)
        {
            if(this.filtriraniApartmani.length <= red*5-i){
                return false;
            }
            return true;
        },
        openTip: function(){
            if(this.showTip == true)
                {
                    this.showTip = false;
                }
            else
                {
                    this.showSadrzaj = false;
                    this.showTip = true;
                }
        },
        openSadrzaj: function(){
            if(this.showSadrzaj == true)
                {
                    this.showSadrzaj = false;
                }
            else
                {
                    this.showTip = false;
                    this.showSadrzaj = true;
                }
        },
        sortiraj: function(e){
            if(!this.sort)
            {
                this.filtriraniApartmani.sort((a, b) => a.cenaPoNoci - b.cenaPoNoci);
                this.sort = true;
                this.sortToggle = true;
            }
            else{
                this.filtriraniApartmani.sort((a, b) => b.cenaPoNoci - a.cenaPoNoci);
                this.sort = false;
            }
        },
        sakrijFiltere: function(e){
            if(e.target.tagName != "BUTTON" && e.target.tagName != "INPUT"){ 
            console.log(e.target.tagName);
            this.showSadrzaj = false;
            this.showTip = false;
            }
        },
        filtriraj: function(){
            this.showTip = false;
            index = this.selektovaniTipovi.indexOf(true);
            value = null;
            if(index == 0){
                value = false;
            }
            else{
                value = true;
            }
            if((this.selektovaniTipovi[0] == true && this.selektovaniTipovi[1] == true) || (this.selektovaniTipovi[0] == false && this.selektovaniTipovi[1] == false)){
                value = null;
            }

            this.showSadrzaj = false;
            sadrzaji = [];
            for(i = 0; i < this.selektovanSadrzaj.length; i++){
                if(this.selektovanSadrzaj[i] == true){
                    sadrzaji.push(this.sadrzaj[i].id);
                }
            }
            axios
                .get('/filtrirajApartmane', {
                    params: {
                        tip: value,
                        sadrzaj: {  sadrzaji }
                    }
                }
                )
                .then(response => {
                    this.filtriraniApartmani = response.data;
                    this.brojRedova = Math.ceil(this.apartmani.length/5);
                })
        },
        filterPoSadrzaju: function(i){
            console.log("usao "+i)
            this.selektovanSadrzaj[i] = !this.selektovanSadrzaj[i];
        },
        getApartmani: function(){
            pretraga = this.$route.query;
            axios
                .post("/searchApartmani", pretraga)
                .then(response => {
                    this.apartmani = response.data;
                    this.filtriraniApartmani = response.data;
                    this.brojRedova = Math.ceil(this.apartmani.length/5);
                })
            }
           
         },
    created: function(){
        if(this.apartmani == null){
        console.log(this.$route.query);
        this.getApartmani();
        }
        axios
        .get('/getSadrzaji')
        .then(response => {
            this.sadrzaj = response.data;
            this.brojSadrzaja = this.sadrzaj.length;
            for(i = 0; i < this.sadrzaj.length; i++){
                this.selektovanSadrzaj.push(false);
            }
        })
    }
})