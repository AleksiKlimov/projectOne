//получаю в переменную элемент формы
let form = document.getElementById("form");
//навешиваю обработчик событий
form.addEventListener("submit", function (event) {
  console.log(event.target.closest(".modal"));
  event.preventDefault();
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;
  let userId = document.getElementById("userId").value;
  let infoForPost = {
    title,
    body,
    userId,
  };
  createPosts(infoForPost);
});

//объявляю асинхронную функцию для создания post запроса
async function createPosts(body = null) {
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => createNewPostOnPage(json));
}
//объявляю функцию отрисовки поста на странице
function createNewPostOnPage(json) {
  console.log(json);
  const postContainer = document.querySelector(".post");
  let arr = [];
  arr.push(json);
  arr.forEach((item) => {
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
    //выводим созданный пост на страницу на страницу
    postContainer.insertAdjacentHTML("beforeend", postsHTML);
  });
  arr = [];
}
