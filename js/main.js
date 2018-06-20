$(window).load(function() {
	new Galaxy($('#galaxy').get(0));
	$('#galaxy').fadeIn('fast');
	var countDownDate = new Date("Oct 25, 2018 00:00:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("countDown").innerHTML = days + " Days to go...";    
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countDown").innerHTML = "0";
    }
}, 1000);
})