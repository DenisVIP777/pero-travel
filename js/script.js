$('document').ready(function(){

});

"use strict"

//Прокрутка при клике

//Для начала я ищу все объекты с классом .menu__link, но с data-атрибутом data-goto
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
//Проверяю есть ли у нас что нибудь из этого
if (menuLinks.length > 0) {
	//Пробежимся по ним
	menuLinks.forEach(menuLink => {
		//И вешаем событие клик при котором вызываем функцию onMenuLinkClick
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		//Сдесь нам нужно получить объект на который мы кликаем
		const menuLink = e.target;
		//Далее важное условие
		//во первых проверяю заполнен ли этот дата атрибут, и проверяю существует ли объект на который ссылается данный дата-атрибут
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			//Далее получаю в константу этот объект
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			//Далее нам нужно высчитать положение этого объекта с учётом высоты шапки
			//с помощью getBoundingClientRect().top я получаю его местоположение на странице в пикселях, далее я прибавляю колличество прокрученных пикселей
			//и далее я убавляю высоту шапки
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;


			//Закрытие меню при клике на li
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			//Далее код который заставит скролл прокрутиться к нужному месту
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			//добавим e.preventDefault(); для того чтобы отключить работу ссылок
			e.preventDefault();
		}
	}
}

//Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu) {
	iconMenu.addEventListener("click", function(e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


/*videos script start*/
videoButtons = document.querySelectorAll('.videos__blackout');
videoButtons.forEach( (videoButton) => {
	videoButton.addEventListener('click', function() {
		videoItem = videoButton.nextElementSibling;
		videoItem.play();
		videoItem.controls = true;
		videoButton.classList.add('_hide');
	});
} );


/*Swiper*/
new Swiper('.popular-excursions__slider', {
	navigation: {
		prevEl: '.popular-excursions__button-prev',
		nextEl: '.popular-excursions__button-next',
	},

	scrollbar: {
		el: '.popular-excursions__scrollbar',
		//Прогрессбар
		draggable: true,
	},

	// Колличество слайдов для показа
	slidesPerView: 3,

	// Отступ между слайдами
	spaceBetween: 20,

	// Включить выключить бесконечный слайдер
	loop: false,

	// Свободный режим
	freeMode: true,

	// Брейкпоинты (адаптив) - mobile first
	breakpoints: {
		0: {
			slidesPerView: 1.1,
		},
		425: {
			slidesPerView: 1.333,
		},
		720: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
	},
});

/*Swiper reviews*/
new Swiper('.reviews__slider', {
	navigation: {
		prevEl: '.reviews__button-prev',
		nextEl: '.reviews__button-next',
	},

	scrollbar: {
		el: '.reviews__scrollbar',
		//Прогрессбар
		draggable: true,
	},

	// Колличество слайдов для показа
	slidesPerView: 1.5,

	// Отступ между слайдами
	spaceBetween: 20,

	// Включить выключить бесконечный слайдер
	loop: false,

	// Свободный режим
	freeMode: true,

	// Брейкпоинты (адаптив) - mobile first
	breakpoints: {
		320: {
			slidesPerView: 1.2,
		},
		390: {
			slidesPerView: 1.32,
		},
		429: {
			slidesPerView: 1.2,
		},
		767: {
			slidesPerView: 1.2,
		},
		1024: {
			slidesPerView: 1.5,
		},
	},
});

/*Swiper reviews*/
new Swiper('.route-description__slider', {
	navigation: {
		prevEl: '.route-description__button-prev',
		nextEl: '.route-description__button-next',
	},

	scrollbar: {
		el: '.route-description__scrollbar',
		//Прогрессбар
		draggable: true,
	},

	// Колличество слайдов для показа
	slidesPerView: 1.4620,

	// Отступ между слайдами
	spaceBetween: 18,

	// Включить выключить бесконечный слайдер
	loop: false,

	// Свободный режим
	freeMode: true,

	// Брейкпоинты (адаптив) - mobile first
	breakpoints: {
		300: {
			slidesPerView: 1.1,
		},
		425: {
			slidesPerView: 1.3355,
		},
		479: {
			slidesPerView: 1.4570,
		},
		991: {
			slidesPerView: 1.2,
		},
		1120: {
			slidesPerView: 1.4630,
		},
	},
});

/*Динамический адаптив*/
/**
 * @typedef {Object} dNode
 * @property {HTMLElement} parent
 * @property {HTMLElement} element
 * @property {HTMLElement} to
 * @property {string} breakpoint
 * @property {string} order
 * @property {number} index
 */

/**
 * @typedef {Object} dMediaQuery
 * @property {string} query
 * @property {number} breakpoint
 */

/**
 * @param {'min' | 'max'} type
 */
function useDynamicAdapt(type = 'max') {
    const className = '_dynamic_adapt_'
    const attrName = 'data-da'
  
    /** @type {dNode[]} */
    const dNodes = getDNodes()
  
    /** @type {dMediaQuery[]} */
    const dMediaQueries = getDMediaQueries(dNodes)
  
    dMediaQueries.forEach((dMediaQuery) => {
      const matchMedia = window.matchMedia(dMediaQuery.query)
      // массив объектов с подходящим брейкпоинтом
      const filteredDNodes = dNodes.filter(({ breakpoint }) => breakpoint === dMediaQuery.breakpoint)
      const mediaHandler = getMediaHandler(matchMedia, filteredDNodes)
      matchMedia.addEventListener('change', mediaHandler)
  
      mediaHandler()
    })
  
    function getDNodes() {
      const result = []
      const elements = [...document.querySelectorAll(`[${attrName}]`)]
  
      elements.forEach((element) => {
        const attr = element.getAttribute(attrName)
        const [toSelector, breakpoint, order] = attr.split(',').map((val) => val.trim())
  
        const to = document.querySelector(toSelector)
  
        if (to) {
          result.push({
            parent: element.parentElement,
            element,
            to,
            breakpoint: breakpoint ?? '767',
            order: order !== undefined ? (isNumber(order) ? Number(order) : order) : 'last',
            index: -1,
          })
        }
      })
  
      return sortDNodes(result)
    }
  
    /**
     * @param {dNode} items
     * @returns {dMediaQuery[]}
     */
    function getDMediaQueries(items) {
      const uniqItems = [...new Set(items.map(({ breakpoint }) => `(${type}-width: ${breakpoint}px),${breakpoint}`))]
  
      return uniqItems.map((item) => {
        const [query, breakpoint] = item.split(',')
  
        return { query, breakpoint }
      })
    }
  
    /**
     * @param {MediaQueryList} matchMedia
     * @param {dNodes} items
     */
    function getMediaHandler(matchMedia, items) {
      return function mediaHandler() {
        if (matchMedia.matches) {
          items.forEach((item) => {
            moveTo(item)
          })
  
          items.reverse()
        } else {
          items.forEach((item) => {
            if (item.element.classList.contains(className)) {
              moveBack(item)
            }
          })
  
          items.reverse()
        }
      }
    }
  
    /**
     * @param {dNode} dNode
     */
    function moveTo(dNode) {
      const { to, element, order } = dNode
      dNode.index = getIndexInParent(dNode.element, dNode.element.parentElement)
      element.classList.add(className)
  
      if (order === 'last' || order >= to.children.length) {
        to.append(element)
  
        return
      }
  
      if (order === 'first') {
        to.prepend(element)
  
        return
      }
  
      to.children[order].before(element)
    }
  
    /**
     * @param {dNode} dNode
     */
    function moveBack(dNode) {
      const { parent, element, index } = dNode
      element.classList.remove(className)
  
      if (index >= 0 && parent.children[index]) {
        parent.children[index].before(element)
      } else {
        parent.append(element)
      }
    }
  
    /**
     * @param {HTMLElement} element
     * @param {HTMLElement} parent
     */
    function getIndexInParent(element, parent) {
      return [...parent.children].indexOf(element)
    }
  
    /**
     * Функция сортировки массива по breakpoint и order
     * по возрастанию для type = min
     * по убыванию для type = max
     *
     * @param {dNode[]} items
     */
    function sortDNodes(items) {
      const isMin = type === 'min' ? 1 : 0
  
      return [...items].sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.order === b.order) {
            return 0
          }
  
          if (a.order === 'first' || b.order === 'last') {
            return -1 * isMin
          }
  
          if (a.order === 'last' || b.order === 'first') {
            return 1 * isMin
          }
  
          return 0
        }
  
        return (a.breakpoint - b.breakpoint) * isMin
      })
    }
  
    function isNumber(value) {
      return !isNaN(value)
    }
  }
  
