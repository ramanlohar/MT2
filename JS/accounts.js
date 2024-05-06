document.addEventListener("DOMContentLoaded", () => {
    loadu_accounts();
});

document.getElementById("User_Home").addEventListener("click", () => {
    window.location.href = "Home.html";
});

let account_section_table = document.querySelector("#account_section_table");
let savebtn = document.getElementById("savebtn");

savebtn.addEventListener("click", () => {
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");

    if (name.value !== "" && amount.value !== "") {
        let aco_count = localStorage.getItem("aco_count");
        if (aco_count) {
            aco_count++;
            localStorage.setItem("aco_count", aco_count);
        } else {
            aco_count = 1;
            localStorage.setItem("aco_count", aco_count);
        }

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
    account_section_table.innerHTML = `
    <tr>
        <th>Account Name</th>
        <th>Total Amount</th>
        <th>Initial Amount</th>
        <th>Edit</th>
    </tr>
`;

    let aco_count = localStorage.getItem("aco_count");
    for (let i = 1; i <= aco_count; i++) {
        let u_accountKey = "aco" + i;
        let u_accountData = localStorage.getItem(u_accountKey);

        if (u_accountData) {
            let u_account = JSON.parse(u_accountData);
            let row = document.createElement("tr");

            row.innerHTML = `                
                <td>${u_account.name}</td>
                <td>${u_account.initial}</td>
                <td>${u_account.total}</td>
                <td><button class="delete" data-id="${u_account.id}"><i class="fa-solid fa-trash-can"></i></button></td>
            `;
            account_section_table.appendChild(row);

            // Add event listener to the delete button
            let deleteButton = row.querySelector('.delete');
            deleteButton.addEventListener('click', () => {
                deleteu_account(u_account.id);
            });
        }
    }
}

function deleteu_account(id) {
    // Remove the account from localStorage
    localStorage.removeItem('aco' + id);
    // Reload accounts
    loadu_accounts();
}

function editu_account(id) {
    // You can implement edit functionality here, e.g., open a popup with the account details pre-filled for editing
    console.log("Editing account with ID: " + id);
}

let edit_u_accounts = document.getElementById("edit_u_accounts");
edit_u_accounts.addEventListener("click", () => {
    let all_aco = document.querySelectorAll(".delete");
    all_aco.forEach(Element => {
        Element.classList.toggle("dn");
    });
});

document.getElementById("User_Account").addEventListener("click", () => {
    window.location.href = "Accounts.html";
});
