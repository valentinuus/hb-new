// testWebP
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});
// testWebP

// меню
const burger = document.querySelector('[data-burger]');
const menu = document.querySelector('[data-menu]');
const body = document.body;
const closeMenu = document.querySelector('[data-burger-close]')
const navItems = document.querySelector('.menu').querySelectorAll('a');

burger.addEventListener('click', () => {
	// body.classList.toggle('stop--scroll');
	menu.classList.toggle('menu--visible');
});

closeMenu.addEventListener('click', () => {
	// body.classList.remove('stop--scroll');
	menu.classList.remove('menu--visible');
})

navItems.forEach(el => {
	el.addEventListener('click', () => {
		// body.classList.remove('stop--scroll');
		menu?.classList.remove('menu--visible');
	});
});


// появление при скролле
window.addEventListener('scroll', function () {
	document
		.querySelector('.header__content')
		.classList.toggle('show--menu', window.scrollY > 1600);
});
// меню

//accordion
class GraphAccordion {
	constructor(selector, options) {
		let defaultOptions = {
			isOpen: () => { },
			isClose: () => { },
			speed: 300
		};

		this.options = Object.assign(defaultOptions, options);
		this.accordion = document.querySelector(selector);
		this.control = this.accordion.querySelector('.accordion__control');
		this.content = this.accordion.querySelector('.accordion__content');
		this.event();
	}

	event() {

		if (this.accordion) {
			this.accordion.addEventListener('click', (e) => {
				this.accordion.classList.toggle('open');

				if (this.accordion.classList.contains('open')) {
					this.open();
				} else {
					this.close();
				}
			});
		}
	}

	open() {
		this.accordion.style.setProperty('--accordion-time', `${this.options.speed / 1000}s`);
		this.accordion.classList.add('is-open');
		this.control.setAttribute('aria-expanded', true);
		this.content.setAttribute('aria-hidden', false);
		this.content.style.maxHeight = this.content.scrollHeight + 'px';
		this.options.isOpen(this);
	}

	close() {
		this.accordion.classList.remove('is-open');
		this.control.setAttribute('aria-expanded', false);
		this.content.setAttribute('aria-hidden', true);
		this.content.style.maxHeight = null;
		this.options.isClose(this);
	}
}
const accordion1 = new GraphAccordion('.accordion-1', {
});
const accordion2 = new GraphAccordion('.accordion-2', {
});
const accordion3 = new GraphAccordion('.accordion-3', {
});
const accordion4 = new GraphAccordion('.accordion-4', {
});
const accordion5 = new GraphAccordion('.accordion-5', {
});
const accordion6 = new GraphAccordion('.accordion-6', {
});
//accordion

// inputmask
const form = document.querySelector('.form');
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(telSelector);

const validation = new JustValidate('.form');

validation
	.addField('.input-tel', [
		{
			rule: 'required',
			value: true,
			errorMessage: 'Телефон обязателен',
		},
		{
			rule: 'function',
			validator: function () {
				const phone = telSelector.inputmask.unmaskedvalue();
				return phone.length === 10;
			},
			errorMessage: 'Введите корректный телефон',
		},
	]).onSuccess((event) => {
		console.log('Validation passes and form submitted', event);
		let formData = new FormData(event.target);
		console.log(...formData);
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log('Отправлено');
				}
			}
		}
		xhr.open('POST', 'mail.php', true);
		xhr.send(formData);
		event.target.reset();
	});

// inputmask


// фильтр
const elem = document.querySelector('.grid');
const iso = new Isotope(elem, {
	// options
	itemSelector: '.product',
	layoutMode: 'masonry',
});

document.querySelectorAll('.filter-list__btn').forEach(el => {
	el.addEventListener('click', (e) => {
		let filter = e.currentTarget.dataset.filter;
		iso.arrange({ filter: `${filter}` });
	});
});
// фильтр
