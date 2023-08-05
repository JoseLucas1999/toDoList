//seleção de elemento
const todoform = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo-input");
const todolist = document.querySelector("#todo-list");
const editform = document.querySelector("#edit-form");
const editinput = document.querySelector("#edit-input");
const canceledit = document.querySelector("#cancel-edit");
const msgAlert = document.querySelector("#demo");
let oldInputValue;

// FUNÇÕES 

//essa função criará a classe todo-list
const saveTodo = (text) => {
    //container
    const todo = document.createElement("div")
    todo.classList.add("todo")

    //title
    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text //texto que recebemos por parametro
    //abre o elemento dentro da div anteriormente criada
    todo.appendChild(todoTitle)

    //done
    const doneBttn = document.createElement("button")
    doneBttn.classList.add("finish-todo")
    doneBttn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBttn)

    //edit
    const editBttn = document.createElement("button")
    editBttn.classList.add("edit-todo")
    editBttn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBttn)

    //remove
    const deleteBttn = document.createElement("button")
    deleteBttn.classList.add("remove-todo")
    deleteBttn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBttn)

    //container que está no HTML
    todolist.appendChild(todo)

    //limpamos a caixa 
    todoinput.value = ""
    todoinput.focus()
}

//trocar as classes adicionar e editar tarefa
const toggleForm = () => {
    todoform.classList.toggle("hide") //toggle alterna a classe (se tiver remove)
    editform.classList.toggle("hide")
    todolist.classList.toggle("hide")
}
const updateTodo = (text) => {
    //seleciona todos elementos da classe todo
    const todos = document.querySelectorAll(".todo")
    
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")
        //se o h3 do todo for igual o do antigo, atualiza pelo novo
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        }
    })
}

//EVENTOS

//enviar tarefa
todoform.addEventListener("submit", (e) => {
    e.preventDefault() //impede que formulario seja enviado
    //pega o que está escrito no input
    const inputValue = todoinput.value

    //se houver algum valor chama essa função com o valor de parametro
    if(inputValue){
        saveTodo(inputValue)
    }else{
        msgAlert.innerText = 'digite uma tarefa'
        //ao clicar em qualquer lugar a mensagem some
        document.addEventListener("click", (e) => {msgAlert.innerText = ''})
    }
})


//editar tarefa
//adicionamos o evento de click em tudo e verificamos em qual foi
document.addEventListener("click", (e) => {
    //pega a classe do elemento clicado
    const targetElement = e.target
    //selecionamos a div mais proxima do elemento selecionado
    const parentElement = targetElement.closest("div")
    let todoTitle;

    //salvar o titulo da tarefa para usar depois
    //se bttn possui um elemento pai e se o elementopai possui h3
    if(parentElement && parentElement.querySelector("h3")){
        //salvamos o title do elemento pai
        todoTitle = parentElement.querySelector("h3").innerText;
    }

    if(targetElement.classList.contains("finish-todo")){
        //toggle troca a classe 
        parentElement.classList.toggle("done")
    }else if(targetElement.classList.contains("edit-todo")){
        //trocamos de adicionar para editar tarefa
        toggleForm()
        //inserimos o antigo title na caixa de input
        editinput.value = todoTitle
        oldInputValue = todoTitle //apenas objetos possuem valeu
        
    }else if(targetElement.classList.contains("remove-todo")){
        parentElement.remove()
    }
})

//botão de cancelar edição
canceledit.addEventListener("click", (e) =>{
    e.preventDefault() // para não enviar formulario
    toggleForm()
})

editform.addEventListener("submit",(e)=>{
    e.preventDefault()
    //pega o que foi digitado
    const editinputvalue = editinput.value
    if(editinputvalue){
        //atualizar a tarefa
        updateTodo(editinputvalue)
    }
        toggleForm()
})

//console.log(inputValue)