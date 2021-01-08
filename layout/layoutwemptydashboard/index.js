const mainMenu = document.querySelector('.menu');
const burgerMenu = document.querySelector('.burger-menu');

burgerMenu.addEventListener('click', () => {
    mainMenu.classList.toggle('menu--active');
    burgerMenu.classList.toggle('burger-menu--active');
});