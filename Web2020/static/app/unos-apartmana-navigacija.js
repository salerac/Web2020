Vue.component('unos-apartmana-navigacija',{
    data: function(){
        return {
            lokacija: 0,
            stilNazad: 'height:50px;width:50px;opacity:0.3;',
            tekstDugmeta: 'Nastavi',
            klasa: "col p-0 border d-flex align-items-center justify-content-center bg-primary pointer-cursor",
        }
    },
    template: /*html*/`
    <div class="row ml-0 mt-2" style="width:100%;">
        <div class="col-2 p-0 mr-1 border border-solid pointer-cursor" :style="stilNazad">
            <img src="/icons/back.png" class="border p-1" style="height:100%;width:100%;" v-on:click="vrati(); proveriPoziciju();">
        </div>
        <div :class="klasa" v-on:click="nastavi($event); proveriPoziciju();">
            <b>{{tekstDugmeta}}</b>
        </div>
    </div>
    `,
    mounted: function(){
        console.log(this)
        //this.traziLokaciju();
        //this.proveriPoziciju();
    
    },
    created: function(){
        this.$root.$on('dajLokaciju',(arg) => {
            console.log('dobio')
            this.lokacija = arg;
        })
       /*this.$root.$on('validiraj',(arg) => {
            if(arg){
                this.disabled = ""
            }
            else this.disabled = "opacity:0.3;pointer-events: none";
        })*/
    },
    activated: function(){
        console.log("AKTIVIRAN NAV")
    },
    methods: {
        nastavi: function(e){
            if(this.lokacija == 4){
                this.$root.$emit("submitPodatke");
                user = JSON.parse(localStorage.getItem('user'));  
                userId = user.id;
                header = "Bearer " + user.jwt;
                console.log("submitujem");
                axios
                    .post('/domacin/addApartman', this.$attrs.apartman, {headers: {'Authorization': header}})
                    .then((response) => {
                        this.$router.push({name: "dashboard"});
                    })
                    .catch((error) => {

                    })
            }
            else { 
            if(this.lokacija == 3){
                this.klasa = "col p-0 border d-flex align-items-center justify-content-center bg-success pointer-cursor";
                this.tekstDugmeta = "Završi";
            }
            this.$root.$emit('nastavi');
            this.stilNazad = "height:50px;width:50px;opacity:1;";
            this.lokacija++;
            }
            
        },
        vrati: function(){
            if(this.proveriPoziciju() == 0)
            {
                console.log('nula je 2');
                return;
            }
            else 
            {
            this.klasa = "col p-0 border d-flex align-items-center justify-content-center bg-primary pointer-cursor";
            this.tekstDugmeta = "Nastavi";
            console.log('nisam vratio')
            this.$root.$emit('vrati');
            this.lokacija--;
            this.proveriPoziciju();
            }
            //this.disabled = "opacity:1;";
        },
        traziLokaciju: function(){
            this.$root.$emit('traziLokaciju')
        },
        proveriPoziciju: function(){
            if(this.lokacija == 0)
            {
                this.stilNazad = "height:50px;width:50px;opacity:0.3;";
                return 0;
            }
            else
            { 
                this.stilNazad = "height:50px;width:50px;";
                return 1;
            }
        }
    }
})