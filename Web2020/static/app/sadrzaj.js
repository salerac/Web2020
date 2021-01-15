Vue.component('sadrzaj',{
    data: function(){
        return {
            sadrzaj: null,
            brojRedova: 0,
            selektovanSadrzaj: []
        }
    },
    template:/*html*/`
    <div class="col">
        <div class="row">
            <h2>Sadrzaj</h2>
        </div>
        <div class="row">
            <h5>Selektujte sta vas apartman sadrzi</h5>
        </div>  
        <div v-for="red in brojRedova" class="row mt-2">
            <div class="col">
                <div class="p-1 text-center border pointer-cursor" v-if="displayDiv(3, red)" v-on:click="selectSadrzaj($event, red, 3)">{{displaySadrzaj(3,red)}}
                </div>
            </div>
            <div class="col">
                <div class="p-1 text-center border pointer-cursor" v-if="displayDiv(2, red)" v-on:click="selectSadrzaj($event, red, 2)">{{displaySadrzaj(2,red)}}
                </div>
            </div>
            <div class="col">
                <div class="p-1 text-center border pointer-cursor" v-if="displayDiv(1, red)" v-on:click="selectSadrzaj($event, red, 1)">{{displaySadrzaj(1,red)}}
                </div>
            </div>
        </div>
    </div>
    `,
    mounted: function(){
        axios
            .get('/getSadrzaji')
            .then(response => {
                this.sadrzaj = response.data;
                this.brojRedova = Math.ceil(this.sadrzaj.length/3);
            })
            this.$root.$on('submitPodatke',() => {
                this.$root.$emit('submitSadrzaj', this.selektovanSadrzaj);
            })
    },
    methods: {
        displaySadrzaj: function(i, red){
            naziv = this.sadrzaj[red*3-i].naziv;
            return naziv;
        },
        displayDiv: function(i, red)
        {
            if(this.sadrzaj.length <= red*3-i){
                return false;
            }
            return true;
        },
        selectSadrzaj: function(e, red, i){
            id = this.sadrzaj[red*3-i].id;
            if(!this.selektovanSadrzaj.includes(id))
            { 
                this.selektovanSadrzaj.push(id);
                e.target.className = "p-1 text-center border pointer-cursor highlighted-input";
            }
            else
            {
                index = this.selektovanSadrzaj.indexOf(id);
                this.selektovanSadrzaj.splice(index,1);
                e.target.className = "p-1 text-center border pointer-cursor";
            }
        }
    }
})