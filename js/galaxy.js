/**
 * Javascript file for background display on AZAR Club
 *
 * @author Christophe Joassin <christophe.joassin@webadev.com>
 */


/**
 * Galaxy Class
 */
function Galaxy(element)
{
	var camera, scene, renderer, particleGroup, letterGroup;
	var scrollTop = 0, scrollPercent = 0;
	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	function init()
	{
		if(!webgl_support()) return;

		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 10, 5000 );
		camera.position.z = 1500;

		scene = new THREE.Scene();
		particleGroup = new THREE.Group();
		scene.add( particleGroup );

		camera.lookAt( scene.position );

		var material = new THREE.SpriteMaterial({
			map: new THREE.CanvasTexture(generateSprite()),
			blending: THREE.AdditiveBlending
		});

		for ( var i = 0; i < 500; i++ ) {
			var particle = new THREE.Sprite( material );
			particle.position.x = Math.random() * 2000 - 1000;
			particle.position.y = Math.random() * 2000 - 1000;
			particle.position.z = Math.random() * 2000 - 1000;
			particle.scale.x = particle.scale.y = Math.random() * 5 + 5;
			particleGroup.add( particle );
		}

		letterGroup = new THREE.Group();
		scene.add( letterGroup );

		// azar = 'THOMSO\'18';
		// for(var i=0; i< azar.length; i++) {
		// 	var letter = new THREE.Sprite(new THREE.SpriteMaterial({
		// 		map: new THREE.CanvasTexture( generateChar(azar[i], 512) ),
		// 		rotation: Math.random() * Math.PI / 4 - Math.PI / 8,
		// 		blending: THREE.AdditiveBlending
		// 	}));

		// 	letter.scale.x = letter.scale.y = 180;
		// 	letterGroup.add(letter);

		// 	(function(l) {
		// 		l.material.opacity = 0;
		// 		new TWEEN.Tween(l.material)
		// 			.delay(i*250 + 500)
		// 			.to({opacity: 1}, 500)
		// 			.start();

		// 		new TWEEN.Tween(l.position)
		// 			.easing(TWEEN.Easing.Exponential.Out)
		// 			.delay(i*250)
		// 			.to({
		// 				x: i * 180 - 500,
		// 				y: Math.random() * 150 - 150,
		// 				z: Math.random() * 350 + 650
		// 			}, 1000)
		// 			.start();

		// 	})(letter);
		// }

		renderer = new THREE.WebGLRenderer({alpha: true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		element.appendChild(renderer.domElement);

		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('touchstart', onDocumentTouchStart, false);
		document.addEventListener('touchmove', onDocumentTouchMove, false);
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('scroll', onWindowScroll, false);

		animate();
	}

	function webgl_support() {
		try{
			var canvas = document.createElement( 'canvas' );
			return !! window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
		} catch(e) { return false; }
	};

	function generateSprite()
	{
		var canvas = document.createElement('canvas');
		canvas.width = 32;
		canvas.height = 32;
		var context = canvas.getContext( '2d' );
		var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
		gradient.addColorStop(0.3, 'rgba(255,255,255,.85)');
		gradient.addColorStop(0.6, 'rgba(5,25,143,.65)');
		gradient.addColorStop(1, 'rgba(5,25,143,0)');
		context.fillStyle = gradient;
		context.fillRect(0, 0, canvas.width, canvas.height);
		return canvas;
	}

	function generateChar(char, size)
	{
		var canvas = document.createElement('canvas');
		canvas.width = size;
		canvas.height = size;
		var context = canvas.getContext( '2d' );
		context.fillStyle = 'rgba(6,36,204,.5)';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = 'bold ' + size +'px "niveau-grotesk"';
		context.fillText(char, size/2, size/2);
		return canvas;
	}

	function onWindowResize()
	{
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	function onWindowScroll()
	{
		scrollTop = $(window).scrollTop();
		scrollPercent = 100 * scrollTop / ($(document).height() - $(window).height());
	}

	function onDocumentMouseMove(event)
	{
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	function onDocumentTouchStart(event)
	{
		if (event.touches.length === 1)
		{
			event.preventDefault();
			mouseX = event.touches[0].pageX - windowHalfX;
			mouseY = event.touches[0].pageY - windowHalfY;
		}
	}

	function onDocumentTouchMove(event)
	{
		if (event.touches.length === 1)
		{
			event.preventDefault();
			mouseX = event.touches[0].pageX - windowHalfX;
			mouseY = event.touches[0].pageY - windowHalfY;
		}
	}

	function animate(time)
	{
		TWEEN.update(time);
		requestAnimationFrame( animate );
		render();
	}

	function render() {

		scene.position.y = scrollTop * 0.5;

		camera.position.x += (mouseX  - camera.position.x) * 0.002;
		camera.position.y += (-mouseY - camera.position.y) * 0.002;
		camera.lookAt(scene.position);

		element.style.backgroundPosition = '0 ' + scrollPercent + '%';

		particleGroup.rotation.x += 0.002;
		particleGroup.rotation.y += 0.002;

		renderer.render(scene, camera);
	}

	init();
}
