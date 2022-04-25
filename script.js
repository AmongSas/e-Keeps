
let tdlist;
const container_todo = document.querySelector('.container_todo');


let data = [{
  "title": "Добро",
  "completed": false
},
{
  "title": "Пожаловать",
  "completed": true
}
]
console.log(data);


function read_localstorage() {
  let key;
  let loutput;
  if ((localStorage[0] == null)){  
    localStorage.setItem(0,JSON.stringify(data));
    data = JSON.parse(localStorage.getItem(0));}
}
read_localstorage();

function drawList() {
  let key;
  data = JSON.parse(localStorage.getItem(0));
  container_todo.innerHTML='';
  for (key in data){
    console.log(data.length + '- длина хранилища')
    container_todo.innerHTML +=`
    <div class="container_todo_element" id="${key}">
        <div class="container_todo_element_checkbox_completed ${data[key].completed}"> &nbsp </div>
        <div class="container_todo_element_box">
          <div class="container_todo_element_box_text" id="${key}" title="Нажмите, чтобы редактировать"> ${data[key].title}
          </div>
            <div class="container_todo_element_box_delete" title="Нажмите, чтобы редактировать">
              <img src="img/87477a479a564a909d11f656cf5a8f6d.svg" class="container_todo_element_box_delete_img" id="${key}">
            </div>
        </div>
    </div>`
  };
};
drawList();
//модалка для добавления
const container_add = document.querySelector('.container_add'); //кнопка в основном списке
const container_add_modal = document.querySelector('.container_add_modal');//модальное окно
const container_add_modal_box_buttons_cancel = document.querySelector('.container_add_modal_box_buttons_cancel'); //кнопка отменить в модалке
const container_add_modal_box_buttons_confirm = document.querySelector('.container_add_modal_box_buttons_confirm');//кнопка подтвердить в модалке
const container_add_modal_box_input = document.querySelector('.container_add_modal_box_input');//строка ввода в модалке

function open_container_add_modal() {
  container_add_modal.classList.add('opened');
};

function сlose_container_add_modal() {
  container_add_modal.classList.remove('opened');
  container_add_modal_box_input.value = ''
};

function close_container_add_modal_fromWindow(event) {
  if (event.target == container_add_modal ) {
    сlose_container_add_modal();
  };
};

function insert_to_list() {
  data = JSON.parse(localStorage.getItem(0));
  input_data = container_add_modal_box_input.value;
  console.log(input_data);
  data.push({"title":input_data, "completed":false });
  console.log(data);
  localStorage.setItem(0,JSON.stringify(data));
  window.setTimeout(сlose_container_add_modal);
  setTimeout(drawList,50);
  // return data;
  
};

container_add.addEventListener('click',open_container_add_modal);
container_add_modal_box_buttons_cancel.addEventListener('click',сlose_container_add_modal);
container_add_modal_box_buttons_confirm.addEventListener('click',insert_to_list);
window.addEventListener("click",close_container_add_modal_fromWindow);

// ----------------------------------------------------РЕДАКТИРОВАНИЕ ПУНКТОВ СПИСКА-------------------------------------------------

