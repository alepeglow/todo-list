const form = document.querySelector('#todo-form')
const taskTitleInput = document.querySelector('#task-title-input')
const button = document.querySelector('#add-task-button')

const todoListUl = document.querySelector('#todo-list')

let tasks = []

function renderTaskOnHTML(taskTitle, done = false) {
    // add nova tarefa no Html
    const li = document.createElement('li')// criando a tag li

    const checkB = document.createElement('input');
    checkB.setAttribute('type', 'checkbox')

    checkB.addEventListener('change', (event) => {
        const liToToggle = event.target.parentElement;

        //selecionando a span
        const spanToTogle = liToToggle.querySelector('span')

        const done = event.target.checked;
        if (done) {
            spanToTogle.style.textDecoration = 'line-through'
        } else {
            spanToTogle.style.textDecoration = 'none'
        }

        // percorrendo cada tarefa para alertar os status
        tasks = tasks.map(t => {
            if (t.title === spanToTogle.textContent) {
                return {
                    title: t.title,
                    done: !t.done,
                }
            }
            return t;
        })
        // adicionando no LocalStorage
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })

    checkB.checked = done

    const spanTask = document.createElement('span');
    spanTask.textContent = taskTitle


    if (done) {
        spanTask.style.textDecoration = 'line-through'
    }

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover'
    // adicionando o evento de remover no botao
    btnRemover.addEventListener('click', (event) => {
        const liToRemove = event.target.parentElement;
        const titleToRemove = liToRemove.querySelector('span').textContent;

        // tirando a tarefa do Array Tasks
        tasks = tasks.filter(t => t.title !== titleToRemove)

        todoListUl.removeChild(liToRemove)
        // adicionando no LocalStorage
        localStorage.setItem('tasks', JSON.stringify(tasks))
        alert('Tarefa removida com sucesso')

    })


    li.appendChild(checkB);
    li.appendChild(spanTask);
    li.appendChild(btnRemover)

    todoListUl.appendChild(li)

}


// buscando as tarefas no localStorage
window.onload = () => {
    const tasksOnLocalStorage = localStorage.getItem('tasks')
    if (!tasksOnLocalStorage) return

    tasks = JSON.parse(tasksOnLocalStorage);

    // percorre o array de objetos e inserindo no HTML
    tasks.forEach(t => {
        renderTaskOnHTML(t.title, t.done)
    });
}

form.addEventListener('submit', (evento) => {

    evento.preventDefault(); //evita a atualizacao da pagina ao submeter o formulario

    const taskTitle = taskTitleInput.value


    if (taskTitle.length < 3) {
        alert('Sua tarefa precisa ter, pelo menos, 3 caracteres.')
        return;
    }


    // add tarefa no array
    tasks.push(
        {
            title: taskTitle,
            done: false,
        }
    )

    // adcionando no LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks))

    renderTaskOnHTML(taskTitle)


    taskTitleInput.value = '' // limpando o input

    alert('Tarefa adicionada com sucesso')
})