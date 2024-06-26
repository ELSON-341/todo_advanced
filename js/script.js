'use strict'
// Seleção de elementos 
const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')
const editBtn = document.querySelector('#edit-btn')

const searchInput = document.querySelector('#search-input')
const eraseBtn = document.querySelector('#arase-btn')

const todoFilter = document.querySelector('#todo-filter')

let oldInputValue

// Funções 
const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTitle = document.createElement('h3')
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-todo')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    // Utilizando dados da Local storage
    if(done) {
        todo.classList.add('done')
    }

    if(save) {
        saveTodosStorage({text, done})
    }
    
    
    todoList.appendChild(todo)

    todoInput.value = ''
    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')
        console.log(todoTitle, oldInputValue, text);

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }

        updateTodoLocalStorage(oldInputValue, text)
    })
}

const getSearchTodo = (search) => {
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector('h3').innerText.toLowerCase()
        const normalizedSearch = search.toLowerCase()
        
        todo.style.display = 'flex'

        if(!todoTitle.includes(normalizedSearch)){
            todo.style.display = 'none'
        }
    })
}

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll('.todo')

    switch(filterValue) {
        case 'all':
            todos.forEach((todo) => todo.style.display = 'flex')
            break
        
        case 'done':
            todos.forEach((todo) => todo.classList.contains('done') ? todo.style.display = 'flex' : todo.style.display = 'none')
            break

        case 'todo':
            todos.forEach((todo) => !todo.classList.contains('done') ? todo.style.display = 'flex' : todo.style.display = 'none')
    }

}

// Eventos
todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputValue = todoInput.value
    if(inputValue) {
        saveTodo(inputValue)
    } else {
        alert('Por favor, digite algo...')
        return
    }
})

document.addEventListener('click', (e) => {
    const targetEl = e.target
    const parentEl = e.target.closest('div')
    let todoTitle

    if(parentEl && parentEl.querySelector('h3')) {
        todoTitle = parentEl.querySelector('h3').innerText
    }
    
    if(targetEl.classList.contains('finish-todo')){
        parentEl.classList.toggle('done')

        updateTodoStatusLocalstorage(todoTitle)
    }

    if(targetEl.classList.contains('remove-todo')) {
        parentEl.remove('todo')

        removeTodosLocalStorage(todoTitle)
        console.log(todoTitle);
    }

    if(targetEl.classList.contains('edit-todo')) {

        editInput.value = todoTitle
        oldInputValue = todoTitle
        console.log(oldInputValue);
        toggleForms()
    }
})


cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()
    
    toggleForms()
})

editBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const editInputValue = editInput.value
    console.log('tess');
    
    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms()
})

searchInput.addEventListener('keyup', (e) => {
    e.preventDefault()

    const search = e.target.value
    getSearchTodo(search)
}) 
eraseBtn.addEventListener('click', (e) => {
    e.preventDefault()

    searchInput.value = ''

    searchInput.dispatchEvent(new Event('keyup'))
})

todoFilter.addEventListener('change', (e) => {
    const filterValue = e.target.value
    
    console.log(filterValue);
    filterTodos(filterValue)
})

// local storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || []

    return todos
}

const loadTodos = () => {
    const todos = getTodosLocalStorage()

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0)
    })
}

const saveTodosStorage = (todo) => {
    const todos = getTodosLocalStorage()

    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodosLocalStorage = (textTodo) => {
    const todos = getTodosLocalStorage()

    const filteredTodos = todos.filter((todo) => todo.text !== textTodo)
    console.log(filteredTodos);

    localStorage.setItem('todos', JSON.stringify(filteredTodos))
}

const updateTodoStatusLocalstorage = (todoText) => {
    const todos = getTodosLocalStorage()

    todos.map((todo) => todo.text === todoText ? todo.done = !todo.done : null)
    localStorage.setItem('todos', JSON.stringify(todos))
}

const updateTodoLocalStorage = (todoOldText, todoNewtext) => {
    const todos = getTodosLocalStorage()

    todos.map((todo) => todo.text === todoOldText ? todo.text = todoNewtext : null)
    localStorage.setItem('todos', JSON.stringify(todos))
}

loadTodos()