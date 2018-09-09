<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title"><slot name="title"></slot></p>
            <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
            <slot name="content"></slot>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name : 'result'
}
</script>

<style>

</style>
