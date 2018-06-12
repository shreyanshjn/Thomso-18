$(window).load(function() {

	new Galaxy($('#galaxy').get(0));
	$('#galaxy').fadeIn('fast');

	$('.circle-anim').each(function() {
		new CircleAnim(this);
	});



	window.human = false;

	var canvasEl = document.querySelector('#fire');
	var ctx = canvasEl.getContext('2d');
	var numberOfParticules = 15;
	var pointerX = 0;
	var pointerY = 0;
	var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
	var colors = ['#C0C0C0', '#FFF'];

	function setCanvasSize() {
	  canvasEl.width = window.innerWidth * 2;
	  canvasEl.height = window.innerHeight * 2;
	  canvasEl.style.width = window.innerWidth + 'px';
	  canvasEl.style.height = window.innerHeight + 'px';
	  canvasEl.getContext('2d').scale(2, 2);
	}

	function updateCoords(e) {
	  pointerX = e.clientX || e.touches[0].clientX;
	  pointerY = e.clientY || e.touches[0].clientY;
	}

	function setParticuleDirection(p) {
	  var angle = anime.random(0, 360) * Math.PI / 180;
	  var value = anime.random(50, 180);
	  var radius = [-1, 1][anime.random(0, 1)] * value;
	  return {
	    x: p.x + radius * Math.cos(angle),
	    y: p.y + radius * Math.sin(angle)
	  }
	}

	function createParticule(x,y) {
	  var p = {};
	  p.x = x;
	  p.y = y;
	  p.color = colors[anime.random(0, colors.length - 1)];
	  p.radius = anime.random(6, 10);
	  p.endPos = setParticuleDirection(p);
	  p.draw = function() {
	    ctx.beginPath();
	    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
	    ctx.fillStyle = p.color;
	    ctx.fill();
	  }
	  return p;
	}

	function createCircle(x,y) {
	  var p = {};
	  p.x = x;
	  p.y = y;
	  p.color = '#FFF';
	  p.radius = 0.1;
	  p.alpha = .5;
	  p.lineWidth = 6;
	  p.draw = function() {
	    ctx.globalAlpha = p.alpha;
	    ctx.beginPath();
	    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
	    ctx.lineWidth = p.lineWidth;
	    ctx.strokeStyle = p.color;
	    ctx.stroke();
	    ctx.globalAlpha = 1;
	  }
	  return p;
	}

	function renderParticule(anim) {
	  for (var i = 0; i < anim.animatables.length; i++) {
	    anim.animatables[i].target.draw();
	  }
	}

	function animateParticules(x, y) {
	  var circle = createCircle(x, y);
	  var particules = [];
	  for (var i = 0; i < numberOfParticules; i++) {
	    particules.push(createParticule(x, y));
	  }
	  anime.timeline().add({
	    targets: particules,
	    x: function(p) { return p.endPos.x; },
	    y: function(p) { return p.endPos.y; },
	    radius: 0.1,
	    duration: anime.random(1200, 1800),
	    easing: 'easeOutExpo',
	    update: renderParticule
	  })
	    .add({
	    targets: circle,
	    radius: anime.random(100, 200),
	    lineWidth: 0,
	    alpha: {
	      value: 0,
	      easing: 'linear',
	      duration: anime.random(600, 800),
	    },
	    duration: anime.random(1200, 1800),
	    easing: 'easeOutExpo',
	    update: renderParticule,
	    offset: 0
	  });
	}

	var render = anime({
	  duration: Infinity,
	  update: function() {
	    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
	  }
	});

	document.addEventListener(tap, function(e) {
	  window.human = true;
	  render.play();
	  updateCoords(e);
	  animateParticules(pointerX, pointerY);
	}, false);

	var centerX = window.innerWidth / 2;
	var centerY = window.innerHeight / 2;


	setCanvasSize();
	window.addEventListener('resize', setCanvasSize, false);












});

