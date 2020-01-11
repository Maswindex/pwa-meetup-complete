let cacheName = 'v2';
let cacheFiles = [
    './',
    './index.html',
    './js/2048.js',
    './js/app.js',
    './images/app_icon.png',
    './images/apple-touch-icon.png',
    './images/app_icon_large.png',
    './images/right_arrow.png',
    './images/left_arrow.png',
    './images/up_arrow.png',
    './images/down_arrow.png',
    './css/2048.css',
    'https://cdn.jsdelivr.net/npm/vue',
    'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.6.1/js/mdb.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.6/css/mdb.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css',
    'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
];

// START part 2
self.addEventListener('install', function(event) {
    console.log("[ServiceWorker] Installed");
// END part 2

    // START part 5
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log("[ServiceWorker] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
    //END part 5
});

// START part 3
self.addEventListener('activate', function(event) {
    console.log("[ServiceWorker] Activated");
// END part 3


    // START part 6
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {

                if (thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] Removed Cached Files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
    // END part 6
});


// START part 4
self.addEventListener('fetch', function(event) {
    console.log("[ServiceWorker] Fetching", event.request.url);
// END part 4



    // START of part 7
    event.respondWith(

        caches.match(event.request).then(function(response) {
            if (response)
            {
                console.log("[ServiceWorker] Found in cache", event.request.url);
                return response;
            }

            //include line below with 7 commented out for 8
            //return fetch(event.request);

            let requestClone = event.request.clone();

            fetch(requestClone)
                .then(function(response) {
                    if(!response)
                    {
                        console.log("[ServiceWorker] No response from fetch");
                        return response;
                    }

                    let responseClone = response.clone();

                    caches.open(cacheName).then(function(cache) {
                        cache.put(event.request, responseClone);
                        return response;
                    });
                })
                .catch(function(err) {
                    console.log("[ServiceWorker] Error fetching and caching data. ");
                })


        })
    )
    // END part 7
});