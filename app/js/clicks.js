export default function clicksEvents() {

	const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	header = document.querySelector('.header');	


	function updatePrice() {
		const prices = document.querySelectorAll(".product__length_value");
		prices.forEach(priceValue => {

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
		
		
		if(prices.length == 0) {
			document.querySelectorAll("[data-price-sum-result]").forEach(sum => sum.textContent = 0);
		}
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- <get-coords> -=-=-=-=-=-=-=-=-=-=-=-=
	
	function getCoords(elem) {
		let box = elem.getBoundingClientRect();
	
		return {
			top: box.top + window.scrollY,
			right: box.right + window.scrollX,
			bottom: box.bottom + window.scrollY,
			left: box.left + window.scrollX
		};
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </get-coords> -=-=-=-=-=-=-=-=-=-=-=-=

	body.addEventListener('click', function (event) {

		function $(elem) {
			return event.target.closest(elem)
		}
	
	
		// =-=-=-=-=-=-=-=-=-=-=-=- <menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=
		
		if ($('.header__burger')) {
		
			menu.forEach(element => {
				element.classList.toggle('is-mobile-menu-active')
			})
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=
	
		
	
		// =-=-=-=-=-=-=-=-=-=-=-=- <header-message> -=-=-=-=-=-=-=-=-=-=-=-=
		
		const headerMessageClose = $(".header__message--close")
		if(headerMessageClose) {
		
			headerMessageClose.closest('.header__message').classList.add('is-hidden');
			setTimeout(() => {
				html.style.setProperty("--height-header", header.offsetHeight + "px");
			},400)
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </header-message> -=-=-=-=-=-=-=-=-=-=-=-=
	
	
		
		// =-=-=-=-=-=-=-=-=-=-=-=- <header-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=
		
		const headerDropDownTarget = $(".header__drop-down--target")
		if(headerDropDownTarget) {
		
			if(headerDropDownTarget.parentElement.classList.contains('is-active')) {
				document.querySelectorAll('.header__drop-down.is-active').forEach(dropDown => {
					dropDown.classList.remove('is-active')
				})	
			} else {
				document.querySelectorAll('.header__drop-down.is-active').forEach(dropDown => {
					dropDown.classList.remove('is-active')
				})
	
				headerDropDownTarget.parentElement.classList.add('is-active');
			}
		
		} else if(!$('.header__drop-down')) {
			document.querySelectorAll('.header__drop-down.is-active').forEach(dropDown => {
				dropDown.classList.remove('is-active')
			})
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </header-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=
	
	
	
		// =-=-=-=-=-=-=-=-=-=-=-=- <categories> -=-=-=-=-=-=-=-=-=-=-=-=
		
		const catalogCategoriesTarget = $(".catalog__categories_target")
		if(catalogCategoriesTarget) {
		
			catalogCategoriesTarget.classList.toggle('is-active');
		
		} else if(!$(".catalog__categories")) {
			document.querySelectorAll('.catalog__categories_target.is-active').forEach(target => target.classList.remove("is-active"));
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </categories> -=-=-=-=-=-=-=-=-=-=-=-=


		// =-=-=-=-=-=-=-=-=-=-=-=- <product-length> -=-=-=-=-=-=-=-=-=-=-=-=
		
		const productLengthMinus = $(".product__length_minus")
		if(productLengthMinus) {
		
			const input = productLengthMinus.parentElement.querySelector("input");
			input.value = Math.max(Number(input.min), Number(input.value) - 1);

			updatePrice();
		
		}

		const productLengthPlus = $(".product__length_plus")
		if(productLengthPlus) {
			
			const input = productLengthPlus.parentElement.querySelector("input");
			const value = Number(input.value) + 1;

			input.value = Math.min(input.max, value);

			updatePrice();
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </product-length> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <remove-cart-item> -=-=-=-=-=-=-=-=-=-=-=-=
		
		const cartItemRemove = $(".cart__item_remove")
		if(cartItemRemove) {
		
			const item = cartItemRemove.closest('.cart__item');
			if(!item.classList.contains('is-removing')) {
				item.classList.add('is-removing');
				setTimeout(() => {
					item.remove();
					updatePrice();
				},300)
			}
			
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </remove-cart-item> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <about-us-aside-nav> -=-=-=-=-=-=-=-=-=-=-=-=
		
		const aboutUsAsideNavLink = $(".about-us__aside_nav a")
		if(aboutUsAsideNavLink) {
		
			event.preventDefault();
			let section;
		
			section = document.querySelector(aboutUsAsideNavLink.getAttribute('href'))
		
			if(section) {
				section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
			} else {
				body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
			}
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </about-us-aside-nav> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <account-edit> -=-=-=-=-=-=-=-=-=-=-=-=
		
		const accountBlockEdit = $(".account__block_edit, .account__block_footer button")
		if(accountBlockEdit) {
		
			const block = accountBlockEdit.closest(".account__block"),
			groups = block.querySelectorAll(".account__block_group");

			if(!block.classList.contains("is-animating")) {	

				block.classList.add("is-animating")
				
				block.classList.toggle("is-editing");

				if(block.classList.contains("is-editing")) {

					groups[0].style.setProperty("opacity", "0");
					groups[0].style.setProperty("visibility", "hidden");

					setTimeout(() => {

						groups[0].style.setProperty("display", "none");
						groups[1].style.setProperty("display", "grid");

						setTimeout(() => {
							groups[1].style.setProperty("opacity", "1");
							groups[1].style.setProperty("visibility", "visible");

							block.classList.remove("is-animating")
						},50)

					},300)

				} else if(!block.classList.contains("is-editing")) {

					groups[1].style.setProperty("opacity", "0");
					groups[1].style.setProperty("visibility", "hidden");

					setTimeout(() => {

						groups[1].style.setProperty("display", "none");
						groups[0].style.setProperty("display", "grid");

						setTimeout(() => {
							groups[0].style.setProperty("opacity", "1");
							groups[0].style.setProperty("visibility", "visible");

							block.classList.remove("is-animating")
						},50)

					},300)

				}

			}
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </account-edit> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <password-toggle> -=-=-=-=-=-=-=-=-=-=-=-=
		
		const passwordToggle = $(".password-toggle")
		if(passwordToggle) {

			const label = passwordToggle.parentElement,
			input = label.querySelector('input');
		
			label.classList.toggle("is-visible-password");
			if(label.classList.contains("is-visible-password")) {
				input.setAttribute("type", "text");
			} else {
				input.setAttribute("type", "password");
			}
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </password-toggle> -=-=-=-=-=-=-=-=-=-=-=-=
	
	})
}