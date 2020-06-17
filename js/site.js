window.onload = function() {
    let navigationMenuButton = document.getElementById('navigation-menu-button');
    let navigationBar = document.getElementById('navigation-bar');

    navigationMenuButton.addEventListener('click', function(){
        navigationBar.classList.toggle('is-active');
        navigationMenuButton.classList.toggle('is-active');
    });
}