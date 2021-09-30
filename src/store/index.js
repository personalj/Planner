import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: (JSON.parse(localStorage.getItem('tasks')) || []).map(item => {
      if (new Date(item.date) < new Date()) {
        if (item.status !== 'complete') {
          item.status = 'expired'
        }
      }
      return item
    }),
    task: null
  },
  mutations: {
    setTask(state, task) {
      const status = new Date(task.date) > new Date() ? 'active' : 'expired'
      task.status = status
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    changeStatus(state, id) {
      state.tasks.map(item => {
        if (item.id === id) {
          if (item.status === 'complete') {
            const status = new Date(item.date) > new Date() ? 'active' : 'expired'
            item.status = status
          } else {
            item.status = 'complete'
          }
        }
      })
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, data) {
      const index = state.tasks.findIndex(item => item.id === data.id)
      const status = new Date(data.item.date) > new Date() ? 'active' : 'expired'
      data.item.status = status
      Object.assign(state.tasks[index], data.item)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    } 
  },
  actions: {
    createTask({commit}, formData) {
      commit('setTask', formData)
    },
    changeStatus({commit}, id) {
      commit('changeStatus', id)
    },
    updateTask({commit}, formData) {
      commit('updateTask', formData)
    },
  },
  getters: {
    tasks(state) {
      return state.tasks
    }
  },
  modules: {
  }
})