$(document).ready(function() {
	var textAnimations = [];
	$('.text-anim').each(function() {
		var match = $(this).text().match(/\[(.*)\]/i);
		if(match) {
			var typings = $(this).text().match(/\[(.*)\]/i)[1].split('|');
			if(typings.length > 0) {
				$(this).html($(this).text().replace(/\[.*\]/i, '<span class="typing"></span>'));
				var typed = new Typed($(this).find('.typing')[0], {
					strings: typings,
					typeSpeed: 75,
					fadeOut: true,
					fadeOutDelay: 500,
					showCursor: false,
					loop: true
				});
			}
		}
	});

    $.localScroll();

	$(window).scroll(function() {
		if($(window).scrollTop() > 100)
		{
			$('#intro-events').fadeOut();
		}
		else {
			$('#intro-events').fadeIn();
		}
	});

	$('body').on('click', '[data-facebook]', function(e) {
		e.preventDefault(true);
		PopupCenter('http://www.facebook.com/sharer.php?u='+$(this).attr('href'), 'fb-share', 560, 560);
		return false;
	});


	var fancyOptionsPhoto = {
		animationEffect: 'zoom',
		transitionEffect: 'slide',
		smallBtn : true,
		toolbar : false,
		hash: false,
		btnTpl: {
			smallBtn: '<a class="popup-close" href="javascript:;" data-fancybox-close title="{{CLOSE}}"><i class="fal fa-times"></i></a>' +
					  '<a class="popup-photo-share" data-facebook target="_blank" href="javascript:;" >Share on ' +
					  '<img src="images/facebook.png"/>' +
					  '</a>'

		},
		afterShow: function( instance, current ) {
			current.$smallBtn.filter('.popup-photo-share').attr('href', current.src);
        }
	};
	var fancyOptions = {
		smallBtn : true,
		toolbar : false,
		hash: false,
		btnTpl: {
			smallBtn: '<a class="popup-close" href="javascript:;" data-fancybox-close title="{{CLOSE}}"><i class="fal fa-times"></i></a>'
		},
		afterShow: function() {
			$('[data-fancybox][data-fancybox!="gallery-image"]').fancybox(fancyOptions);
			$('[data-fancybox="gallery-image"]').fancybox(fancyOptionsPhoto);
		}
	};
	$('[data-fancybox]').fancybox(fancyOptions);
	$('body').on('click','[data-fancybox-link]', function(e) {
		var $instance = $.fancybox.getInstance();
		if($instance) {
			e.preventDefault();
			$instance.close();
			$.fancybox.open( {
				src: $(this).attr('href'),
				type: 'ajax',
				opts: fancyOptions
			}
		);
		}
	});

	$('.agenda-item, .news-item').on('click', function(e) {
		if(e.target.nodeName != 'A') {
			$(this).find('a[data-fancybox]').trigger('click');
		}
	});

	var myScrollbars = new Scrollbars({
		selector: '.agenda-col, .gallery-col',
		className: 'scrollbars',
		contentClass: 'scrollbars__content-wrapper',
		hoverable: true
	});

	var $clock = $('#intro-clock');
	if($clock.length) {
		var now = new Date();
		var then = new Date($clock.data('date'));
		if(now < then) {
			$clock.TimeCircles({
				count_past_zero: false,
				circle_bg_color: 'rgba(255, 255, 255, .25)',
				fg_width: 0.025,
				text_size: 0.1,
				number_size: 0.25,
				time: {
					Days: { color: '#ffb100' },
					Hours: { color: '#ffb100' },
					Minutes: { color: '#ffb100' },
					Seconds: { color: '#ffb100' }
				}
			}).addListener(function (unit, value, total) {
				if (total <= 0) $(this).slideUp();
			});
			$(window).resize(function(){
				$clock.TimeCircles().rebuild();
			});
		}
	}
});

function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}






















