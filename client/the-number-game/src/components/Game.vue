<template>
    <section class="hero is-light is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title" v-if="b != null">
                    {{ "Your number has "+ b +"b and "+ c +"c" }}
                </h1>
                <h1 class="title" v-else>
                    Enter a 4 digit number
                </h1>
                <h2 class="subtitle">
                    <div class="columns">
                        <div class="column"></div>
                        <div class="column"><input v-model="guess" class="input is-large is-rounded is-hover" type="text" placeholder="Enter Number Here"></div>
                        <div class="column"></div>
                    </div>
                    <div class="columns">
                        <div class="column"></div>
                        <div class="column"><a class="button is-large is-success is-rounded is-outlined is-hovered" @click="guessNumber">Click Here</a></div>
                        <div class="column"></div>
                    </div>                    
                </h2>

            </div>
        </div>
    </section>
</template>

<script>
export default {
    name:'game',
    data(){
        return {
            b : null,
            c : null,
            guess : null,
            history : []
        }
    },
    methods : {
        guessNumber(){
            var num = parseInt(this.guess,10)
            var userID = sessionStorage.userID
            axios.post('http://localhost:3000/validate',{
                userID : userID,
                guessNum : num
            })
            .then((response) => {
                if(response.data.error != null){
                    console.log(response.data.error)
                    return
                }
                console.log("Recieved data")
                this.b = response.data.b
                this.c = response.data.c
                if(this.b == 4){
                    sessionStorage.session = false
                    sessionStorage.userID = null
                    sessionStorage.username = null
                    alert("Your number is " + num)
                    window.location = '/'
                }
            })
            .catch((err) => {
                    console.log(err.message);    
/*                     this.errorFlag = true;
                    this.error = err.message */
            })
        }
    },
    beforeCreate() {
        if(sessionStorage.session == null || sessionStorage.session == 'false'){
            window.location = "/"
        }
    },
}
</script>

<style>

</style>
