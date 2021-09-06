import { createRouter, createWebHistory } from 'vue-router'
import MenuList from '../views/MenuList.vue'
const routes = [
  {
    path: '/',
    name: 'menu',
    component: MenuList
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
