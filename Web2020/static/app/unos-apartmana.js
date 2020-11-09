Vue.component('unos-apartmana', {
    data: function(){
        return {
            sadrzaji: null
        }
    },
    template:/*html*/ `
        <div class="form-group container-login" >
            <div class="wrap-login">
                <span class="login-span">Unos apartmana</span>
                <input class="login-input form-control form-control-good" placeholder="Korisničko ime">
                <input class="login-input form-control form-control-good" placeholder="Lozinka">
                <ul>
                    <li v-for="sadrzaj in sadrzaji">{{sadrzaj.naziv}}</li>
                </ul>
                <button class="btn btn-primary login-btn">Dodaj</button>
             </div>
        </div> 
    `
    ,
    mounted: function(){
        axios
            .get('/getSadrzaji')
            .then(response => this.sadrzaji = response.data)
    }
});