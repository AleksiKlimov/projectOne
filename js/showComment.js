let focusElem;
//навешиваю обработчик событий, отлавливаю кнопку паказать комментарии
window.addEventListener("click", function (event) {
  if (
    event.target.hasAttribute("data-comment") ||
    event.target.innerText == "показать комментарии" ||
    event.target.innerText == "show comments"
  ) {
    let parentElem = event.target.closest("div.list-group");
    let targetElem = parentElem.querySelector("small.comment");
    focusElem = parentElem.getAttribute("id");
    //вызываю функцию которая отрисует комментарии к конкретному посту
    mainComments(targetElem);
  }
});
//асинхронная функция которая запрашивает массив из 10 комментариев и отрисовывает их в пост
async function mainComments(targetElem) {
  const commentRequestURL = `https://jsonplaceholder.typicode.com/comments?postId=${focusElem}`;
  let response = await fetch(commentRequestURL);
  let comments = await response.json();
  comments.forEach(function (item) {
    const commHTML = `<div userid="${item.postId}" class="list w-75 border mb-1 border-primary"><small>comment num: ${item.id}</small>
        <small class=" rounded mb-1">email: ${item.email}</small>
        <small class=" mb-1">title: ${item.name}</small>
     <small>comment: ${item.body}</small>
     </a>
     <div class="button">
     <button
        data-hidden
        class="btn btn-danger"
        type="button"
     >
        <span class="visually" >close comment</span>
      </button>
     </div>
    </div>`;
    //выводим комментарии на страницу
    targetElem.insertAdjacentHTML("beforeend", commHTML);
  });
  comments = [];
}
//навешиваю обработчик событий на окно и меняю стили у элементов
//взависимости от события
window.addEventListener("click", function (event) {
  //получаю количество комментариев для паоследующего изменения стиля
  //у кнопки закрыть комментарий 78-79 строка кода
  let commLength = document.querySelectorAll("div.list");
  //меняю стили кнопок
  if (
    event.target.hasAttribute("data-comment") ||
    event.target.innerText == "показать комментарии" ||
    event.target.innerText == "show comments"
  ) {
    let element = event.target.closest("button.btn-outline-primary");
    let showComment = element.querySelector("span.visually");
    let closeComment = element.querySelector("span.visually-hidden");
    showComment.classList.add("visually-hidden");
    closeComment.classList.remove("visually-hidden");
    showComment.classList.remove("visually");
    closeComment.classList.add("visually");
  }
  if (
    event.target.hasAttribute("data-comment") ||
    event.target.innerText == "закрыть комментарии" ||
    event.target.innerText == "close comments"
  ) {
    let element = event.target.closest("button.btn-outline-primary");
    let showComment = element.querySelector("span.visually");
    let closeComment = element.querySelector("span.visually-hidden");
    showComment.classList.add("visually-hidden");
    closeComment.classList.remove("visually-hidden");
    closeComment.classList.add("visually");
    showComment.classList.remove("visually");
    let closeComm = event.target.closest("div.list-group");
    let blockComment = closeComm.querySelector("small.comment");
    blockComment.innerText = "";
  }
  //меняю стиль кнопки закрыть комментаррии если они были удалены,
  // а кнопка "закрыть комментарий" не отрабатывала
  if (
    event.target.innerText == ("закрыть комментарий" || "close comment") &&
    commLength.length == 1
  ) {
    console.log(event.target.innerText);
    let showComment = document.getElementById("visual");
    showComment.classList.remove("visually-hidden");
    showComment.classList.add("visually");
    let closeComment = document.getElementById("hidden");
    closeComment.classList.remove("visually");
    closeComment.classList.add("visually-hidden");
  }
  if (
    event.target.hasAttribute("data-hidden") ||
    event.target.innerText == "закрыть комментарий" ||
    event.target.innerText == "close comment"
  ) {
    let comment = event.target.closest("div.list");
    comment.outerHTML = "";
  }

  //навешиваю событие на окно и проверяю где произошло событие
  if (
    event.target.hasAttribute("data-delete") ||
    event.target.innerText == "delete" ||
    event.target.innerText == "Удалить"
  ) {
    const post = event.target.closest("div.list-group");
    post.outerHTML = "";
  }
});
