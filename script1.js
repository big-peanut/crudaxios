// Function to add an expense
function addExpense(event) {
    event.preventDefault();

    const amountInput = document.getElementById('amount');
    const descriptionInput = document.getElementById('description');
    const categoryInput = document.getElementById('category');

    const amount = amountInput.value;
    const description = descriptionInput.value;
    const category = categoryInput.value;

    // Create a new expense object
    const expense = {
        amount: amount,
        description: description,
        category: category
    };

    //var expenseId = new Date().getTime().toString();

    // Store the expense object in local storage with the generated ID
    //localStorage.setItem(expenseId, JSON.stringify(expense));
    axios.post("https://crudcrud.com/api/c91cc6c401074882aa717b504f4b1fe3/expenseData",expense)
        .then((res)=>res)
        .catch((err)=>console.log(err))

    // Clear the input fields
    amountInput.value = '';
    descriptionInput.value = '';

    // Refresh the expense table
    displayExpenses();
}

// Function to delete an expense
function deleteExpense(expenseId) {
    // Remove the expense from local storage
    localStorage.removeItem(expenseId);

    // Refresh the expense table
    displayExpenses();
}

// Function to edit an expense
function editExpense(expenseId) {
    const expense = JSON.parse(localStorage.getItem(expenseId));

    // Prompt the user to enter the updated values
    const updatedAmount = prompt('Enter the updated amount:', expense.amount);
    const updatedDescription = prompt('Enter the updated description:', expense.description);
    const updatedCategory = prompt('Enter the updated category:', expense.category);

    // Update the expense object
    expense.amount = updatedAmount;
    expense.description = updatedDescription;
    expense.category = updatedCategory;

    // Update the expense in local storage
    localStorage.setItem(expenseId, JSON.stringify(expense));

    // Refresh the expense table
    displayExpenses();
}

// Function to display the expenses
function displayExpenses() {
    const tableBody = document.querySelector('#expenseTable tbody');
    tableBody.innerHTML = '';
    axios.get("https://crudcrud.com/api/c91cc6c401074882aa717b504f4b1fe3/expenseData")
        .then((res)=>res)
        .catch((err)=>console.log(err))

    // Iterate over each entry in local storage
    for (let i = 0; i < res.data.length; i++) {
        //const expenseId = localStorage.key(i);
        //const expense = JSON.parse(localStorage.getItem(expenseId));
        const expense=res.data[i]

        const row = document.createElement('tr');

        const amountCell = document.createElement('td');
        amountCell.textContent = expense.amount;
        row.appendChild(amountCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = expense.description;
        row.appendChild(descriptionCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = expense.category;
        row.appendChild(categoryCell);

        const actionCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editExpense(expenseId));
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteExpense(expenseId));
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        tableBody.appendChild(row);
    }
}



// Initial display of expenses
displayExpenses();

// Submit event listener for the expense form
const expenseForm = document.getElementById('expenseForm');
expenseForm.addEventListener('submit', addExpense);
