let contact_section = document.getElementById("contact_section");
let savebtn = document.getElementById("savebtn");

savebtn.addEventListener("click",()=>{
    let  name = document.getElementById("name");
    let  mobile = document.getElementById("mobile");
    let  email = document.getElementById("email");

    if(name.value !== "" && mobile.value !== ""){
        let con_count = localStorage.getItem("con_count");
        if (con_count){
            con_count++;
            localStorage.setItem("con_count", con_count);
        }else{     
            con_count = 1       
            localStorage.setItem("con_count", con_count);
        }

        let data = {
            name: name.value,
            mobile: mobile.value,
            email: email.value || "",
            id: con_count
        };

        localStorage.setItem("con"+con_count, JSON.stringify(data));
        hidePopup();
        loadcontacts();
    }else{
        document.getElementById("errormsg").innerHTML = "Please Enter Name Or Mobile.";
    }
});

function loadcontacts() {
    contact_section.innerHTML = "";

    let con_count = localStorage.getItem("con_count");
    for (let i = 1; i <= con_count; i++) {
        let contactKey = "con" + i;
        let contactData = localStorage.getItem(contactKey);
        
        if(contactData){
            let contact = JSON.parse(contactData);
            let cdiv = document.createElement("div");
            cdiv.classList.add("contact");
            cdiv.innerHTML = `<div><i class="fa-solid fa-circle-user"></i> ${contact.name}</div>
            <div>
                <button class="delete dn" data-id="${contact.id}"><i class="fa-solid fa-trash-can"></i></button>
                <button class="edit dn" data-id="${contact.id}"><i class="fa-solid fa-file-pen"></i></button>
            </div>`;
            contact_section.appendChild(cdiv);
        }
    }

    // Add event listeners for edit and delete buttons
    let deleteButtons = document.querySelectorAll('.delete');
    let editButtons = document.querySelectorAll('.edit');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            let contactId = button.getAttribute('data-id');
            deleteContact(contactId);
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            let contactId = button.getAttribute('data-id');
            editContact(contactId);
        });
    });
}

function deleteContact(id) {
    // Remove the contact from localStorage
    localStorage.removeItem('con' + id);
    // Reload contacts
    loadcontacts();
}

function editContact(id) {
    // You can implement edit functionality here, e.g., open a popup with the contact details pre-filled for editing
    console.log("Editing contact with ID: " + id);
}

let edit_contacts = document.getElementById("edit_contacts");
edit_contacts.addEventListener("click", () => {
    let all_con = document.querySelectorAll(".delete");
    all_con.forEach(Element => {
        Element.classList.toggle("dn");
    });
});



loadcontacts();
