function high() {
  let con_count = parseInt(localStorage.getItem("con_count")); // Get the number of contacts
  let account_ids = []; // Initialize an array to store unique account IDs
  let max_Acc_Id = 0; // Initialize the maximum account ID

  // Iterate over each contact
  for (let j = 1; j <= con_count; j++) {
    let Contact = localStorage.getItem("con_list" + j); // Get contact information
    Contact = JSON.parse(Contact); // Parse the contact JSON data

    // Assuming Contact.Allaccountarr is an array of account information
    if (Contact) {
      // Iterate over each account in the contact's account array
      Contact.forEach((element) => {
        // Update max_Acc_Id if the current account ID is greater
        let c_account_id = parseInt(element.ac_id);
        if (max_Acc_Id < c_account_id) {
          max_Acc_Id = c_account_id; // Set the new maximum account ID
        }
        // Add the account ID to the array if it's not already present
        if (!account_ids.includes(c_account_id)) {
          account_ids.push(c_account_id);
        }
      });
    }
  }

  console.log(max_Acc_Id); // Log the maximum account ID to the console
  console.log(account_ids); // Log the array of unique account IDs
  addvalues(account_ids); // Pass the array of unique account IDs to the addvalues function
}

high();

function addvalues(account_ids) {
  let con_count = parseInt(localStorage.getItem("con_count"));
  let arr = [];

  account_ids.forEach((i) => {
    // Loop through the unique account IDs
    let total = 0;
    let Account_Name = "";

    for (let j = 1; j <= con_count; j++) {
      let Contact = localStorage.getItem("con_list" + j);
      Contact = JSON.parse(Contact);

      // Assuming Contact.Allaccountarr is an array of account information
      if (Contact) {
        Contact.forEach((element) => {
          if (element.ac_id == i) {
            Account_Name = element.ac_name;
            if (element.type == "send") {
              total -= parseFloat(element.amount);
            } else {
              total += parseFloat(element.amount);
            }
          }
        });
      }
    }

    let data = {
      Name: Account_Name,
      Id: i,
      Amount: total,
    };

    arr.push(data);
  });

  console.log(arr);
  updateaccount(arr);
}

function updateaccount(arr) {
    arr.forEach((element) => {
      let account = localStorage.getItem("aco" + element.Id);
      if (account) {
        account = JSON.parse(account);
  
        let data = {
          name: account.name,
          initial: account.initial,
          total: parseFloat(account.initial) + parseFloat(element.Amount),
          id: account.id,
        };
        localStorage.setItem("aco" + element.Id, JSON.stringify(data));
      } 
      else {
        let data = {
          name: element.Name,
          initial: 0,
          total: parseFloat(element.Amount),
          id: element.Id,
        };
        localStorage.setItem("aco" + element.Id, JSON.stringify(data));
      }
    });
  }
  
