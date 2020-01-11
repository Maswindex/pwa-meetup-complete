
// START part 1
if ('serviceWorker' in navigator)
{
    navigator.serviceWorker
        .register('./sw.js', { scope: './'})
        .then(function(registration) {
            console.log('Service Worker registered');
        })
        .catch(function(err) {
            console.log('Service worker failed to register.', err);
        })
}
else
{
    console.log('No service worker in navigator.')
}

//END part 1