function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
document.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
        }
    }
}
  document.getElementById("myDropdown").addEventListener('click',function(event){
    event.stopPropagation();
});