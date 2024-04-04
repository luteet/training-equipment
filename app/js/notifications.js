export default function notifications() {

	const header = document.querySelector(".header"),
	headerMessage = header.querySelector(".header__message"),
	headerPanel = header.querySelector(".header__panel"),
	notifications = document.querySelectorAll(".notifications");

	if(notifications.length) {
		function scroll() {
			notifications.forEach(block => {
				block.style.setProperty("--top", `${headerMessage.offsetHeight + 20 + headerPanel.offsetHeight - Math.abs(header.getBoundingClientRect().top)}px`);
			})
		}
	
		scroll();
		window.addEventListener("scroll",scroll)
	}

}