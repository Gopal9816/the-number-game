<template>
    <div class="main-content columns is-fullheight">
        <aside class="menu column is-2 is-hidden-mobile is-fullheight">
            <p class="menu-label">
                History
            </p>
            <ul>
                <li class="columns has-text-centered">
                    <div class="column">
                        Number
                    </div>
                    <div class="column">
                        B
                    </div>
                    <div class="column">
                        C
                    </div>
                </li>
                <li v-for="item in history" class="columns has-text-centered">
                    <div class="column">
                        {{item.num}}
                    </div>
                    <div class="column has-text-success">
                        {{ item.b }}
                    </div>
                    <div class="column has-text-info">
                        {{ item.c }} 
                    </div>
                </li>
            </ul>

        </aside>
        <div class="container column is-10">
            <error v-if="errorFlag">
                    {{ error }}
            </error>
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
        </div>
        <result v-if="showResult" @close="closeModal">
            <div slot="title">
                {{ resultTitle }}
            </div>
            <div slot="content">
                {{ resultMsg }}
            </div>
        </result>
    </div>
</template>

<script>
import Error from './Error.vue'
import Result from './Result.vue'
export default {
    name:'game',
    components : { Error, Result },
    data(){
        return {
            b : null,
            c : null,
            guess : null,
            error : '',
            errorFlag : false,
            resultTitle : '',
            resultMsg : '',
            showResult : false,
            history : []
        }
    },
    methods : {
        guessNumber(){
            if(this.guess == null || this.guess == ''){
                this.errorFlag = true
                this.error = 'Enter a number'
                return
            }
            else if(this.guess.length != 4){
                this.errorFlag = true
                this.error = 'Enter a 4 digit number'
                return
            }
            else if((/([0-9]).*?\1/).test(this.guess)){
                this.errorFlag = true
                    this.error = 'Number cannot contain repeating digits'
                    return
            }
            var num = parseInt(this.guess,10)
            var userID = sessionStorage.userID
            axios.post('http://localhost:3000/validate',{
                userID : userID,
                guessNum : num
            })
            .then((response) => {
                if(response.data.error != null){
                    this.errorFlag = true
                    this.error = error.message
                    return
                }
                else{
                    this.errorFlag = false
                }
                console.log("Recieved data")
                this.b = response.data.b
                this.c = response.data.c
                this.history.push({
                    num : num,
                    b : this.b,
                    c : this.c
                })
                if(this.b == 4){
                    this.showResult = true
                    this.resultTitle = "Congratulations"
                    this.resultMsg = "Your number was "+num

                }
            })
            .catch((err) => {
                    console.log(err.message);    
/*                     this.errorFlag = true;
                    this.error = err.message */
            })
        },
        closeModal(){
            sessionStorage.session = false
            sessionStorage.userID = null
            sessionStorage.username = null
            this.showResult = false
            window.location = '/'
        }
    },
    beforeCreate() {
        if(sessionStorage.session == null || sessionStorage.session == 'false'){
            window.location = "/"
        }
    }
}
</script>

<style>

</style>
