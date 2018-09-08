<template>
    <h1> <slot>{{ message }}</slot> </h1>
</template>

<script>
export default {
    name:"message",
    data(){
        return {
            message : "Hello World"
        }
    }
}
</script>

<style>

</style>

