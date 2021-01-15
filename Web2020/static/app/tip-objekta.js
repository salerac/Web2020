Vue.component('tip-objekta', {
    data: function(){
        return {
            rowClass: "row height-row border mt-3",
            selectedElement: 0
        }
    },
    template:/*html*/ `
    <div class="row p-0 m-0" style="width:100%;">
        <div class="col">
            <div class="row">
                <h2>Odaberite tip smestaja</h2>
            </div>  
            <div v-bind:class="rowClass" :ref="0" v-on:click="selectOption($event,0)" >
                <div class="col-3 p-3 d-flex align-items-center h-100">
                    <img src="/icons/house.png" class="img-fluid">
                </div>
                <div class="col p-3 h-100">
                    <b>Ceo apartman</b>
                    <p>Gostima je dostupan ceo objekat.</p>
                </div>
            </div>
            <div v-bind:class="rowClass" :ref="1" v-on:click="selectOption($event,1)">
                <div class="col-3 p-3 d-flex align-items-center h-100">
                    <img src="/icons/bedroom.png" class="img-fluid">
                </div>
                <div class="col p-3 h-100">
                    <b>Soba</b>
                    <p>Gostima je dostupna jedna prostorija datog objekta.</p>
                </div>
            </div>
        </div>
    </div>
    `
    ,
    methods: {
        selectOption: function(e,target){
            this.$refs[0].className = this.rowClass;
            this.$refs[1].className = this.rowClass;
            this.$refs[target].className = "row height-row border mt-3 highlighted-input";
            this.selectedElement = target;
        }
    },
    mounted: function(){
        this.$root.$on('submitPodatke',() => {
            this.$root.$emit('submitTip', this.selectedElement);
        })
    }
});