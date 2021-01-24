Vue.component('unos-apartmana', {
    data: function(){
        return {
            apartman: {
                tip: null,
                brojSoba: null,
                brojGostiju: null,
                cena: null,
                slike: [],
                sadrzaj: [],
                ulica: null,
                broj: null,
                grad: null,
                postanskiBroj: null,
                lokacija: null,
                vremePrijave: 14,
                vremeOdjave: 10,
                datumi: []
            },
            komponente: ['tip-objekta','detalji-apartmana','sadrzaj','unos-lokacije','unos-vremena-datuma'],
            trenutnaKomponenta: 0
        }
    },
    template:/*html*/ `
        <div>
            <div class="container-fluid">
                <div class="row mt-4">
                    <div class="col" v-bind:key="1"></div>
                    <div class="col-md-3 p-0">
                            <transition @before-leave="beforeLeave" name="fade" mode="out-in">
                                <keep-alive>
                                    <component :is="komponente[trenutnaKomponenta]"></component>
                                </keep-alive>
                            </transition>
                        <unos-apartmana-navigacija :key="2"></unos-apartmana-navigacija>
                    </div>
                    <div class="col" v-bind:key="3"></div>
                </div>
            </div>
        </div> 
    `
    ,
    mounted: function(){
        this.$root.$on('nastavi',() => {
            this.trenutnaKomponenta++;
        }),
        this.$root.$on('vrati',() => {
            this.trenutnaKomponenta--;
        }),
        axios
            .get('/getSadrzaji')
            .then(response => this.sadrzaji = response.data)
    },
    created: function(){
        this.$root.$on('traziLokaciju',() => {
            this.dajLokaciju();
        })
        this.$root.$on('submitTip',(tip) => {
            this.apartman.tip = tip;
        })
        this.$root.$on('submitDetalji',(brojSoba, brojGostiju, cena, slike) => {
            this.apartman.brojSoba = brojSoba;
            this.apartman.brojGostiju = brojGostiju;
            this.apartman.cena = cena;
            this.apartman.slike = slike;
        })
        this.$root.$on('submitSadrzaj',(sadrzaj) => {
            this.apartman.sadrzaj = sadrzaj;
        })
        this.$root.$on('submitLokacija',(ulica, broj, grad, postanskiBroj, lokacija) => {
            this.apartman.ulica = ulica;
            this.apartman.broj = broj;
            this.apartman.grad = grad;
            this.apartman.postanskiBroj = postanskiBroj;
            this.apartman.lokacija = lokacija
        })
        this.$root.$on('submitVremeDatum',(vremePrijave, vremeOdjave, datumi) => {
            this.apartman.vremePrijave = vremePrijave;
            this.apartman.vremeOdjave = vremeOdjave;
            this.apartman.datumi = datumi;
            user = JSON.parse(localStorage.getItem('user'));  
            userId = user.id;
            header = "Bearer " + user.jwt;
            axios
                .post('/domacin/addApartman', this.apartman, {headers: {'Authorization': header}})
                .then(response => {
                    alert("dodao");
                })
                .catch(error => {
                    this.error = error.response.data['message'];
                })
        })
    },
    methods: {
        nastavi: function(){
            trenutnaKomponenta++;
        },
        beforeLeave(el) {
            console.log(el)
            const {marginLeft, marginTop, width, height} = window.getComputedStyle(el)
    
            el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
            el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
            
        },
        dajLokaciju: function(){
            this.$root.$emit('dajLokaciju',(this.trenutnaKomponenta));
        }
    }
});