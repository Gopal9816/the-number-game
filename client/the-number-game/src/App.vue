<template>
  <div id="app" class="container is-fluid">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>

import Message from './components/Message.vue';
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

</style>
