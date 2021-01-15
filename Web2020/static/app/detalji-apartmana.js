Vue.component('detalji-apartmana',{
    data: function(){
        return {
            slike: [],
            path: null,
            display: 'height:25px;width:25px;display:none',
            brojSoba: 0,
            brojGostiju: 0,
            cena: null,
            minus1: "height:25px;width:25px;opacity:0.3;",
            minus2: "height:25px;width:25px;opacity:0.3;"
        }
    },
    template: /*html*/`
    <div class="col-md container pl-0" style="width:120%;">
            <div class="row">
                <h2>Detalji o smestaju</h2>
            </div> 
        <div class="row m-3 ml-0">
            <div class="col-7 pl-0">
                <div class="mt-3">
                    <label class="font-weight-bold">Broj soba:</label>
                </div>
                <div class="mt-3">
                    <label class="font-weight-bold">Broj gostiju:</label>
                </div>
                <div class="mt-4">
                    <label class="font-weight-bold">Cena po nocenju:</label>
                </div>
                <div class="mt-5">
                    <label class="font-weight-bold">Dodajte slike:</label>
                </div>
            </div>
            <div class="col-4">
                <div class="mt-3 brojac">
                    <img src="/icons/remove.png" id="minus1" class="rounded-circle border p-1 mr-3 plusminus" v-bind:style="minus1" v-on:click="umanjiBrojSoba">
                    <span class="font-weight-bold">{{brojSoba}}</span>
                    <img src="/icons/plus.png" id="plus1" class="rounded-circle border p-1 ml-3 plusminus" style="height:25px;width:25px" v-on:click="uvecajBrojSoba">
                </div>
                <div class="mt-3 brojac">
                    <img src="/icons/remove.png" id="minus2" class="rounded-circle border p-1 mr-3 plusminus" v-bind:style="minus2" v-on:click="umanjiBrojGostiju">
                    <span class="font-weight-bold">{{brojGostiju}}</span>
                    <img src="/icons/plus.png" id="plus2" class="rounded-circle border p-1 ml-3 plusminus" style="height:25px;width:25px" v-on:click="uvecajBrojGostiju">
                </div>
                <div class="d-flex align-items-center mt-3">
                    <input v-model="cena" min="0" type="number" class="login-input form-control d-inline mb-3" style="width:150px;">
                    <span class="d-inline ml-2 pb-3">RSD</span>
                </div>
                <div class="mt-3">
                    <div class="custom-file">
                        <form ref="inputFile">
                            <input type="file" class="custom-file-input" id="customFile" v-on:change="dodajSliku">
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row m-3 ml-0 mr-0">
            <div class="d-inline border border-primary p-1 mr-1 slika-div" v-for="(slika,index) in slike" style="height:140px;width:31.7%;" v-on:mouseover="prikaziX(index)" v-on:mouseleave="sakrijX(index)">
                <img :data-id="index" :ref="index" src="/icons/close.png" class="rounded-circle border border-dark position-absolute slikax" style="height:25px;width:25px;display:none;" v-on:click="ukloniSliku">
                <img :src="slika" style="width:100%;height:100%;">
            </div>
        </div>
        

    </div>
    `,
    methods: {
        dodajSliku: function(e){
            this.slike.push(URL.createObjectURL(e.target.files[0]));
            document.getElementById("customFile").value = "";
        },
        prikaziX: function(index){ 
            this.$refs[index][0].style.display = "block";
        },
        sakrijX: function(index){
            this.$refs[index][0].style.display = "none";
        },
        ukloniSliku: function(e){
            this.slike.splice(e.target.dataset.id,1);
        },
        umanjiBrojSoba: function(e){
            if(this.brojSoba == 0) return;
            this.brojSoba--;
            if(this.brojSoba == 0)
                this.minus1 = "height:25px;width:25px;opacity:0.3;"; 
        },
        uvecajBrojSoba: function(e){
            this.minus1 = "height:25px;width:25px;opacity:1;";
            this.brojSoba++;
        },
        umanjiBrojGostiju: function(e){
            if(this.brojGostiju == 0) return;
            this.brojGostiju--;
            if(this.brojGostiju == 0)
                this.minus2 = "height:25px;width:25px;opacity:0.3;";
        },
        uvecajBrojGostiju: function(e){
            this.minus2 = "height:25px;width:25px;opacity:1;"; 
            this.brojGostiju++;
        }
    },
    mounted: function(){
        this.$root.$on('submitPodatke',() => {
            this.$root.$emit('submitDetalji', this.brojSoba, this.brojGostiju, this.cena, this.slike);
        })
    }

})