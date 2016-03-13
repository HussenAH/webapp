
function $ (selector) {
	return document.querySelector(selector);
}


function all(selector){
	return document.querySelectorAll(selector);
}

function updateNotification (notification) {
	if(notification !==undefined){
		$(".notifications").innerHTML = notification;
	}
}
function loadPageData(response){
	updateNotification(response.notification);
	
	
}


function initWebApp() {
UTILS.ajax("data/config.json",{done:loadPageData});

}

window.onLoad =  initWebApp();




