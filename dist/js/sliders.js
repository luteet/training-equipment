
export default function sliders() {

	document.querySelectorAll('.reviews__slider').forEach(sliderElement => {

		const slider = new Splide(sliderElement, {
	
			type: "loop",
			perPage: sliderElement.closest('.about-us') ? 1 : 2,
			autoWidth: sliderElement.closest('.about-us') ? true : false,
			arrows: false,
			speed: 700,
			easing: "ease",
	
			breakpoints: {
	
				768: {
					perPage: 1,
				},
	
				550: {
					speed: 300,
				}
			}
	
		});
	
		slider.mount();
	
	})
	
	document.querySelectorAll('.product__gallery').forEach(sliderElement => {
	
		let navSliders = [];
	
		sliderElement.closest('section').querySelectorAll(".product__gallery_nav").forEach(sliderNavElement => {
			const slider = new Splide(sliderNavElement, {
	
				rewind: true,
				autoWidth: true,
				fixedWidth: "90px",
				arrows: false,
				pagination: false,
				
				gap: 16,
				isNavigation: true,
				mediaQuery: "min",
		
				breakpoints: {
					992: {
						speed: 700,
						easing: "ease",
					}
				}
			});
	
			navSliders.push(slider);
		})
	
		const slider = new Splide(sliderElement, {
	
			type: "fade",
			rewind: true,
			perPage: 1,
			arrows: false,
			pagination: false,
			speed: 700,
			easing: "ease",
	
			breakpoints: {
				550: {
					speed: 400,
				}
			}
	
		});
	
		navSliders.map(navSlider => {
			slider.sync(navSlider)	
		})
	
		slider.mount();
	
		navSliders.map(navSlider => {
			navSlider.mount()	
		})
	
	})
}
