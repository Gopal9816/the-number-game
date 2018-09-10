<template>
    <div class="main-content columns is-desktop">
        <aside class="menu column is-2 is-hidden-touch is-fullheight">
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
        <div class="column is-hidden-desktop" v-if="history.length != 0">
            <h3 class="content">History</h3>
            <div class="scrolling-wrapper">
                <div class="my-card has-text-centered" v-for="item in history">
                    <div class="box">
                        <h2><strong>{{ item.num }}</strong></h2>
                        <h4>{{ item.b + " B" }}</h4>
                        <h4>{{ item.c + " C" }}</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-10 ">
            <error v-if="errorFlag" @closeError="closeErrorModal">
                    {{ error }}
            </error>
            <section class="hero is-success is-bold is-fullheight">
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
                                <div class="column"><input v-model="guess" class="input is-medium is-rounded is-hover" type="text" placeholder="Enter Number Here"></div>
                                <div class="column"></div>
                            </div>
                            <div class="columns">
                                <div class="column"></div>
                                <div class="column"><a class="button is-medium is-success is-rounded is-inverted is-outlined is-hovered" @click="guessNumber">Guess</a></div>
                                <div class="column"></div>
                            </div>  
                            <div class="columns">
                                <div class="column"></div>
                                <div class="column"><a class="button is-medium is-danger is-rounded is-hovered" @click="giveUp">Give Up</a></div>
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
            if(isNaN(num)){
                this.errorFlag = true
                this.error = 'All you had to do was enter a number'
                return
            }
            var userID = sessionStorage.userID
            axios.post('https://the-number-game-api.herokuapp.com/validate',{
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
        },
        closeErrorModal(){
            this.errorFlag = false
            this.error = null
        },
        giveUp(){
            console.log('In give up')
            var userID = sessionStorage.userID
            axios.post('https://the-number-game-api.herokuapp.com/getnum',{
                userID : userID
            })
            .then((response) => {
                this.showResult = true
                this.resultTitle = "Better luck next time"
                this.resultMsg = "Your number was "+response.data.number
            })
            .catch((err)=>{
                console.log("Error caught :"+err.message+'\n')
                console.log(err);
            })
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
    .main-content{
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 0px;
        margin-bottom: 0px !important;
    }
    .is-10{
        padding-top: 0px;
        padding-bottom: 0px;
    }
    .notification{
        margin-top:5px; 
        margin-bottom: 5px !important;
    }
    .scrolling-wrapper {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
    }
    .my-card {
            flex: 0 0 auto;
            padding-left:15px !important;
            padding-right:15px !important;
        }

    @media only screen and (max-width: 600px) {
        .main-content{
            padding-left: 0px;
            padding-right: 0px;
        }
        .is-10{
            padding-left: 0px;
            padding-right: 0px;
        }
        .hero{
            padding-left:10px;
            padding-right: 10px;
        }
    } 
</style>
