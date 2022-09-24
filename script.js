let books = [
    {
        id: "1",
        title: `Apple. Эволюция компьютера`,
        author: `Владимир Невзоров`,
        img: `https://bukva.ua/img/products/449/449532_200.jpg`,
        plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
        и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
        персональных компьютеров в целом.
        В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
        сопровождающиеся большим количеством оригинальных студийных фотографий.
        Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
        Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
      },
      {
        id: "2",
        title: `Как объяснить ребенку информатику`,
        author: `Кэрол Вордерман`,
        img: `https://bukva.ua/img/products/480/480030_200.jpg`,
        plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
        в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
        оставаясь в безопасности. 
        Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
        от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
        обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
        объясняются наглядно с помощью иллюстраций и схем.`,
      },
      {
        id: "3",
        title: `Путь скрам-мастера. #ScrumMasterWay`,
        author: `Зузана Шохова`,
        img: `https://bukva.ua/img/products/480/480090_200.jpg`,
        plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
        Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
        знаниями будете в течение всей карьеры.
        Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
        как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
        какими инструментами ему нужно пользоваться.`,
      },
    
    
]




const rootEl = document.querySelector("#root");

const leftEl = document.createElement("div");
leftEl.classList.add("left");
const rightEl = document.createElement("div");
rightEl.classList.add("right");

rootEl.append(leftEl, rightEl);

const titleEl = document.createElement("h1");
titleEl.textContent = "Our main title";
titleEl.classList.add("list");

const listEl = document.createElement("ul");
listEl.classList.add("list");

const addBtnEl = document.createElement("button");
addBtnEl.setAttribute("type", "button");
addBtnEl.classList.add("btn");
addBtnEl.textContent = "Add";
leftEl.append(titleEl, listEl, addBtnEl);

addBtnEl.addEventListener('click', addBook)


function renderList() {
  const res = books
    .map((book) => {
      return `<li data-id="${book.id}" class="list-item"><p class= "text">${book.title}</p><button class = "edit">Edit</button><button class = "delete">Delete</button></li>`;
    })
    .join("");

listEl.innerHTML = '';

  listEl.insertAdjacentHTML("afterbegin", res);

const textLink = document.querySelectorAll('.text')

textLink.forEach(element => {
    element.addEventListener('click', renderPreview)
});

const deleteBtn = document.querySelectorAll('.delete')

deleteBtn.forEach(elem => {
    elem.addEventListener('click', deleteBook)
})
}

renderList();

function renderPreview(event) {

  const id = event.target.parentNode.dataset.id;
  const book = books.find((item) => item.id === id);
  const markup = createPreviewMarkup(book);
  rightEl.innerHTML = ''
  rightEl.insertAdjacentHTML("afterbegin", markup);
  
  
}

function createPreviewMarkup(book) {
    return `<div class="preview" data-id="${book.id}"><h2 class = 'book-title'>${book.title}</h2><p class = "author">${book.author}</p><img class = "picture" src =${book.img}></img><p>${book.plot}</p></div>`;
  }
  function createFormMarkup(book) {
    return `<form class = "form"><label class = "label "> Title <input class="input" name = "title" value= 
    ${book.title}></label><label class = "label "> Author <input class="input" name = "author" value = ${book.author}></label><label class = "label "> Image <input class="input" name = "img" value = ${book.img}></label><label > Plot <input class="input" name = "plot" value = ${book.plot}></label><button class = "btn save">Save</button></form>`;
  }
  function addBook() {
        const newBook = {
      id: `Date.now()`,
      title: "",
      author: "",
      img: "",
      plot: "",
    };
    rightEl.innerHTML = "";
    const result = createFormMarkup(newBook);
    rightEl.insertAdjacentHTML("afterbegin", result);
    fillObj(newBook);
    const btnEl = document.querySelector('.save');
const formEl = document.querySelector('form')
formEl.addEventListener('submit', (event)=> {
event.preventDefault()
})


btnEl.addEventListener('click', clickHandler)
function clickHandler (){
    if(newBook.title === '' || newBook.author === '' || newBook.img === '' || newBook.plot === ''){
    console.log(newBook);
        return}
    books.push(newBook)
    console.log(books);
    renderList()
    const markup = createPreviewMarkup(newBook);
  rightEl.innerHTML = ''
  rightEl.insertAdjacentHTML("afterbegin", markup);


}

  }

  function fillObj(book){
const inputEl = document.querySelectorAll('.input')
inputEl.forEach(elem => {
    elem.addEventListener('change', changeHandler)
})
function changeHandler(event){
book[event.target.name] = event.target.value
}

  }
  
  

  function deleteBook(event) {
    const id = event.target.parentNode.dataset.id;

    books = books.filter((book) => book.id !== id);

const bookDesc = document.querySelector('.preview')

if(bookDesc !== null && id === bookDesc.dataset.id){
    bookDesc.innerHTML = ''
}


renderList();

  }




//   function aditBook() {
//     const id = "1";
//     const book = books.find((item) => item.id === id);
//     rightEl.innerHTML = "";
//     const result = createFormMarkup(book);
//     rightEl.insertAdjacentHTML("afterbegin", result);
//   }
  

