<template>
    <nav class="navbar is-fixed-bottom is-transparent" role="navigation" aria-label="main navigation">
        <div class="navbar-menu is-active">
            <div class="navbar-start">
                <p class="navbar-item">
                    Made with &nbsp;<i class="fa fa-heart"></i> using Vue.js
                </p>
                <p class="navbar-item">
                    Check out the source code on GitHub &nbsp;<i class="fab fa-github"></i>
                </p>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name : 'footer-new'
}
</script>

<style>
    .navbar-start{
        margin-left: 450px;
    }
</style>
