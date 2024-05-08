let Name = document.getElementById("name");
let mobile = document.getElementById("mobile");

let savebtn = document.getElementById("savebtn"); // Define the savebtn variable

// Function to load contact info
function loadinfo() {
    let active_con = localStorage.getItem("active_con");
    let contact = localStorage.getItem("con" + active_con);
    contact = JSON.parse(contact);
    Name.innerHTML = contact["name"];
    mobile.innerHTML = contact["mobile"];
}

loadinfo();

// Event listener for back button
document.getElementById("back").addEventListener("click", () => {
    window.location.href = "Home.html";
});

// JavaScript to handle highlighting when clicking on radio buttons
const sendRadio = document.getElementById('money-send');
const receiveRadio = document.getElementById('money-receive');
const sendLabel = document.getElementById('sendLabel');
const receiveLabel = document.getElementById('receiveLabel');

sendRadio.addEventListener('click', () => {
    sendLabel.classList.add('highlight');
    receiveLabel.classList.remove('highlight');
});

receiveRadio.addEventListener('click', () => {
    sendLabel.classList.remove('highlight');
    receiveLabel.classList.add('highlight');
});

savebtn.addEventListener("click", () => {
    
    const transactionType = document.querySelector('input[name="transaction-type"]:checked');
    const actype = document.getElementById("actype").value;
    const motive = document.getElementById("motive").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    const errormsgpopup = document.getElementById("errormsgpopup");

    // Check if any of the required fields are empty
    if (!transactionType) {
        errormsgpopup.innerHTML = "Please choose a transaction type";
        none();
        return;
    }
    if (!actype) {
        errormsgpopup.innerHTML = "Please choose an account type";
        none();
        return;
    }
    if (!motive) {
        errormsgpopup.innerHTML = "Please enter a motive";
        none();
        return;
    }
    if (!amount) {
        errormsgpopup.innerHTML = "Please enter an amount";
        none();
        return;
    }
    if (!date) {
        errormsgpopup.innerHTML = "Please choose a date";
        none();
        return;
    }

   function none(){
    setTimeout(() => {
        errormsgpopup.innerHTML = "";
    }, 1000);
   }

    const uniqueId = generateUniqueId();

    let acname = localStorage.getItem("aco"+actype);
    acname = JSON.parse(acname);

    // Create a transaction object
    const transaction = {
        type: transactionType.value,
        ac_id: actype,
        ac_name:acname.name,
        motive: motive,
        amount: amount,
        date: date,
        id: uniqueId
    };

    let active_con = localStorage.getItem("active_con");
    let conlist = localStorage.getItem("con_list" + active_con);

    let array = [];

    if (conlist) {
        array = JSON.parse(conlist); // Parse existing data
    }

    array.push(transaction); // Add new transaction

    localStorage.setItem("con_list" + active_con, JSON.stringify(array)); // Save updated data
    updatestaketime(active_con);
    hidePopup();
    loadtransactioninfo()
});




let transaction_section = document.getElementById("transaction_section");

function loadtransactioninfo() {
    let total_amount = 0;
    transaction_section.innerHTML = "";

    let active_con = localStorage.getItem("active_con");
    let conlistmsgs = localStorage.getItem("con_list" + active_con);

    if (!conlistmsgs) {
        // Handle case where there are no transactions
        return;
    }

    conlistmsgs = JSON.parse(conlistmsgs);

    // Group messages by date
    const groupedMessages = {};
    conlistmsgs.forEach(element => {
        const date = new Date(element.date).toDateString(); // Get the date portion only
        if (!groupedMessages[date]) {
            groupedMessages[date] = [];
        }
        groupedMessages[date].push(element);
    });

    // Sort dates in ascending order
    const sortedDates = Object.keys(groupedMessages).sort((a, b) => new Date(a) - new Date(b));

    // Display messages with grouped dates
    sortedDates.forEach(date => {
        // Create date header
        let dateHeader = document.createElement("div");
        dateHeader.classList.add("date-header");
        dateHeader.textContent = date;
        transaction_section.appendChild(dateHeader);

        // Create message boxes for each date
        groupedMessages[date].forEach(element => {
            let cdiv = document.createElement("div");
            cdiv.classList.add(element.type);

            cdiv.innerHTML = `
            <div class="msg_box ${element.type + "d"}">
            <h4 class="motive">${element.motive}</h4>
            <h4 class="amount">${element.amount}</h4>
            <h4 class="accounttype">${element.ac_name}</h4>
            <p class="time">${getDateFromUniqueId(element.id)}</p>
            <p class="time">${getTimeFromUniqueId(element.id)}</p>
            </div>
            <button class="del_btn dn"><i class="fa-solid fa-trash-can"></i></button>
            `;

            if(element.type == "send"){
                total_amount -= parseFloat(element.amount);
            }else{
                total_amount += parseFloat(element.amount);
            }

            transaction_section.appendChild(cdiv);

                      

            // Add event listener to delete button
            const delBtn = cdiv.querySelector('.del_btn');
            delBtn.addEventListener('click', () => {
                deleteTransaction(element.id);
                loadtransactioninfo(); // Reload messages after deletion
            });
        });
    });

    document.getElementById("total_amount_p").innerHTML = `Net Amount is : ${total_amount}`
}



