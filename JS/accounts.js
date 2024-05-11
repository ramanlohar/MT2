document.addEventListener("DOMContentLoaded", () => {
    loadu_accounts();
});

document.getElementById("User_Home").addEventListener("click", () => {
    window.location.href = "Home.html";
});

document.getElementById("App_Account").addEventListener("click", () => {
    window.location.href = "userinfo.html";
});

// document.getElementById("User_Account").addEventListener("click", () => {
//     window.location.href = "Accounts.html";
// });

let account_section_table = document.querySelector("#account_section_table");
let savebtn = document.getElementById("savebtn");

savebtn.addEventListener("click", () => {
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");

    if (name.value !== "" && amount.value !== "") {
        let aco_count = localStorage.getItem("aco_count") || 0;
        aco_count++;
        localStorage.setItem("aco_count", aco_count);

        let data = {
            name: name.value,
            initial: amount.value,
            total: amount.value,
            id: aco_count
        };

        localStorage.setItem("aco" + aco_count, JSON.stringify(data));
        hidePopup();
        loadu_accounts();
    } else {
        document.getElementById("errormsg").innerHTML = "Please Enter Name Or amount.";
    }
});

function loadu_accounts() {
    let total_amount = 0;
    account_section_table.innerHTML = `
        <tr>
            <th>Account Name</th>
            <th>Total Amount</th>
            <th>Initial Amount</th>
            <th>Edit</th>
        </tr>
    `;

    for (let i = 1; i <= localStorage.getItem("aco_count"); i++) {
        let u_accountData = localStorage.getItem("aco" + i);

        if (u_accountData) {
            let u_account = JSON.parse(u_accountData);
            let row = document.createElement("tr");

            row.innerHTML = `                
                <td>${u_account.name}</td>
                <td>${fixToTwoDecimalPlaces(u_account.total)}</td>
                <td>${fixToTwoDecimalPlaces(u_account.initial)}</td>
                <td class="edit_td">
                    <button class="delete" data-id="${u_account.id}"><i class="fa-solid fa-trash-can"></i></button>
                    <button class="edit_btn" data-id="${u_account.id}"><i class="fa-solid fa-file-pen"></i></button>
                </td>
            `;

            total_amount += parseFloat(u_account.total);

            account_section_table.appendChild(row);

            // Add event listener to the delete button
            row.querySelector('.delete').addEventListener('click', () => {
                deleteu_account(u_account.id);
            });

            // Add event listener to the edit button
            row.querySelector('.edit_btn').addEventListener('click', () => {
                editu_account(u_account.id);
            });
        }
    }
    document.getElementById("total_amount_a").innerHTML = "Amount of All Accounts : " + fixToTwoDecimalPlaces(total_amount);
}

function deleteu_account(id) {
    // Create a custom confirmation popup
    showConfirmationPopup("Are you sure you want to delete this account?", () => {
        // If user confirms, remove the account from localStorage and reload accounts
        localStorage.removeItem('aco' + id);
        loadu_accounts();
    });
}

function showConfirmationPopup(message, callback) {
    // Create overlay
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Create confirmation popup
    let confirmationPopup = document.createElement('div');
    confirmationPopup.classList.add('confirmation-popup');

    let content = `
        <p>${message}</p>
        <button id="confirmBtn">Yes</button>
        <button id="cancelBtn2">No</button>
    `;

    confirmationPopup.innerHTML = content;
    document.body.appendChild(confirmationPopup);

    // Add event listener to confirm button
    let confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.addEventListener('click', () => {
        callback(); // Call the callback function if user confirms
        hideConfirmationPopup(); // Close the confirmation popup
    });

    // Add event listener to cancel button
    let cancelBtn = document.getElementById('cancelBtn2');
    cancelBtn.addEventListener('click', () => {
        hideConfirmationPopup(); // Close the confirmation popup if user cancels
    });

    // Close popup when clicking outside of it
    overlay.addEventListener('click', hideConfirmationPopup);
}

function hideConfirmationPopup() {
    let overlay = document.querySelector('.overlay');
    let confirmationPopup = document.querySelector('.confirmation-popup');

    if (overlay && confirmationPopup) {
        overlay.remove();
        confirmationPopup.remove();
    }
}


function editu_account(id) {
    let u_accountKey = "aco" + id;
    let u_accountData = localStorage.getItem(u_accountKey);

    if (u_accountData) {
        let u_account = JSON.parse(u_accountData);
         // Show the popup
         showEditPopup();

        // Check if the elements exist before setting their values
        let editNameInput = document.getElementById("edit_name");
        let editAmountInput = document.getElementById("edit_amount");

        if (editNameInput && editAmountInput) {
            editNameInput.value = u_account.name;
            editAmountInput.value = u_account.initial;
           

            // Listen for save button click
            document.getElementById("edit_savebtn").addEventListener("click", () => {
                saveEditedAccount(id);
            });
        } else {
            console.error("Edit name or amount input elements not found.");
        }
    }
}


function saveEditedAccount(id) {
    let name = document.getElementById("edit_name").value;
    let amount = document.getElementById("edit_amount").value;

    if (name !== "" && amount !== "") {
        let u_accountKey = "aco" + id;
        let u_accountData = localStorage.getItem(u_accountKey);

        let totalamount = JSON.parse(u_accountData);

        if (u_accountData) {
            let u_account = JSON.parse(u_accountData);
            u_account.name = totalamount.name;
            u_account.initial = amount;
            u_account.total = totalamount.total;
            localStorage.setItem(u_accountKey, JSON.stringify(u_account));
            hideEditPopup();
            loadu_accounts();
            window.location.reload();
        }
    } else {
        document.getElementById("edit_errormsg").innerHTML = "Please enter name and amount.";
    }
}

function showEditPopup() {
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    let popup = document.createElement('div');
    popup.classList.add('edit-popup');

    let content = `
        <h2>Edit Account</h2>
        <form id="editForm">
            <label for="edit_name">Name:</label>
            <input type="text" id="edit_name" name="edit_name" readonly>
            <label for="edit_amount">Amount:</label>
            <input type="text" id="edit_amount" name="edit_amount" required>
            <p id="edit_errormsg" class="error"></p>
            <button type="button" id="edit_savebtn">Update</button>
        </form>
    `;

    popup.innerHTML = content;
    document.body.appendChild(popup);

    // Close popup and overlay when clicking outside of it
    overlay.addEventListener('click', () => {
        hideEditPopup();
    });
}


function hideEditPopup() {
    let overlay = document.querySelector('.overlay');
    let popup = document.querySelector('.edit-popup');

    if (overlay && popup) {
        overlay.remove();
        popup.remove();
    }
}

function fixToTwoDecimalPlaces(number) {
    return parseFloat(number).toFixed(2);
}

document.getElementById("User_Account").addEventListener("click", () => {
    window.location.href = "Accounts.html";
});
