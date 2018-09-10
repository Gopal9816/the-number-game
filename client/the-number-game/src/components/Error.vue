<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">Error</p>
            <button class="delete" aria-label="close" @click="$emit('closeError')"></button>
            </header>
            <section class="modal-card-body">
            <slot>{{ message }}</slot>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name:"error",
    data(){
        return {
            message : "An error has occured"
        }
    }
}
</script>

<style>
   
</style>

