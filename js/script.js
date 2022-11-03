document.addEventListener("DOMContentLoaded", () => {
  // Tabs

  // создаём переменные с которыми будем взаимодействовать

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    // если ф-я запуск без аргумента то в скрипт подставится 0
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent(0);

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer

  const deadline = "2022-11-24";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)), // рачитываем количество дней
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  // доавляем 0 к счетчику если число однозначное
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Модальное окно (в уч проекте через классс)

  const modalTrigger = document.querySelectorAll("[data-modal]"),
        modalClose = document.querySelector("[data-close]"),
        modal = document.querySelector(".modal");

  function showModal() {
    modal.style.display = "block";
    document.body.style.overflow = 'hidden'; // убираем скролл на странице
    clearInterval(modalTimerId); // не показываем модальное окно автоматом если есть уже клик юзера на вызов мод.окна
  }

  function hideModal() {
    modal.style.display = "none";
    document.body.style.overflow = '';
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", showModal);
  });

  modalClose.addEventListener("click", hideModal);

  // скрываем модальное окно при клике за пределами модального окна
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          hideModal();
      }
  });

  // скрываем модальное окно при нажатии escape гугли event code
  document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display === "block") {
            console.log('error');
            hideModal();
        }
  });

// вызов модального окна автоматом после загрузки сайта
  const modalTimerId = setTimeout(showModal, 5000);

  // вызов модального окна когда пользователь долистал страницу (почему-то не работает)
  
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        showModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}
window.addEventListener('scroll', showModalByScroll);

});
