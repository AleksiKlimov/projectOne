const postRequestURL = `https://jsonplaceholder.typicode.com/posts`;

//объявляем асинхронную функцию для получения массива постов
async function getPosts(method, url) {
  const response = await fetch(url);
  const postsArray = await response.json();
  //возвращаем массив постов
  return postsArray;
}

async function main() {
  // в константу posts получаем массив постов из функции getPosts
  let posts = await getPosts("GET", postRequestURL);
  //объявляем переменные для получения массива из 10 постов
  let currentPage = 1;
  let rows = 10;
  //объявляю функцию которая получает массив постов для вывода их на страницу
  function displayList(arrData, rowPage, page) {
    const postContainer = document.querySelector(".post");
    postContainer.innerHTML = "";
    page--;
    const start = rowPage * page;
    const end = start + rowPage;
    //обрезаем список постов до 10
    const paginatedData = arrData.slice(start, end);

    //итерируемся по массиву из  постов и отрисовываем страницу из постов
    paginatedData.forEach(function (item) {
      const postsHTML = `<div userid="${item.userId}"  id="${item.id}" 
      class="list-group w-75 mb-2  border border-primary">
      <div class="d-flex flex-column w-100 justify-content-between">
      <small>post num: ${item.id}</small>
        <h5 class=" rounded mb-1">title: ${item.title}</h5>
        <small class=" mb-1"></small>
        <small>post:  ${item.body}</small>
      </div>
      <small class="comment" ></small>
        <div class="button mb-3">
      <button 
        data-delete
        class="btn btn-danger"
        type="button"
      >
        delete
      </button>
      <button
        class="btn btn-outline-primary"
        type="button"
        data-comment
        >
            <span id="visual" class ="visually" >show comments</span>
            <span id="hidden" class="visually-hidden">close comments</span>
      </button>
      </div>
      </div>`;
      //выводим посты на страницу
      postContainer.insertAdjacentHTML("beforeend", postsHTML);
    });
    //навешиваем событие на документ для отлавливания ввода символов
    //в конкретный инпут и фильтрации постов на странице
    document.querySelector("#elastic").oninput = function () {
      let value = this.value;
      //поучаю элементы с текстом
      let postElem = document.querySelectorAll(".post div.list-group");
      if (value != "") {
        //прохожу по элементам на странице циклом
        for (let i = 0; i < postElem.length; i++) {
          const data = JSON.stringify(paginatedData[i]);
          if (data.search(value) == -1) {
            postElem[i].classList.add("visually-hidden");
          } else {
            postElem[i].classList.remove("visually-hidden");
          }
        }
      } else {
        for (let i = 0; i < postElem.length; i++) {
          postElem[i].classList.remove("visually-hidden");
        }
      }
    };
  }
  //объявляю функцию которая на страницу выводит кнопки пагинации
  function displayPagination(arrData, rowPage) {
    const pagination = document.querySelector(".pagination");
    const pagesCount = Math.ceil(arrData.length / rowPage);
    const liEl = document.createElement("li");
    liEl.classList.add("page-item", "d-flex");
    //циклом for проходим по списку из постов разделенных на 10
    for (let i = 0; i < pagesCount; i++) {
      //получаем в константу элемент <a>
      const aEl = displayPaginationButton(i + 1);
      aEl.setAttribute("info", i + 1);
      //помещаю элемент <a> в элемент <li>
      liEl.appendChild(aEl);
    }
    pagination.appendChild(liEl);
  }

  //объявляю функцию которая создает элемент и изменяет ему класс
  //в зависимости от того какая из кнопок активна
  function displayPaginationButton(page) {
    const aEl = document.createElement("a");
    aEl.classList.add("page-link");
    aEl.innerText = page;
    //проверяем какая страница выводится в браузер
    if (currentPage == page) {
      //добавляем кнопке класс active
      aEl.classList.add("active");
    }
    aEl.addEventListener("click", () => {
      currentPage = page;
      displayList(posts, rows, currentPage);
      let currentItemA = document.querySelector(" a.active");
      currentItemA.classList.remove("active");
      aEl.classList.add("active");
    });
    return aEl;
  }

  displayList(posts, rows, currentPage);
  displayPagination(posts, rows);
}
main();
