const homeBtnEl = document.getElementById('home-btn');


//if location = '/' dont reload the page. Otherwise return to '/'

homeBtnEl.addEventListener('click', function (e) {
    e.preventDefault();
    if (location.pathname === '/') {
        return;
    } else {
        document.location.replace('/');
    }
});