const todosApp = {
  data () {
    return {
      todos: [],
      newTodo: {
        done: false
      }
    }
  },
  created () {
    this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : this.todos
  },
  updated () {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  },
  methods: {
    addTodo () {
      if (!this.newTodo.text) {
        alert('Escreva algo para adicionar um novo Todo.')
        return
      }

      this.todos.push(this.newTodo)
      localStorage.setItem('todos', JSON.stringify(this.todos))
      this.newTodo = { done: false }
    },
    clearAll () {
      this.todos = [],
      localStorage.removeItem('todos')
    }
  }
}

Vue.createApp(todosApp).mount('#app')
