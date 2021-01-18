Vue.component('pregled-apartmana',{
    data: function(){
        return {
            apartmani: null,
            brojRedova: 0,
            }
    },
    template: /*html*/`
    <div class="container-fluid">
        <div class="row">
            <div class="col" style="height:70px;background-color:darkslategray;width:100%;"></div>
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col border">
                <div class="row">
                    <h1>Rezultati pretrage</h1>
                </div>
                <div v-for="red in brojRedova" class="row mt-1">
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
            index = this.apartmani[red*5 - i];
            return index;
        },
        displayDiv: function(i, red)
        {
            if(this.apartmani.length <= red*5-i){
                return false;
            }
            return true;
        },
    },
    created: function(){
        if(this.apartmani == null){
        console.log(this.$route.query);
        pretraga = this.$route.query;
        axios
        .post("/searchApartmani", pretraga)
        .then(response => {
            this.apartmani = response.data;
            this.brojRedova = Math.ceil(this.apartmani.length/5);
        })
        }
    }
})