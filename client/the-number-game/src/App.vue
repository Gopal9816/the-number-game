<template>
  <div id="app" class="container is-fluid has-background-light">
    <navbar></navbar>
    <router-view></router-view>
    <footer class="footer has-background-white  ">
      <div class="content has-text-centered">
          <p>
            Created with <i class="fa fa-heart"></i> Check out the code at <a href="#"> GitHub <i class="fab fa-github"></i></a>
          </p>
      </div>
    </footer>
  </div>
</template>

<script>


import Navbar from './components/Navbar.vue';
import Home from './components/Home.vue';


export default {
  name: 'app',
  components : { Navbar, Home },
  data () {
    return {
      
    }
  },
  /* created() {
      console.log("Ready")
      axios.get('http://localhost:3000/generate').then((response) => {
          this.number = response.data.number
      }).catch((err) => {
          console.log(err.message);    
      })
  }, */
}
</script>

<style>
  #app{
    margin-left: 0px;
    margin-right: 0px;
  }
  .footer{
    padding: 1.5rem 1.5rem 1.5rem;
  }
</style>
