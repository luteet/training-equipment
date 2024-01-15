
import clicksEvents from './clicks.js';
import sliders from './sliders.js';
import Popup from './popup.js';

const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure');
imageAspectRatio.forEach(imageAspectRatio => {
	const img = imageAspectRatio.querySelector('img'), style = getComputedStyle(imageAspectRatio);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageAspectRatio.style.setProperty('--padding-aspect-ratio', Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%');
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-

const popup = new Popup({
	saveID: true,
});

popup.init();

// =-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <Get-device-type> -=-=-=-=-=-=-=-=-=-=-

const getDeviceType = () => {

	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return "tablet";
	}

	if (
		/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
		ua
		)
	) {
		return "mobile";
	}
	return "desktop";

};

// =-=-=-=-=-=-=-=-=-=- </Get-device-type> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <click-events> -=-=-=-=-=-=-=-=-=-=-=-=

clicksEvents(body);

// =-=-=-=-=-=-=-=-=-=-=-=- </click-events> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0;

function resize() {

	header && html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	
	windowSize = window.innerWidth;
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

sliders();

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <sticky> -=-=-=-=-=-=-=-=-=-=-=-=

new Sticky(".sticky");

// =-=-=-=-=-=-=-=-=-=-=-=- </sticky> -=-=-=-=-=-=-=-=-=-=-=-=


function updatePrice() {
	document.querySelectorAll(".product__length_value").forEach(priceValue => {
	
		const parent = priceValue.parentElement,
		input = priceValue;
		
		const value = input.value;
	
		input.value = Math.min(input.max, value);
	
		let priceResult;
	
		if(parent.closest("[data-price-container]")) {
			priceResult = parent.closest("[data-price-container]").querySelectorAll("[data-price-result]");
		}
	
		if(priceResult) {
			priceResult.forEach(priceElement => priceElement.textContent = (Number(input.value) * Number(input.dataset.priceValue)).toLocaleString("RU-ru"));
	
			const container = parent.closest("[data-price-sum-container-id]");
	
			if(container) {
				const sum = document.querySelectorAll(`[data-price-sum-result="${container.dataset.priceSumContainerId}"]`);
	
				if(sum.length) {
					const values = container.querySelectorAll("[data-price-value]");
					let resultValue = 0;
					values.forEach(valueElement => {
						resultValue += Number(valueElement.value) * Number(valueElement.dataset.priceValue);
					})
	
					sum.forEach(sum => sum.textContent = sum.dataset.priceDiscount ? (resultValue - Number(sum.dataset.priceDiscount)).toLocaleString("RU-ru") : resultValue.toLocaleString("RU-ru"))
				}
			}
		}
	
	})
}
	
updatePrice();

document.querySelectorAll('.product__length_value').forEach(input => {
	const max = Number(input.max), min = Number(input.min);

	input.addEventListener("input", function (event) {
		const value = Number(input.value);

		if(value > max) input.value = max;

		updatePrice();
	})
})


// =-=-=-=-=-=-=-=-=-=- <tel-validator> -=-=-=-=-=-=-=-=-=-=-

function validatePhoneNumber(input) {
	let reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
	return reg.test(input.value);
}

// =-=-=-=-=-=-=-=-=-=- </tel-validator> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <email-validator> -=-=-=-=-=-=-=-=-=-=-

function validateEmail(input) {

	let emailRegex = /^[^\s@]+@[^\s@]+[^\s@]+$/;

	if (emailRegex.test(input.value)) {
		return true;
	} else {
		return false;
	}

}

// =-=-=-=-=-=-=-=-=-=- </email-validator> -=-=-=-=-=-=-=-=-=-=-

document.querySelectorAll("form").forEach(form => {
	const inputs = form.querySelectorAll("input");

	inputs.forEach(input => {
		input.addEventListener("blur", function (event) {
			if(input.value != "") {
				
				if(input.type == "tel") {
					if(!validatePhoneNumber(input)) {
						input.parentElement.classList.add("is-error");
					} else {
						input.parentElement.classList.remove("is-error");
					}
				}

				if(input.type == "email") {
					if(!validateEmail(input)) {
						input.parentElement.classList.add("is-error");
					} else {
						input.parentElement.classList.remove("is-error");
					}
				}
				
			} else {
				input.parentElement.classList.remove("is-error");
			}
		})
	})

	form.addEventListener("submit", function (event) {
		
		let testForm = form.querySelector(".is-error") ? false : true;
		if(!testForm) event.preventDefault();
		
	})
})

