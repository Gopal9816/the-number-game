<template>
    <div class="notification is-danger has-text-centered">
        <slot>
            {{ message }}
        </slot>
    </div>
</template>

<script>
export default {
    name:"error",
    data(){
        return {
            message : "An error has oocured"
        }
    }
}
</script>

<style>
   
</style>

