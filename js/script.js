'use strict'
// Seleção de elementos 
const todoForm = document.querySelector('#todo-form')
const todoInpot = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cencelEditBtn = document.querySelector('#cancel-edit-btn')
console.log(cencelEditBtn);

// Funções 
const saveTodo = (text) => {
    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTitle = document.createElement('h3')
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-todo')
}
// Eventos
todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputValue = todoInpot.value
    if(inputValue) {
        saveTodo(inputValue)
    }
    

})