useDynamicAdapt();


/*Tabs*/
const tabsTitle = document.querySelectorAll('.tabs__item');
const tabsContent = document.querySelectorAll('.tabs__block');

if (tabsTitle.length > 0 || tabsContent.length > 0) {
	tabsTitle.forEach(item => item.addEventListener("click", event => {

		const tabsTitleTarget = event.target.getAttribute('data-tab');

		tabsTitle.forEach(element => element.classList.remove('active-tab'));

		tabsContent.forEach(element => element.classList.add('hidden-tab-content'));

		item.classList.add('active-tab');

		document.getElementById(tabsTitleTarget).classList.remove('hidden-tab-content');
		
	}));

	document.querySelector('[data-tab="tab-1"]').classList.add('active-tab');
	document.querySelector('#tab-1').classList.remove('hidden-tab-content');
}


const airdatepickers = document.querySelectorAll('#airdatepicker');
airdatepickers.forEach(airdatepicker => {
  new AirDatepicker(airdatepicker, {
    autoClose: true,
    buttons: ['today', 'clear'],
    dateFormat: 'd MMMM yyyy',
  });
});


//SPOLLERS
//Получаем коллекцию всех объектов у которых есть атрибут data-spollers
const spollersArray = document.querySelectorAll('[data-spollers]');
//Проверяем их наличие
if (spollersArray.length > 0) {
	//В рамках JS нам нужно разделить всю коллекцию на 2 массива. Один будет с простыми споллерами, а другой с теми которые работают по определённому брейкпоинту
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		//Проверяем отсутствие параметров у атрибута data-spollers
		return !item.dataset.spollers.split(",")[0];
	});
	//Проверяем есть ли они
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	//Получаем объекты с параметрами и которые будут работать в зависимости от ширины экрана
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		//Проверяем наличие параметров у атрибута data-spollers
		return item.dataset.spollers.split(",")[0];
	});
	
	//Далее нам нужно инициализировать споллеры с медиа запросом +
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		//Получаем уникальные брейкпоинты +
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		//Работаем с каждым брейкпоинтом +
			mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			//Обекты с нужными условиями +
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});

			//Событие +
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	//Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	//Работа с контентом +
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}

	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}


