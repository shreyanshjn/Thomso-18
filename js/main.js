if ('serviceWorker' in navigator) {
	navigator.serviceWorker.getRegistrations().then(function(registrations) {
		for(let registration of registrations) {
		registration.unregister()
		}
	}).catch(function(err) {
		// console.log(err);
	});
} else {
	// console.log('Service Worker is not supported by browser.');
}
$(window).load(function() {
	new Galaxy($('#galaxy').get(0));
	$('#galaxy').fadeIn('fast');
})
function  gotoHome() {
	window.location.href = '/';
}