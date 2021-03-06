'use strict';

var itemsList = document.querySelectorAll('.section__list');
var sections = document.querySelectorAll('.section');

// Подгрузка карточек
sections.forEach(function (item) {
  var itemsList = item.querySelector('.section__list');
  var items = item.querySelectorAll('.section__item');
  var controlButton = item.querySelector('.controls__link');
  var controlButtonTitle = item.querySelector('.controls__title');
  var controlFromTitle = item.querySelector('.controls__from');
  var controlToTitle = item.querySelector('.controls__to');
  var controlHideButton = item.querySelector('.controls__hide');
  var controlIcon = item.querySelector('.controls__icon');
  var startCounter = 1;
  var toggler = true;
  var sectionTitle = item.querySelector('.section__title');

  // Показывает начальное колличество слайдов
  if (controlFromTitle) {
    controlFromTitle.textContent = startCounter + 1;
  }

  // Показывает колличество слайдов всего
  if (controlToTitle) {
    controlToTitle.textContent = items.length;
  }

  // Скрывает карточки по условию
  var hideItems = function (counter) {

    items.forEach(function (item, i) {
      if (i > counter) {
        item.style.display = 'none';
      }
    });

  };

  hideItems(startCounter);

  // Показывает карточки по условию
  var showItems = function (counter) {

    items.forEach(function (item, i) {
      if (i <= counter) {
        item.style.display = 'block';
      }
    });

  };

  // Обработчик нажатия на кнопку показать еще
  var onControlButtonClick = function (evt) {

    evt.preventDefault();

    if (toggler) {
      startCounter += 2;

      controlIcon.classList.add('controls__icon--animate');

      setTimeout(function () {
        showItems(startCounter);
        controlIcon.classList.remove('controls__icon--animate');

        if (items.length > startCounter) {
          controlFromTitle.textContent = startCounter + 1;
        } else {
          controlFromTitle.textContent = items.length;
        }

        if (items.length <= startCounter + 1) {
          controlButtonTitle.textContent = 'Скрыть';
          toggler = false;
        }

      }, 1000);

    } else {
      controlButtonTitle.textContent = 'Посмотреть ещё';
      hideItems(1);
      toggler = true;
      window.location.href = '#' + item.id
    }

  };

  if (controlButton) {
    controlButton.addEventListener('click', onControlButtonClick);
  }
});

// Ввод в поле формы
var formInput = document.querySelector('.form__input');

// Обработчик фокуса на поле ввода
formInput.addEventListener('focusin', function () {
  formInput.setAttribute('placeholder', 'Введите email');
});

// Обработчик выхода из фокуса поля ввода
formInput.addEventListener('focusout', function () {
  formInput.setAttribute('placeholder', 'Подпишитесь на рассылку новостей');
});

// Скролинг страницы
var leading = document.querySelector('.navigation__link--leading');
var organizations = document.querySelector('.navigation__link--organizations');
var institutes = document.querySelector('.navigation__link--institutes');
var leadingId = document.querySelector('#leading');
var organizationsId = document.querySelector('#organizations');
var institutesId = document.querySelector('#institutes');
var footerId = document.querySelector('#footer');

var navigationButtons = document.querySelectorAll('.navigation__link');

var clearActiveState = function () {
  leading.classList.remove('navigation__link--active');
  organizations.classList.remove('navigation__link--active');
  institutes.classList.remove('navigation__link--active');
};

var showActiveState = function () {
  leading.classList.add('navigation__link--active');
  organizations.classList.add('navigation__link--active');
  institutes.classList.add('navigation__link--active');
};

leading.addEventListener('click', function (evt) {
  evt.preventDefault();
  leadingId.scrollIntoView({
    block: "end",
    behavior: "smooth"
  });
});

organizations.addEventListener('click', function (evt) {
  evt.preventDefault();
  organizationsId.scrollIntoView({
    block: "end",
    behavior: "smooth"
  });
});

institutes.addEventListener('click', function (evt) {
  evt.preventDefault();
  institutesId.scrollIntoView({
    block: "end",
    behavior: "smooth"
  });
});

