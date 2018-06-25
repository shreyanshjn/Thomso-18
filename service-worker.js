// Flag for enabling cache in production
var doCache = true;

var CACHE_NAME = 'thomso18beta648648';

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

			  '/css/style.css',
              '/css/font.css',
			  '/css/jquery.fullPage.css',
			  '/css/style.min.css',

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
			  '/img/palash.jpg',
			  '/img/sonu.jpg',
			  '/img/stats.jpg',
			  '/img/sunidhi.jpg',
			  '/img/udit.jpg',

			  '/images/location.png',
			  '/images/logo.png',
			  '/images/phone.png',
			  '/images/web.png',
			  '/images/background.jpg',

			  '/img/01.jpg',
			  '/img/02.jpg',
			  '/img/03.jpg',
			  '/img/04.jpg',
			  '/img/06.jpg',
			  '/img/07.jpg',
			  '/img/08.jpg',
			  '/img/09.jpg',
			  '/img/10.jpg',
			  '/img/11.jpg',
			  '/img/12.jpg',
			  '/img/13.jpg',
			  '/img/14.jpg',
			  '/img/15.jpg',
			  '/img/16.jpg',
			  '/img/17.jpg',
			  '/img/18.jpg',
			  '/img/19.jpg',
			  '/img/20.jpg',
			  '/img/21.jpg',
			  '/img/22.jpg',
			  '/img/23.jpg',
			  '/img/24.jpg',
			  '/img/25.jpg',
			  '/img/26.jpg',
			  '/img/27.jpg',
			  '/img/28.jpg',
			  '/img/29.jpg',
			  '/img/30.jpg',
			  '/img/31.jpg',
			  '/img/32.jpg'
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
