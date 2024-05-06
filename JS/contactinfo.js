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

    // Create a transaction object
    const transaction = {
        type: transactionType.value,
        actype: actype,
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
    loadtransactioninfo()
});




let transaction_section = document.getElementById("transaction_section");

function loadtransactioninfo() {
    transaction_section.innerHTML = "";

    let active_con = localStorage.getItem("active_con");
    let conlistmsgs = localStorage.getItem("con_list" + active_con);

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

    // Display messages with grouped dates
    for (const date in groupedMessages) {
        if (groupedMessages.hasOwnProperty(date)) {
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
                <div class="msg_box ${ element.type + "d"}">
                <h4 class="motive">${element.motive}</h4>
                <h4 class="amount">${element.amount}</h4>
                <h4 class="accounttype">${element.actype}</h4>
                <p class="time">${getTimeFromDate(element.date)}</p>
                </div>
                `;

                transaction_section.appendChild(cdiv);
            });
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


// function getDateFromUniqueId(uniqueId) {
//     // Extract the timestamp part from the unique ID
//     const timestampStr = uniqueId.replace('ID_', '');

//     // Convert the timestamp string back to a number
//     const timestamp = parseInt(timestampStr);

//     // Create a Date object using the timestamp
//     const date = new Date(timestamp);

//     return date;
// }

// // Example usage:
// const uniqueId = 'ID_1643094712356'; // Example unique ID
// const dateFromUniqueId = getDateFromUniqueId(uniqueId);
// console.log(dateFromUniqueId); // Output: Wed Jan 25 2022 11:31:52 GMT+0000 (Coordinated Universal Time)

function loadacoptions(){
    let actype = document.getElementById("actype");

    let aco_count = localStorage.getItem("aco_count")
    for (let i = 1; i <= aco_count; i++) {
        let aconame = localStorage.getItem("aco"+i);           
        if(aconame){
            aconame = JSON.parse(aconame);  
            
            let op = document.createElement("option");
            op.value = aconame.name;
            op.textContent = aconame.name;
            
            actype.appendChild(op);
        }
    }


}

loadacoptions();
loadtransactioninfo()