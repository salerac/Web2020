Vue.component('pregled-sadrzaja', {
    data: function(){
        return{
            sadrzaj: null,
            ime: null,
            editing: false,
            sadrzajZaSlanje: null,
            error: false,
        }
    },
    template:/*html*/`
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col ml-3">
                <div class="row">
                    <h3 class="pl-0"><b>Sadržaji u sistemu</b></h3>
                </div>
                <div class="row">
                    <hr class="mt-1 ml-0"/>
                </div>
                <div class="row border border-dark p-1 mt-2">
                    <div class="col border-right">
                        <span><b>Naziv</b></span>
                    </div>
                    <div class="col-1 border-right">
                    </div>
                    <div class="col-1 border-right">
                    </div>
                </div>
                <div class="row border border-dark border-top-0 p-1" v-for="s in sadrzaj">
                    <div class="col border-right">
                        {{s.naziv}}
                    </div>
                    <div class="col-1 border-right pointer-cursor d-flex align-items-center justify-content-center" v-on:click="edit(s)">
                        <img class="my-auto text-center" src="icons/edit.png" style="width:20px; height:20px;">
                    </div>
                    <div class="col-1 border-right pointer-cursor d-flex align-items-center justify-content-center" v-on:click="obrisi(s)">
                        <img class="my-auto text-center" src="icons/close.png" style="width:20px; height:20px;">
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-1 d-flex align-items-center justify-content-center">
                        <div class="rounded-circle border p-1 pointer-cursor" v-on:click="dodaj()">
                            <img class="my-auto text-center" src="icons/plus.png" style="width:25px; height:25px;">
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="col"></div>
        </div>

         <!-- Modal -->
         <div id="myModal100" class="modal fade" role="dialog">
            <div class="modal-dialog modal-dialog-centered" style="width:300px;">
                <!-- Modal content-->
                <div class="modal-content my-modal">
                    <div class="modal-body">
                        <div v-if="!edit">
                            <p>Unesite naziv sadržaja</p>
                            <input class="login-input border" placeholder="Ime" v-model="ime">
                            <span class="small" v-if="error" style="color:red">Niste uneli naziv.</span>
                        </div>
                        <div v-if="edit">
                            <p>Izmenite ime sadržaja</p>
                            <input class="login-input border" placeholder="Ime" v-model="ime">
                            <span class="small" v-if="error" style="color:red">Niste uneli naziv.</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-3">
                                    <button type="button" class="btn btn-light border mt-1" v-on:click="odustani()">Odustani</button>
                                </div>
                                <div class="col"></div>
                                <div class="col-4">
                                    <button type="button" class="btn btn-primary mt-1 mr-3" v-on:click="submit()">Potvrdi</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
            })
    },
    methods: {
        dodaj: function(){
            $('#myModal100').modal('show');
        },
        odustani: function(){
            this.error = false;
            $('#myModal100').modal('hide');
        },
        edit: function(s){
            this.sadrzajZaSlanje = s;
            this.editing = true;
            $('#myModal100').modal('show');
        },
        obrisi: function(s){
            this.sadrzajZaSlanje = s;
            this.error = false;
            user = JSON.parse(localStorage.getItem('user'));  
            userId = user.id;
            header = "Bearer " + user.jwt;
            options = {
                data: this.sadrzajZaSlanje,
                headers: {'Authorization': header}
            }
            axios
                .delete("/admin/obrisiSadrzaj", options)
                .then(response => {
                    this.sadrzajZaSlanje = null;
                    this.$root.$emit("izmena");
                });
        },
        submit: function(){
            if(this.ime == null || this.ime == ""){
                this.error = true;
                console.log("null je")
                return;
            }
            this.error = false;
            user = JSON.parse(localStorage.getItem('user'));  
            userId = user.id;
            header = "Bearer " + user.jwt;
            if(this.editing == true){
                this.sadrzajZaSlanje.naziv = this.ime;
                axios
                .put("/admin/editSadrzaj", this.sadrzajZaSlanje, {headers: {'Authorization': header}})
                .then(response => {
                    $('#myModal100').modal('hide');
                    this.editing = false;
                    this.sadrzajZaSlanje = null;
                    this.$root.$emit("izmena");
                })
            }
            else
            { 
            axios
                .post("/admin/dodajSadrzaj", {naziv: this.ime}, {headers: {'Authorization': header}})
                .then(response => {
                    $('#myModal100').modal('hide');
                    this.$root.$emit("izmena");
                })
            }
        }
    }
})