Vue.component('apartman-detalji-mini', {
    data: function(){
        return{
            props: {
                apartman: Object
            },
            domacin: false,
            admin: false,
        }
    },
    template: /*html*/`
    <div class="container">
        <div class="row"  v-on:click="goToApartman">
            <div class="row">
                <div class="d-inline p-1 mr-1">
                    <img :src="$attrs.apartman.slike[0]" class="pregled-slike" style="width:100%;height:100%">
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-1 p-0">
                    <img class="mt-1" src="icons/pin.png" style="width:15px;height:15px;">
                </div>
                <div class="col p-1">
                {{$attrs.apartman.lokacija.adresa.grad}}
                </div>
            </div>
            <div class="row">
                <div class="col-1 p-0">
                    <img class="mt-2" src="icons/living-room.png" style="width:15px;height:15px;">
                </div>
                <div class="col p-1">
                    <div v-if="$attrs.apartman.tip" class="p-0">
                        Jedna soba
                    </div>
                    <div v-else class="p-0">
                        Ceo apartman
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-1 p-0">
                    <img class="mt-2" src="icons/dollar.png" style="width:15px;height:15px;">
                </div>
                <div class="col p-1">
                    <b class="p-0">{{$attrs.apartman.cenaPoNoci}}/noći</b>
                </div>
            </div>
        </div>
        <div class="row" v-if="domacin && !$attrs.neaktivni">
            <div class="col p-0">
                <button class="btn border btn-light" v-on:click="rezervacije()">Rezervacije</button>
            </div>
            <div class="col">
                <button class="btn border btn-danger" v-on:click="obrisi()">Obriši</button>
            </div>
        </div>
        <div class="row" v-if="$attrs.neaktivni">
            <div class="col p-0">
            <button class="btn border btn-light" v-on:click="aktiviraj()">Aktiviraj</button>
            </div>
            <div class="col"></div>
        </div>
        <div class="row" v-if="admin">
            <div class="col p-0">
                <button class="btn border btn-danger" v-on:click="obrisi()">Obriši</button>
            </div>
            <div class="col">
            </div>
        </div>
    </div>
    `,
    methods: {
        src: function(){
            return this.apartman.slike[0];
        },
        goToApartman: function(){
            this.$router.push({name: 'apartman', query: {id: this.$attrs.apartman.id}});
        },
        rezervacije: function(){
            this.$root.$emit("rezervacije", this.$attrs.apartman.id);
        },
        aktiviraj: function(){
            user = JSON.parse(localStorage.getItem('user'));  
            userId = user.id;
            header = "Bearer " + user.jwt;
            axios
                .post("/domacin/aktivirajApartman", this.$attrs.apartman, {headers: {'Authorization': header}})
                .then(() => {
                    this.$root.$emit("izmena");
                }) 
        },
        obrisi: function(){
            user = JSON.parse(localStorage.getItem('user'));  
            userId = user.id;
            header = "Bearer " + user.jwt;
            path = "";
            if(this.domacin == true){
                path = "/domacin/obrisiApartman";
            }
            else path = "/admin/obrisiApartmanAdmin"
            axios
                .delete(path, {
                    headers: {
                    Authorization: "Authorization " + header,
                    },
                    data: this.$attrs.apartman
                    })
                .then(() => {
                    this.$root.$emit("izmena");
                }) 
        }
    },
    mounted: function(){
        if(this.$attrs.domacin == true){
            this.domacin = true;
        }
        if(this.$attrs.admin == true){
            this.admin = true;
        }
    }
})