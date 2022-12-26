import { TodoFactory } from './factory/todo'

fetch(window.location.href + 'data.json')
  .then((response) => response.json())
  .then((data) => {
    const todo = new TodoFactory()
    todo.build(data)
    console.log('✔️ Data successfully loaded')
  })
  .catch((error) => console.error('Unable to load data.json:', error))
