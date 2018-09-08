<template>
    <div>
        <error v-show="errorFlag">
            {{ error }}
        </error>
        <section class="hero is-light is-fullheight">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="columns">
                        <div class="column"></div>
                        <div class="column"><input v-model="username" class="input is-large is-rounded is-hover" type="text" placeholder="Enter Username"></div>
                        <div class="column"></div>
                    </div>
                    <div class="columns">
                        <div class="column"></div>
                        <div class="column"><a class="button is-large is-success is-rounded is-outlined is-hovered" @click="register">Click Here</a></div>
                        <div class="column"></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import Error from './Error.vue'
export default {
    name:'home',
    components:{ Error },
    data(){
        return {
            username : '',
            error : '',
            errorFlag : false
        }
    },
    methods : {
        register(){
            console.log("Register ftn");          
            if(this.username == ''){
                this.errorFlag = true
                this.error = "Enter a username"
            }
            else{
                this.errorFlag = false
                this.error = ''
                sessionStorage.username = this.username
                alert('User registered: ' + sessionStorage.username)
                window.location = "/about"
            }
        }
    }
}
</script>

<style>

</style>
