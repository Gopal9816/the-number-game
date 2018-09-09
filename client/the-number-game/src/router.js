import Home from './components/Home.vue'
import About from './components/About.vue'
import Game from './components/Game.vue'
import Rules from './components/Rules.vue'
export default [
    { path:'/', component: Home },
    { path: '/about', component : About },
    { path: '/game', component: Game },
    { path: '/rules', component: Rules }

]