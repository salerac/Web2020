Vue.component("login-page", {
    data: function(){
        return{
            styleObject: {
               height: '15px',
               width: '100%'
            },
            inputBorder: {
                borderColor: ''
            },
            user: {
                username: null,
                lozinka: null
            },
            error: null,
            usernameEmpty: false,
            passwordEmpty: false,
            usernameClass: 'login-input form-control form-control-good',
            passwordClass: 'login-input form-control form-control-good'
        }
    },

    template:/*html*/ `
    <div class="limiter">
        <div class="form-group container-login" >
            <div class="wrap-login">
                <span class="login-span">Logovanje korisnika</span>
                <input v-on:input="isUsernameEmpty" v-model="user.username" v-bind:class="usernameClass" placeholder="Korisničko ime">
                <span v-if="usernameEmpty" class="error-message">Niste uneli korisničko ime.</span>
                <div v-bind:style="styleObject"></div>
                <input v-on:input="isPasswordEmpty" v-model="user.lozinka" v-bind:class="passwordClass" placeholder="Lozinka">
                <span v-if="passwordEmpty" class="error-message">Niste uneli lozinku.</span>
                <hr style="width:100%">
                <span v-if="error!=null" class="error-message">{{error}}</span>
                <div v-bind:style="styleObject"></div>
                <button v-on:click="login" class="btn btn-primary login-btn">Login</button>
            </div>
        </div>
	</div>
    `
    ,
    methods: {
        login: function(user){
            this.isUsernameEmpty();
            this.isPasswordEmpty();
            if(this.passwordEmpty || this.usernameEmpty){
                return;
            }
            else{ 
            axios
                .post('/login', {"username": ''+this.user.username, "lozinka": ''+this.user.lozinka})
                .then(response => {
                    this.error = null;
                    window.localStorage.setItem('user', response.data);
                })
                .catch(error => {
                    this.error = error.response.data['message'];
                })

        }},
        isUsernameEmpty: function(){
            if(this.user.username == '' || this.user.username == null){
                this.usernameEmpty = true;
                this.usernameClass = 'login-input form-control form-control-error';
            }
            else{ 
            this.usernameEmpty = false;
            this.usernameClass = 'login-input form-control form-control-good';
            }
        },
        isPasswordEmpty: function(){
            if(this.user.lozinka == '' || this.user.lozinka == null){
                this.passwordEmpty = true;
                this.passwordClass = 'login-input form-control form-control-error';
            }
            else{
                this.passwordEmpty = false;
                this.passwordClass = 'login-input form-control form-control-good';
            }
        }
    }
});