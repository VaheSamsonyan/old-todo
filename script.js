fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
  .then(response => response.json())
  .then(todos => runtodo(todos));

function runtodo(todos) {
  const main = document.getElementById('main');

  function Container() {
    const box = document.createElement('div');
    box.id = 'todo-container'; 

    function update() {
      box.innerHTML = '';
      box.appendChild(Add_Todo(function (newtodo) {
        if(newtodo) {todos.push({
          'title': newtodo,
          'completed': false
        });}
        update();
      }));
      box.appendChild(List(todos, () => {
        update();
      }));
      box.appendChild(Results(todos, UNcompleted_todos => {
        todos = UNcompleted_todos;
        update();
      }));
    }

    update();
    return box;
  }

  function List(todos, onChange) {
    const box = document.createElement('div');
    box.className = 'todo-list'; 
    todos.map(todo => {
      return create_Item(todo, val => {
        todo.completed = val;
        onChange();
      });
    }).forEach(item => {
      box.appendChild(item);
    });
    return box;
  }

  function Add_Todo(add) {
    const box = document.createElement('form');
    box.id = 'add-todo-form'; 

    let input = document.createElement('input');
    input.setAttribute('id', 'add-input');
    input.setAttribute('type', 'text');
    let button = document.createElement('button');
    button.innerHTML = 'Add';

    box.appendChild(input);
    box.appendChild(button);

    box.addEventListener('submit', evt => {
      evt.preventDefault();
      let value = input.value;
      add(value);
    });

    return box;
  }

  function create_Item(todo, onChange) {
    const box = document.createElement('div');
    box.className = 'todo-item'; 

    let content = document.createElement('label');
    let checkbox = document.createElement('input');

    checkbox.setAttribute('type', 'checkbox');
    content.innerHTML = todo.title;

    content.appendChild(checkbox);
    if (todo.completed) {
      checkbox.setAttribute('checked', true);
    }
    box.appendChild(content);

    checkbox.addEventListener('change', e => {
      onChange(e.target.checked);
    });

    return box;
  }

  function Results(todos, onChange) {
    const box = document.createElement('div');
    box.id = 'results-container'; 

    let stats = document.createElement('p');
    let UNcompleted_todos = todos.filter(todo => !todo['completed']);
    let completed_todos = todos.filter(todo => todo['completed']);
    let completed_count = completed_todos.length;

    stats.innerHTML = `Completed ${completed_count}/${todos.length}`;
    let button = document.createElement('button');
    button.innerHTML = 'Clear';
    button.addEventListener('click', () => {
      onChange(UNcompleted_todos);
    });
    box.append(stats, button);
    return box;
  }

  main.appendChild(Container());
}
