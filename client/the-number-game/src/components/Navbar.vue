<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a class="navbar-item">The Number Game</a>

            <a role="button" :class="{'navbar-burger' : true, 'is-active' : isActive}" @click="isActive = !isActive" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div :class="{'navbar-menu' : true, 'is-active': isActive}">
            <div class="navbar-end">
                <a class="navbar-item" href="/">
                    Home
                </a>
                <a class="navbar-item" >
                    How To Play
                </a>
                <a class="navbar-item" href="/about">
                    About
                </a>
                <a class="navbar-item" v-show="isSession">
                    {{ username }}
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    data(){
        return {
            isActive : false,
            isSession : false,
            username : ''
        }
    },
    mounted() {
        if(sessionStorage.session == 'true'){
            this.isSession = true
            this.username = sessionStorage.username
        }
    },
}
</script>

<style>

</style>
