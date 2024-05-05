let Name = document.getElementById("name");
let mobile = document.getElementById("mobile");

function loadinfo(){
    let active_con = localStorage.getItem("active_con");

    let contact = localStorage.getItem("con"+active_con);

    contact = JSON.parse(contact);
    Name.innerHTML = contact["name"];
    mobile.innerHTML = contact["mobile"];
}

loadinfo();

document.getElementById("back").addEventListener("click",()=>{
    window.location.href = "Home.html";
})