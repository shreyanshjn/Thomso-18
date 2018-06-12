/**
 * Javascript file for background display on AZAR Club
 * 
 * @author Christophe Joassin <christophe.joassin@webadev.com>
 */


/**
 * CircleAnim Class
 */
// function CircleAnim(element)
// {
// 	var lines = [];
// 	var mouseX = 0, mouseY = 0;

// 	var width, height, halfX, halfY;
	
// 	var mouseFactorX, mouseFactorY;
// 	var screenFactor;
// 	var timeFactor = 0.0002;
	
// 	var windowHalfX;
// 	var windowHalfY;

// 	var noise = new Noise(Math.random());

// 	var linesAmount = 4;
// 	var verticesAmount = 75;
// 	var color = '#dd3366';

// 	var radius;
// 	var strokeWidth;

// 	var canvas = document.createElement('canvas');
// 	var context = canvas.getContext('2d');
// 	element.appendChild(canvas);
	
// 	computeDimensions();

// 	for(var i=0; i<linesAmount; i++)
// 	{
// 		lines[i] = [];
// 		for(var j=0; j<=verticesAmount; j++)
// 		{
// 			var point = {
// 				x: Math.cos(j/verticesAmount * Math.PI*2),
// 				y: Math.sin(j/verticesAmount * Math.PI*2),
// 				s: strokeWidth,
// 			};
// 			point._x = point.x;
// 			point._y = point.y;
// 			lines[i].push(point);
// 		}
// 	}

// 	function updateVertices(time)
// 	{
// 		computeMouseFactor(false);
// 		var ratio, strokeRatio;

// 		for(var i=0; i<linesAmount; i++)
// 		{
// 			for(var j=0; j<=verticesAmount; j++) {

// 				/// Génération des coordonnées aléatoires (basées sur les coordonnées précédentes)
// 				ratio = noise.simplex2(lines[i][j].x/screenFactor + time*timeFactor, lines[i][j].y/screenFactor + time*timeFactor);
// 				lines[i][j].x = lines[i][j]._x * ((radius - i * radius / 9) + (ratio * radius / 9));
// 				lines[i][j].y = lines[i][j]._y * ((radius - i * radius / 9) + (ratio * radius / 9));

// 				/// Simulation d'un effet 3D
// 				// Décallages des cercles en fonction des coordonnées souris
// 				lines[i][j].x = lines[i][j].x - mouseFactorX * radius / 16 * i;
// 				lines[i][j].y = lines[i][j].y - mouseFactorY * radius / 16 * i;

// 				// Epaisseur des traits en fonction de la coordonnées XY et de la position de la souris
// 				strokeRatio = lines[i][j].x / halfY * mouseFactorX + lines[i][j].y / halfY * mouseFactorY;

// 				lines[i][j].s = strokeWidth + strokeWidth * strokeRatio * (linesAmount - i/2) / 5;
// 			}
// 		}
// 	}

	// function computeDimensions()
	// {
	// 	width = element.getBoundingClientRect().width;
	// 	height = element.getBoundingClientRect().height;
	// 	halfX = width / 2;
	// 	halfY = height / 2;

	// 	windowHalfX = window.innerWidth / 2;
	// 	windowHalfY = window.innerHeight / 2;

	// 	radius = (height > width ? width : height) * 0.8 / 2;
	// 	strokeWidth = radius / 55;

	// 	screenFactor = (width + height) / 4.5
	// 	computeMouseFactor(true);

	// 	canvas.height = height;
	// 	canvas.width = width;
	// }

	// function computeMouseFactor(reset)
	// {
	// 	if(reset)
	// 	{
	// 		mouseFactorX = mouseX / windowHalfX;
	// 		mouseFactorY = mouseY / windowHalfY;
	// 	}
	// 	else {
	// 		mouseFactorX += ((mouseX / windowHalfX) - mouseFactorX) * 0.5;
	// 		mouseFactorY += ((mouseY / windowHalfY) - mouseFactorY) * 0.5;
	// 	}
	// }

// 	function render()
// 	{
// 		context.clearRect(0, 0, width, height);
// 		context.strokeStyle = color;
// 		context.lineCap = 'round';
// 		context.lineJoin = 'round';
		
// 		for(var i=0; i<linesAmount; i++)
// 		{
// 			for(var j=1; j<=verticesAmount; j++)
// 			{
// 				context.beginPath();
// 				context.lineWidth = lines[i][j].s >= 1 ? lines[i][j].s : 1;
// 				context.moveTo(halfX + lines[i][j-1].x, halfY + lines[i][j-1].y);
// 				context.lineTo(halfX + lines[i][j].x, halfY + lines[i][j].y);
// 				context.stroke();
// 			}
// 		}
// 	};

// 	document.addEventListener('mousemove', onDocumentMouseMove, false);
// 	window.addEventListener('resize', onWindowResize, false);

// 	function onWindowResize()
// 	{
// 		computeDimensions();
// 	}
	
// 	function onDocumentMouseMove(event)
// 	{
// 		mouseX = event.clientX - windowHalfX;
// 		mouseY = event.clientY - windowHalfY;
// 	}

// 	function animate(time)
// 	{
// 		requestAnimationFrame(animate);
// 		updateVertices(time);
// 		render();
// 	}
	
// 	if(window.requestAnimationFrame) {
// 		updateVertices(0);
// 		requestAnimationFrame(animate);
// 	}
// }