//====================================================================================================================
//SlideToggle +
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;


		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');			
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		
		window.setTimeout(() => {
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');

			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}

let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}


// Ползунки
const rangeItems = document.querySelectorAll('[data-range]');

if (rangeItems.length) {
    rangeItems.forEach(rangeItem => {
        const fromValue = rangeItem.querySelector('[data-range-from]');
        const toValue = rangeItem.querySelector('[data-range-to]');
        const item = rangeItem.querySelector('[data-range-item]');
        var inputs = [fromValue, toValue];
        noUiSlider.create(item, {
            start: [Number(fromValue.value), Number(toValue.value)],
            // tooltips это подсказки над ползунками
            // tooltips: [false, true],
            connect: true,
            range: {
                'min': [Number(fromValue.dataset.rangeFrom)],
                'max': [Number(toValue.dataset.rangeTo)]
            }
        });



        // Скрипт отображение значения слайдера в инпутах
        item.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = values[handle];
        });


		
        //Скрипт ввода значения в input и отображения его на слайдере
        inputs.forEach(function (input, handle) {

            input.addEventListener('change', function () {
                item.noUiSlider.setHandle(handle, this.value);
            });

            input.addEventListener('keydown', function (e) {

                var values = item.noUiSlider.get();
                var value = Number(values[handle]);

                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = item.noUiSlider.steps();

                // [down, up]
                var step = steps[handle];

                var position;

                // 13 is enter,
                // 38 is key up,
                // 40 is key down.
                switch (e.which) {

                    case 13:
                        item.noUiSlider.setHandle(handle, this.value);
                        break;

                    case 38:

                        // Get step to go increase slider value (up)
                        position = step[1];

                        // false = no step is set
                        if (position === false) {
                            position = 1;
                        }

                        // null = edge of slider
                        if (position !== null) {
                            item.noUiSlider.setHandle(handle, value + position);
                        }

                        break;

                    case 40:

                        position = step[0];

                        if (position === false) {
                            position = 1;
                        }

                        if (position !== null) {
                            item.noUiSlider.setHandle(handle, value - position);
                        }

                        break;
                }
            });
        });

    });
}

/*calendar script*/
const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

const updateCalendar = () => {
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	const firstDay = new Date(currentYear, currentMonth, 0);
	const lastDay = new Date(currentYear, currentMonth + 1, 0);
	const totalDays = lastDay.getDate();
	const firstDayIndex = firstDay.getDay();
	const lastDayIndex = lastDay.getDay();

	const monthYearString = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
	monthYearElement.textContent = monthYearString;

	let datesHtml = '';

	for (let i = firstDayIndex; i > 0; i--) {
		const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
		datesHtml += `<div class="date inactive"><span class="date-meaning">${prevDate.getDate()}</span></div>`;
	}

	for (let i = 1; i <= totalDays; i++) {
		const date = new Date(currentYear, currentMonth, i);
		const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
		datesHtml += +new Date(currentYear, currentMonth, i) > +new Date() ? `<div class="date ${activeClass}"><span class="date-meaning">${i}</span><span class="date-time">06:00-20:00</span></div>` : `<div class="date ${activeClass}"><span class="date-meaning">${i}</span></div>`;
	}

	//Получение текущей даты в миллисекундах
	/*+new Date();*/

	for (let i = 1; i <= 7 - lastDayIndex; i++) {
		const nextDate = new Date(currentYear, currentMonth + 1, i);
		datesHtml += `<div class="date inactive"><span class="date-meaning">${nextDate.getDate()}</span></div>`;
	}

	datesElement.innerHTML = datesHtml;
}

if (prevBtn) {
	prevBtn.addEventListener('click', function() {
		currentDate.setMonth(currentDate.getMonth() - 1);
		updateCalendar();
	});
}

if (nextBtn) {
	nextBtn.addEventListener('click', function() {
		currentDate.setMonth(currentDate.getMonth() + 1);
		updateCalendar();
	});
}

if (datesElement && monthYearElement) {
	updateCalendar();
}