var sectionVisible = function (target) {
  // Все позиции элемента
  var targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      left: window.pageXOffset + target.getBoundingClientRect().left,
      right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    },

    // Получаем позиции окна
    windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

  if (targetPosition.bottom > windowPosition.top &&
    targetPosition.top < windowPosition.bottom &&
    targetPosition.right > windowPosition.left &&
    targetPosition.left < windowPosition.right) {

    switch (target.id) {
      case 'leading':
        clearActiveState();
        leading.classList.toggle('navigation__link--active');
        break;
      case 'organizations':
        clearActiveState();
        organizations.classList.toggle('navigation__link--active');
        break;
      case 'institutes':
        clearActiveState();
        institutes.classList.toggle('navigation__link--active');
        break;
      case 'footer':
        clearActiveState();
        document.querySelector('.promo').style.position = 'unset';
        document.querySelector('.logo__icon').style.position = 'unset';
        break;
      default:
        break;
    }

  } else {
    document.querySelector('.promo').style.position = 'fixed';
    document.querySelector('.logo__icon').style.position = 'fixed';
  }
};

var desktopWidth = 1440;
var tabletWidth = 768;
var mobileWidth = 320;

// Подключение фиксированной позиции
if (innerWidth >= desktopWidth) {
  // Обработчик события при прокрутке страницы
  window.addEventListener('scroll', function () {
    sectionVisible(leadingId);
    sectionVisible(organizationsId);
    sectionVisible(institutesId);
    sectionVisible(footerId);
  });
  sectionVisible(leadingId);
  sectionVisible(organizationsId);
  sectionVisible(institutesId);
  sectionVisible(footerId);
}

var sectionDescription = document.querySelector('.section__description');
var sectionsInfo = document.querySelectorAll('.section__info');
var controlArrow = document.querySelector('.controls__arrow');
var controlArrowTitle = document.querySelector('.controls__arrow .controls__title');
var controlArrowIcon = document.querySelector('.controls__arrow .controls__icon');

if (window.innerWidth < tabletWidth && sectionDescription.clientHeight > 216) {
  sectionsInfo.forEach(function (item) {
    item.style.display = 'none';
  });
  sectionDescription.classList.add('section__description--hidden');
}

var isActive = true;

controlArrow.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (isActive) {
    sectionsInfo.forEach(function (item) {
      item.style.display = 'flex';
    });
    sectionDescription.classList.remove('section__description--hidden');
    controlArrowIcon.style.transform = 'rotate(180deg)';
    controlArrowTitle.textContent = 'Скрыть';
    isActive = false;
  } else {
    sectionsInfo.forEach(function (item) {
      item.style.display = 'none';
    });
    sectionDescription.classList.add('section__description--hidden');
    controlArrowIcon.style.transform = 'rotate(0)';
    controlArrowTitle.textContent = 'Читать дальше';
    isActive = true;
  }
});


var deviceWidth = window.innerWidth;
// var htmlItem = document.querySelector('html');

// Get desktop root size
var getDesktopRootSize = function () {
  var rootSize = deviceWidth / desktopWidth;
  return rootSize;
};

// Get desktop root size
var getTabletRootSize = function () {
  var rootSize = deviceWidth / tabletWidth;
  return rootSize;
};

// Get mobile root size
var getMobileRootSize = function () {
  var rootSize = deviceWidth / mobileWidth;
  return rootSize;
};

// Set root size
var setRootSize = function (rootFontSize) {
  htmlItem.style.fontSize = rootFontSize + 'px';
}

// Start state for document on loading
var onDOMLoading = function () {
  checkDeviceWidth();
};

// Slider destroying
var checkDeviceWidth = function () {
  if (deviceWidth >= 768 && deviceWidth < 1366) {
    setRootSize(getTabletRootSize());
  } else if (deviceWidth >= 1366) {
    setRootSize(getDesktopRootSize());
  } else {
    setRootSize(getMobileRootSize());
  }
};
