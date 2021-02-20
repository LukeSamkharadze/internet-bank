const mainMenu = document.querySelector('.menu'),
  burgerMenu = document.querySelector('.burger-menu'),
  topNav = document.querySelector('.main-nav'),
  bottomNav = document.querySelector('.bottom-nav'),
  contentMain = document.querySelector('.content-main');

burgerMenu.addEventListener('click', () => {
  mainMenu.classList.toggle('menu--active');
  burgerMenu.classList.toggle('burger-menu--active');
});

let topNavHeight = topNav.clientHeight,
  bottomNavHeight = bottomNav.clientHeight;

contentMain.style.minHeight = topNavHeight + bottomNavHeight + 'px';

function myFunction() {
  document.getElementById('myDropdown').classList.toggle('show');
}
document.onclick = function (e) {
  if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById('myDropdown');
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
};
document
  .getElementById('myDropdown')
  .addEventListener('click', function (event) {
    event.stopPropagation();
  });
