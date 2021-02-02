function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
  document.getElementById("myDropdown").addEventListener('click',function(event){
    event.stopPropagation();
});

document.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
        }
    }
}

var bell = document.getElementById("bell");
var content = document.getElementById("bell-notifications");

bell.onclick = function() {
    if(content.className == "bell-notifications") {
        content.className = "";
    } else {
        content.className = "bell-notifications";
    }
}
