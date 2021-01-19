Vue.component('rezervacija',{
    data: function(){
        return {
            
        }
    },
    template:/*html*/`
    <h1>REZERVACIJA</h1>
    `,
    mounted: function(){
        if(localStorage.getItem("user") == null){
            this.$router.push({name: "login"})
        }
        
    },
    
})