// Function to delete a transaction
// Function to delete a transaction
function deleteTransaction(id) {
    // Freeze background by adding an overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Disable scrolling on the background page
    document.body.style.overflow = 'hidden';

    // Create confirmation box elements
    const confirmationBox = document.createElement('div');
    confirmationBox.classList.add('confirmation-box');

    const confirmationMessage = document.createElement('p');
    confirmationMessage.textContent = "Are you sure you want to delete this transaction?";
    confirmationBox.appendChild(confirmationMessage);

    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = "Confirm";
    confirmBtn.classList.add('confirm-btn');
    confirmationBox.appendChild(confirmBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add('cancel-btn');
    confirmationBox.appendChild(cancelBtn);

    // Append confirmation box to document body
    document.body.appendChild(confirmationBox);

    // Event listener for confirm button
    confirmBtn.addEventListener('click', () => {
        removeConfirmationBox();
        removeOverlay();
        document.body.style.overflow = ''; // Re-enable scrolling
        performDelete(id);
    });

    // Event listener for cancel button
    cancelBtn.addEventListener('click', () => {
        removeConfirmationBox();
        removeOverlay();
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Event listener for clicking anywhere on the page to close the confirmation box
    overlay.addEventListener('click', () => {
        removeConfirmationBox();
        removeOverlay();
        document.body.style.overflow = ''; // Re-enable scrolling
    });
}

// Function to remove the confirmation box from the document
function removeConfirmationBox() {
    const confirmationBox = document.querySelector('.confirmation-box');
    if (confirmationBox) {
        confirmationBox.remove();
    }
}

// Function to remove the overlay from the document
function removeOverlay() {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Function to perform the actual deletion after confirmation
function performDelete(id) {
    let active_con = localStorage.getItem("active_con");
    let conlist = localStorage.getItem("con_list" + active_con);

    if (conlist) {
        let array = JSON.parse(conlist); // Parse existing data
        // Find index of transaction with given id
        const index = array.findIndex(transaction => transaction.id === id);
        if (index !== -1) {
            array.splice(index, 1); // Remove transaction from array
            localStorage.setItem("con_list" + active_con, JSON.stringify(array)); // Save updated data
            updatestaketime(active_con)
            loadtransactioninfo(); // Reload transactions after deletion
        }
    }
}





function getTimeFromDate(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}


function generateUniqueId() {
    const timestamp = new Date().getTime(); // Get current time in milliseconds
    const uniqueId = 'ID_' + timestamp; // Combine with a prefix (e.g., 'ID_')
    return uniqueId;
}


// Function to get formatted date from unique ID
function getDateFromUniqueId(uniqueId) {
    // Extract the timestamp part from the unique ID
    const timestampStr = uniqueId.replace('ID_', '');

    // Convert the timestamp string back to a number
    const timestamp = parseInt(timestampStr);

    // Create a Date object using the timestamp
    const date = new Date(timestamp);

    // Get individual date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();

    // Construct the formatted date string
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}

// Function to get formatted time from unique ID
function getTimeFromUniqueId(uniqueId) {
    // Extract the timestamp part from the unique ID
    const timestampStr = uniqueId.replace('ID_', '');

    // Convert the timestamp string back to a number
    const timestamp = parseInt(timestampStr);

    // Create a Date object using the timestamp
    const date = new Date(timestamp);

    // Get individual time components
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2); // Ensure two digits for minutes

    // Convert hours to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedHours = ('0' + hours).slice(-2); // Ensure two digits for hours

    // Construct the formatted time string
    const formattedTime = `${formattedHours}:${minutes}${ampm}`;

    return formattedTime;
}


function loadacoptions(){
    let actype = document.getElementById("actype");

    let aco_count = localStorage.getItem("aco_count")
    for (let i = 1; i <= aco_count; i++) {
        let aconame = localStorage.getItem("aco"+i);           
        if(aconame){
            aconame = JSON.parse(aconame);  
            
            let op = document.createElement("option");
            op.value = aconame.id;
            op.textContent = aconame.name;
            
            actype.appendChild(op);
        }
    }


}

let editbtn = document.getElementById("editbtn");
editbtn.addEventListener("click", () => {
    let all_del_btn = document.querySelectorAll(".del_btn");
    all_del_btn.forEach(btn => {
        btn.classList.toggle("dn");
    });
});

function updatestaketime(id) {
    let contact = localStorage.getItem("con" + id);
    contact = JSON.parse(contact);

    let uniqueId2 = generateUniqueId2();
    let data = {
        name: contact.name,
        mobile: contact.mobile,
        email: contact.email || "",
        id: contact.id,
        staketime: uniqueId2
    };

    localStorage.setItem("con" + id, JSON.stringify(data));
}


function generateUniqueId2() {
    const timestamp = new Date().getTime(); // Get current time in milliseconds
    const uniqueId = 'ID_' + timestamp; // Combine with a prefix (e.g., 'ID_')
    return uniqueId;
}


loadacoptions();
loadtransactioninfo()