// $(window).load(function() {
//
//
//
//
//
// 	new Galaxy($('#galaxy').get(0));
// 	$('#galaxy').fadeIn('fast');
//
// 	$('.circle-anim').each(function() {
// 		new CircleAnim(this);
// 	});
// });
//
// $(document).ready(function() {
// 	var textAnimations = [];
// 	$('.text-anim').each(function() {
// 		var match = $(this).text().match(/\[(.*)\]/i);
// 		if(match) {
// 			var typings = $(this).text().match(/\[(.*)\]/i)[1].split('|');
// 			if(typings.length > 0) {
// 				$(this).html($(this).text().replace(/\[.*\]/i, '<span class="typing"></span>'));
// 				var typed = new Typed($(this).find('.typing')[0], {
// 					strings: typings,
// 					typeSpeed: 75,
// 					fadeOut: true,
// 					fadeOutDelay: 500,
// 					showCursor: false,
// 					loop: true
// 				});
// 			}
// 		}
// 	});
//
//     $.localScroll();
//
// 	$(window).scroll(function() {
// 		if($(window).scrollTop() > 100)
// 		{
// 			$('#intro-events').fadeOut();
// 		}
// 		else {
// 			$('#intro-events').fadeIn();
// 		}
// 	});
//
// 	$('body').on('click', '[data-facebook]', function(e) {
// 		e.preventDefault(true);
// 		PopupCenter('http://www.facebook.com/sharer.php?u='+$(this).attr('href'), 'fb-share', 560, 560);
// 		return false;
// 	});
//
//
// 	var fancyOptionsPhoto = {
// 		animationEffect: 'zoom',
// 		transitionEffect: 'slide',
// 		smallBtn : true,
// 		toolbar : false,
// 		hash: false,
// 		btnTpl: {
// 			smallBtn: '<a class="popup-close" href="javascript:;" data-fancybox-close title="{{CLOSE}}"><i class="fal fa-times"></i></a>' +
// 					  '<a class="popup-photo-share" data-facebook target="_blank" href="javascript:;" >Share on ' +
// 					  '<img src="images/facebook.png"/>' +
// 					  '</a>'
//
// 		},
// 		afterShow: function( instance, current ) {
// 			current.$smallBtn.filter('.popup-photo-share').attr('href', current.src);
//         }
// 	};
// 	var fancyOptions = {
// 		smallBtn : true,
// 		toolbar : false,
// 		hash: false,
// 		btnTpl: {
// 			smallBtn: '<a class="popup-close" href="javascript:;" data-fancybox-close title="{{CLOSE}}"><i class="fal fa-times"></i></a>'
// 		},
// 		afterShow: function() {
// 			$('[data-fancybox][data-fancybox!="gallery-image"]').fancybox(fancyOptions);
// 			$('[data-fancybox="gallery-image"]').fancybox(fancyOptionsPhoto);
// 		}
// 	};
// 	$('[data-fancybox]').fancybox(fancyOptions);
// 	$('body').on('click','[data-fancybox-link]', function(e) {
// 		var $instance = $.fancybox.getInstance();
// 		if($instance) {
// 			e.preventDefault();
// 			$instance.close();
// 			$.fancybox.open( {
// 				src: $(this).attr('href'),
// 				type: 'ajax',
// 				opts: fancyOptions
// 			}
// 		);
// 		}
// 	});
//
// 	$('.agenda-item, .news-item').on('click', function(e) {
// 		if(e.target.nodeName != 'A') {
// 			$(this).find('a[data-fancybox]').trigger('click');
// 		}
// 	});
//
// 	var myScrollbars = new Scrollbars({
// 		selector: '.agenda-col, .gallery-col',
// 		className: 'scrollbars',
// 		contentClass: 'scrollbars__content-wrapper',
// 		hoverable: true
// 	});
//
// 	var $clock = $('#intro-clock');
// 	if($clock.length) {
// 		var now = new Date();
// 		var then = new Date($clock.data('date'));
// 		if(now < then) {
// 			$clock.TimeCircles({
// 				count_past_zero: false,
// 				circle_bg_color: 'rgba(255, 255, 255, .25)',
// 				fg_width: 0.025,
// 				text_size: 0.1,
// 				number_size: 0.25,
// 				time: {
// 					Days: { color: '#ffb100' },
// 					Hours: { color: '#ffb100' },
// 					Minutes: { color: '#ffb100' },
// 					Seconds: { color: '#ffb100' }
// 				}
// 			}).addListener(function (unit, value, total) {
// 				if (total <= 0) $(this).slideUp();
// 			});
// 			$(window).resize(function(){
// 				$clock.TimeCircles().rebuild();
// 			});
// 		}
// 	}
// });
//
// function PopupCenter(url, title, w, h) {
//     // Fixes dual-screen position                         Most browsers      Firefox
//     var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
//     var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;
//
//     var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
//     var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
//
//     var left = ((width / 2) - (w / 2)) + dualScreenLeft;
//     var top = ((height / 2) - (h / 2)) + dualScreenTop;
//     var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
//
//     // Puts focus on the newWindow
//     if (window.focus) {
//         newWindow.focus();
//     }
// }
