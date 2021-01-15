Vue.component('unos-lokacije',{
    data: function(){
        return {
            map: null,
            marker: null,
            ulica: null,
            broj: null,
            grad: null,
            postanskiBroj: null,
            lokacija: null
        }
    },
    template:/*html*/ `
    <div class="col-xl-15 p-0 container" style="">
        <div class="row">
                <h2>Podaci o lokaciji</h2>
        </div> 
        <div class="row m-3 ml-0">
            <div class="col p-0">
                <input class="login-input form-control mb-3" v-model="ulica" id="search" ref="search" type="text" placeholder="Ulica">
                <input class="login-input form-control" v-model="grad" id="search" ref="search1" type="text" placeholder="Grad">
            </div>
            <div class="col">
                <input class="login-input form-control mb-3" min="0" type="number" v-model="broj" id="search" ref="search1" style="width:100px;" placeholder="Broj">
                <input class="login-input form-control mb-3" min="0" type="number" v-model="postanskiBroj" id="search" ref="search1" style="width:200px;" placeholder="Poštanski broj">
            </div>
        </div>
        <div class="row">
                <h5>Klikom na mapu obelezite lokaciju smestaja</h5>
        </div>
        <div class="row m-0" style="height:300px;width:100%;">
            <div class="col p-0">
            <div id="map"></div>
            </div>
        </div>
    </div>
    `,
    methods: {
        initMap: function(){
            this.map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 45.252, lng: 19.836 },
                zoom: 13,
            });
            this.marker = new google.maps.Marker({
                position: { lat: 45.252, lng: 19.836 },
                map: this.map,
                title: "pocetni",
            });
            this.map.addListener('click', e => {
                this.staviMarker(e.latLng);
            });
        },
        staviMarker: function(position){
            this.marker.setPosition(position);
            this.lokacija = 
            {
                duzina: position.lat(),
                sirina: position.lng() 
            }
        },
        autocomplete: function(){
            let input = this.$refs['search'];
            const autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
            let map = this.map;
            const marker = new google.maps.Marker({
                map,
                anchorPoint: new google.maps.Point(0, -29),
              });
            autocomplete.addListener("place_changed", () => {
                marker.setVisible(false);
                const place = autocomplete.getPlace();

                if (!place.geometry) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No details available for input: '" + place.name + "'");
                    place = null;
                    return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17); // Why 17? Because it looks good.
                }
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                let address = "";

                if (place.address_components) {
                    address = [
                    (place.address_components[0] &&
                        place.address_components[0].short_name) ||
                        "",
                    (place.address_components[1] &&
                        place.address_components[1].short_name) ||
                        "",
                    (place.address_components[2] &&
                        place.address_components[2].short_name) ||
                        "",
                    ].join(" ");
                }
                console.log(address);
            })
        }
    },
    mounted: function(){
        let script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMGnRyzotturmaqorihBs1rP3ztn8vT7o&libraries=places&callback=initMap';
        window.initMap = this.initMap;
        document.head.appendChild(script);
        this.$root.$on('submitPodatke',() => {
            this.$root.$emit('submitLokacija', this.ulica, this.broj, this.grad, this.postanskiBroj, this.lokacija);
        })
        
    } 

})