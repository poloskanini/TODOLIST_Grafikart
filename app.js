import { TodoList } from "./components/TodoList.js";
import { fetchJSON } from "./functions/api.js";
import { createElement } from "./functions/dom.js";

//* 2: Chargement des éléments dans notre TODOLIST
try {
  const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=10');

  //* 4: Je veux construire une nouvelle TODOLIST (depuis la classe TodoList.js)
  const list = new TodoList(todos)
  // J'ajoute ma TODOLIST à la section HTML #todolist
  list.appendTo(document.querySelector('#todolist'))
  
} catch(e) {
  const alertElement = createElement('div', {
    class: 'alert alert-danger m-2',
    role: 'alert'
  })
  alertElement.innerText = 'Impossible de charger les éléments'
  document.body.prepend(alertElement)
  console.error(e)
}