const container_change_modal = document.querySelector('.container_change_element');
function change_list_elem(){  
  console.log(event.target.classList)
  if((event.target.classList == 'container_todo_element_box_delete_img') || (event.target.classList =='container_todo_element_box_text')|| (event.target.classList =='container_todo_element')){ 
  let list_element_index = event.target.id;
  let title_info = data[list_element_index].title;
  console.log(list_element_index);
  container_change_modal.innerHTML=`
      <div class="container_change_element_modal">
            <div class="container_change_element_modal_box">
                <input class="container_change_element_modal_box_input" type="text" placeholder="Введите текст">
                <div class="container_change_element_modal_box_checkbox">Выполнено:<div class="container_change_element_modal_box_checkbox_completed ${data[list_element_index].completed}"></div></div>
                <div class="container_change_element_modal_box_buttons">
                    <div class="container_change_element_modal_box_buttons_cancel"><p class="container_add_modal_box_buttons_cancel_text">Отмена</p></div>
                    <div class="container_change_element_modal_box_buttons_remove"><p class="container_add_modal_box_buttons_confirm_text">Удалить🗑️</p></div>
                    <div class="container_change_element_modal_box_buttons_confirm"><p class="container_add_modal_box_buttons_confirm_text">Сохранить</p></div>
                </div>
            </div>
        </div>`;
  const input_info = document.querySelector('.container_change_element_modal_box_input');
  input_info.value = title_info;
  const container_change_element_modal_box_buttons_cancel = document.querySelector('.container_change_element_modal_box_buttons_cancel');
  const container_change_element_modal_box_buttons_confirm = document.querySelector('.container_change_element_modal_box_buttons_confirm');
  const container_change_element_modal_box_buttons_remove = document.querySelector('.container_change_element_modal_box_buttons_remove');
  const container_change_element_modal_box_checkbox_completed = document.querySelector('.container_change_element_modal_box_checkbox_completed');
  const container_window = document.querySelector('.container_change_element_modal');

  function save_close_change_list_element() {
    data = JSON.parse(localStorage.getItem(0));
    data[list_element_index].title = input_info.value;
    container_change_modal.innerHTML=``;
    data[list_element_index].completed = container_change_element_modal_box_checkbox_completed.classList[1];
    localStorage.setItem(0,JSON.stringify(data));
    drawList();
  };

  function forgot_close_change_list_element() {
    container_change_modal.innerHTML=``;
  }

  function delete_close_change_list_element() {
    data = JSON.parse(localStorage.getItem(0));
    data.splice(list_element_index,1)
    container_change_modal.innerHTML=``;
    localStorage.setItem(0,JSON.stringify(data));
    drawList();
  }

  function change_list_element_complete() {
    container_change_element_modal_box_checkbox_completed.classList.toggle('true');
    container_change_element_modal_box_checkbox_completed.classList.toggle('false');
  };

  container_change_element_modal_box_checkbox_completed.addEventListener('click',change_list_element_complete);
  container_change_element_modal_box_buttons_confirm.addEventListener('click',save_close_change_list_element);
  container_change_element_modal_box_buttons_cancel.addEventListener('click',forgot_close_change_list_element);
  container_change_element_modal_box_buttons_remove.addEventListener('click',delete_close_change_list_element);

  function close_container_add_modal_fromWindow2(event) {
    if (event.target == container_window)  {
      forgot_close_change_list_element();
    }
  };
  window.addEventListener("click",close_container_add_modal_fromWindow2);
} else if (event.target.classList == "container_todo_element_checkbox_completed false"){
  console.log(event.target.parentElement.id);
  console.log(event.target.classList[1]);
  list_element_index = event.target.parentElement.id;
  data = JSON.parse(localStorage.getItem(0));
  event.target.classList = "container_todo_element_checkbox_completed true"
  console.log(event.target.classList[1]);
  data[list_element_index].completed = event.target.classList[1];
  localStorage.setItem(0,JSON.stringify(data));
} else if (event.target.classList == "container_todo_element_checkbox_completed true"){
  console.log(event.target.parentElement.id);
  console.log(event.target.classList[1]);
  list_element_index = event.target.parentElement.id;
  data = JSON.parse(localStorage.getItem(0));
  event.target.classList = "container_todo_element_checkbox_completed false"
  console.log(event.target.classList[1]);
  data[list_element_index].completed = event.target.classList[1];
  localStorage.setItem(0,JSON.stringify(data));
}
}


function swap_complete () {
      data = JSON.parse(localStorage.getItem(0));
      console.log(event.target);
      event.target.classList[1].toggle(true);
      event.target.classList[1].toggle(false);
      data[list_element_index].completed = event.target.classList[1];
      localStorage.setItem(0,JSON.stringify(data));
      console.log(data);  
}
document.querySelectorAll('container_todo_element_checkbox_completed').forEach(element => {
  element.addEventListener("click",swap_complete);
});
container_todo.addEventListener("click", change_list_elem);



//Поиск-------------------------------

const container_search_button = document.querySelector('.container_search_button');
const container_search_input = document.querySelector('.container_search_input');
console.log(container_search_input.value);

function search_f() {
  for (var i = 0; i < data.length; i++) {
      console.log(data[i].title);
      elem = document.getElementById(i)
      elem.classList = ('container_todo_element')
  }

    val = container_search_input.value;
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].title);
      if (data[i].title.search(val) == '-1') {
          elem = document.getElementById(i)
          elem.classList.add('hide')
      }
  }
}
container_search_button.addEventListener('click', search_f);


// kebab action menu

