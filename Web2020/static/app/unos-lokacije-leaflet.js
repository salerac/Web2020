Vue.component("unos-lokacije-leaflet", {
    data: function(){
        return {
            map: null,
        }
    },
    template:/*html*/ `
    <div class="col container" style="">
        <div class="row m-3 ml-0">
            <div class="col">
                <input class="login-input form-control mb-3" id="search" ref="search" type="text" placeholder="Ulica">
                <input class="login-input form-control" id="search" ref="search1" type="text" placeholder="Grad">
            </div>
            <div class="col">
                <input class="login-input form-control" id="search" ref="search1" type="text" style="width:100px;" placeholder="Broj">
            </div>
        </div>
        <div class="row m-3" style="height:300px;">
            <div class="col">
            <div id="map"></div>
            </div>
        </div>
    </div>
    `,
    mounted: function(){
        this.map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
        }).addTo(this.map);
    }
    
})