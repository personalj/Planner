import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '../views/Create.vue'
import Tasks from '../views/Tasks.vue'
import Task from '../views/Task.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Create',
    component: Create
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/tasks/:id',
    name: 'Task',
    component: Task
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
