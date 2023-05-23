import { createElement } from "../functions/dom.js";

// Je documente à quoi ressemble une TODO grâce au système de @typedef
/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

//* 3: Mon Composant TODOLIST

export class TodoList {

  /** @type {Todo[]} */
  #todos = [];

  /** @type {HTMLUListElement[]} */
  #listElement = [];

  /** 
   * @param {Todo[]} todos
   * */

  constructor (todos) {
    this.#todos = todos // '#' pour "propriété privée", car on en a pas besoin depuis l'extérieur
  }

  /**
   * 
   * @param {HTMLElement} element 
   */

  //* 5: Méthode qui permet d'indiquer à quel élément on souhaite ajouter notre TODOLIST (ici, on veut l'ajouter à la div avec l'id "#todolist")

  appendTo (element) {
    element.innerHTML = `
      <form class="d-flex pb-4"> 
        <input required="" class="form-control" type="text" placeholder="J'ajoute une tâche..." name="title" data-com.bitwarden.browser.user-edited="yes">
        <button class="btn btn-primary">Ajouter</button>
      </form>
      <main>
        <div class="btn-group mb-4" role="group">
              <button type="button" class=" btn btn-outline-primary active" data-filter="all">Toutes</button>
              <button type="button" class=" btn btn-outline-primary" data-filter="todo">A faire</button>
              <button type="button" class=" btn btn-outline-primary" data-filter="done">Faites</button>
          </div>

          <ul class="list-group">
          </ul>
      </main>`
    
    this.#listElement = element.querySelector('.list-group')
    for (let todo of this.#todos) {
      const t = new TodoListItem(todo)
      this.#listElement.append(t.element)
    }
    element.querySelector('form').addEventListener('submit', e => this.#onSubmit(e))
    element.querySelectorAll('.btn-group button').forEach(button => {
    button.addEventListener('click', e => this.#toggleFilter(e)) 
    })
  }

  /**
   * 
   * @param {SubmitEvent} e 
   * @returns 
   */
  #onSubmit (e) {
    e.preventDefault()
    const form = e.currentTarget
    const title = new FormData(form).get('title').toString().trim()
    if (title === '') {
      return
    }
    const todo = {
      id: Date.now(),
      title,
      completed: false
    }
    const item = new TodoListItem(todo)
    this.#listElement.prepend(item.element)
    form.reset()
  }

  /**
   * @param {PointerEvent} e 
   */
  #toggleFilter (e) {
     e.preventDefault()
     const filter = e.currentTarget.getAttribute('data-filter')

     e.currentTarget.parentElement.querySelector('.active').classList.remove('active');
     e.currentTarget.classList.add('active');

     if (filter === 'done') {
      this.#listElement.classList.add('hide-todo')
      this.#listElement.classList.remove('hide-completed')
     } else if (filter === 'todo') {
       this.#listElement.classList.remove('hide-todo')
       this.#listElement.classList.add('hide-completed')
     } else {
      this.#listElement.classList.remove('hide-completed')
      this.#listElement.classList.remove('hide-todo')
     }
  }
}

//* 6: Classe qui va permettre de construire un item pour ma TODOLIST
class TodoListItem {

  #element

  /** 
   * @type {Todo}
   */
  constructor (todo) {

    const id = `todo-${todo.id}`;

    // La fonction createElement() est celle que j'ai créée dans functions/dom.js
    // Je crée un nouvel <li>
    const li = createElement('li', {
      class: 'todo list-group-item d-flex align-items-center'
    })

    this.#element = li

    // Je crée un nouvel <input> de type checkbox
    const checkbox = createElement('input',  {
      type: 'checkbox',
      class: 'form-check-input',
      id,
      checked: todo.completed ? '' : null
    })

    // Je crée un nouvel <input> de type checkbox
    const label = createElement('label', {
      class: 'ms-2 form-check-label',
      for: id
    })
    label.innerText = todo.title

    // Je crée un nouveau bouton "Trash"
    const button = createElement('button', {
      class:'ms-auto btn btn-danger btn-sm'
    })
    button.innerHTML = '<i class="fa-solid fa-trash"></i>'

    // J'ajoute les éléments HTML à la structure de mon <li>
    li.append(checkbox)
    li.append(label)
    li.append(button)
    this.toggle(checkbox)

    // Évènement pour retirer l'élement au click sur le trash
    button.addEventListener('click', e => this.remove(e))
    // Évènement sur la checkbox pour détecter un changement de valeur (et ainsi TRIER)
    checkbox.addEventListener('change', e => this.toggle(e.currentTarget)) 
  }

  /**
   * Méthode pour ajouter l'élement construit "TodoListItem"
   * @return {HTMLElement}  
   */
  get element () {
    return this.#element
  }

  /**
   * 
   * @param {PointerEvent} e 
   */
  remove (e) {
    e.preventDefault()
    this.#element.remove()
  }

  /**
   * Change l'état "à faire/fait" de la tâche
   * 
   * @param {HTMLInputElement} checkbox 
   */
  toggle (checkbox) {
    if (checkbox.checked) {
      this.#element.classList.add('is-completed')
    } else { 
      this.#element.classList.remove('is-completed')
    }
  }
}