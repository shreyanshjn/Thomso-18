$(window).load(function() {
	new Galaxy($('#galaxy').get(0));
	$('#galaxy').fadeIn('fast');
})
function  gotoHome() {
	window.location.href = '/';
}