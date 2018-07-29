var doCache = true;

var CACHE_NAME = 'thomso18beta08481201';

// Delete old caches
self.addEventListener('activate', event => {
	const currentCachelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys()
			.then(keyList =>
				Promise.all(keyList.map(key => {
					if (!currentCachelist.includes(key)) {
						return caches.delete(key);
					}
				}))
			)
	);
});

// This triggers when user starts the app
self.addEventListener('install', function(event) {
	if (doCache) {
		event.waitUntil(
			caches.open(CACHE_NAME)
				.then(function(cache) {
          return cache.addAll(
            [
			  '/',
			  '/index.html',

              '/css/font.css',
			  '/css/jquery.fullPage.css',
			  '/css/style.min.css',
			  'css/style.css',

              '/js/galaxy.js',
			  '/js/jquery.fullPage.js',
			  '/js/jssor.slider-27.1.0.min.js',
			  '/js/main.js',
			  '/asset/js/jquery.min.js',
			  '/asset/js/three.min.js',
			  '/asset/js/Tween.js',

			  '/brochure.html',
			  '/sponsors.html',
			  '/sponsorsform.html',
			  '/img/dsouza.jpg',
			  '/img/economical.png',
			  '/img/farhan.jpg',
			  '/img/nucleya.jpg',
			  '/img/palash.jpeg',
			  '/img/sonu.jpg',
			  '/img/stats.jpg',
			  '/img/sunidhi.jpg',
			  '/img/udit.jpg',

			  '/images/location.png',
			  '/images/logo.png',
			  '/images/phone.png',
			  '/images/web.png',
			  '/images/background.jpg',
			  
            ])
				})
				.catch(e => console.log(e))
		);
	}
});

// Here we intercept request and serve up the matching files
self.addEventListener('fetch', function(event) {
	if (doCache) {
		event.respondWith(
			caches.match(event.request).then(function(response) {
				return response || fetch(event.request);
			})
		);
	}
});
