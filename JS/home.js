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
        let uniqueId = generateUniqueId();
        let data = {
            name: name.value,
            mobile: mobile.value,
            email: email.value || "",
            id: con_count,
            staketime: uniqueId
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
    let contacts = [];
    for (let i = 1; i <= con_count; i++) {
        let contactKey = "con" + i;
        let contactData = localStorage.getItem(contactKey);
        
        if(contactData){
            let contact = JSON.parse(contactData);
            contacts.push(contact);
        }
    }

    contacts.sort((a, b) => {
        // Extract timestamp part and convert to numbers
        const timestampA = parseInt(a.staketime.replace('ID_', ''));
        const timestampB = parseInt(b.staketime.replace('ID_', ''));
    
        // Compare timestamps
        return timestampB - timestampA; // Descending order (newest first)
    });
    
    

    // Display sorted contacts
    contacts.forEach(contact => {
        let cdiv = document.createElement("div");
        cdiv.classList.add("contact");
        
        cdiv.innerHTML = `<div class="co_contact"><i class="fa-solid fa-circle-user"></i> <div class="con_info_div"> <p class="p_name">${contact.name}</p> <p class="mobile_no">${formatMobileNumber(contact.mobile)}</p></div></div>
        <div>
            <button class="delete dn" data-id="${contact.id}"><i class="fa-solid fa-trash-can"></i></button>
            <button class="edit dn" data-id="${contact.id}"><i class="fa-solid fa-file-pen"></i></button>
        </div>`;
        cdiv.querySelector(".co_contact").addEventListener("click", () => {
            localStorage.setItem("active_con", contact.id);
            window.location.href = "contactinfo.html";
        });
        
        contact_section.appendChild(cdiv);
    });

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


document.getElementById("User_Account").addEventListener("click",()=>{
    window.location.href = "Accounts.html";
})


function formatMobileNumber(mobile) {
    let numericMobile = mobile.replace(/\D/g, '');

    if (numericMobile.length > 10) {
        numericMobile = numericMobile.startsWith('0') ? numericMobile.substring(1) : numericMobile;
        return numericMobile.substring(0, 10);
    } else {
        if (numericMobile.length === 10 || numericMobile.startsWith('91')) {
            return numericMobile;
        } else {
            numericMobile = numericMobile.startsWith('+91') ? numericMobile.substring(3) : numericMobile;
            numericMobile = numericMobile.startsWith('91') ? numericMobile.substring(2) : numericMobile;
            return numericMobile;
        }
    }
}

function generateUniqueId() {
    const timestamp = new Date().getTime(); // Get current time in milliseconds
    const uniqueId = timestamp; // Combine with a prefix (e.g., 'ID_')
    return uniqueId;
}




loadcontacts();
