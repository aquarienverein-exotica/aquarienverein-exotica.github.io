window.onload = function() {
    let navigationBar = document.getElementById('navigation-bar');
    let navigationMenuButton = document.getElementById('navigation-menu-button');

    let activeSubNavMenuItem = document.getElementById('active-sub-nav-menu-item');
    let subNavigationMenuList = document.getElementById('sub-navigation-menu-list');
    let subNavigationMenuButton = document.getElementById('sub-navigation-menu-button');
    
    if (subNavigationMenuButton !== null) {
        subNavigationMenuButton.addEventListener('click', function(){

            if (activeSubNavMenuItem.style.visibility == 'hidden'){
                activeSubNavMenuItem.style.visibility = 'unset';
            }
            else {
                activeSubNavMenuItem.style.visibility = 'hidden';
            }

            subNavigationMenuList.classList.toggle('is-active');
            subNavigationMenuButton.classList.toggle('is-active');
        });
    }
    
    navigationMenuButton.addEventListener('click', function(){
        navigationBar.classList.toggle('is-active');
        navigationMenuButton.classList.toggle('is-active');
    });
}