Vue.component('apartman-detalji-mini', {
    data: function(){
        return{
            props: {
                apartman: Object
            }
        }
    },
    template: /*html*/`
    <div class="container" v-on:click="goToApartman">
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
    `,
    methods: {
        src: function(){
            return this.apartman.slike[0];
        },
        goToApartman: function(){
            this.$router.push({name: 'apartman', query: {id: this.$attrs.apartman.id}});
        }
    }
})