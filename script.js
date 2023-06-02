
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get user input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;

    // Create an object to store the user details
    var userDetails = {
        name: name,
        email: email
    };

    axios.post("https://crudcrud.com/api/c91cc6c401074882aa717b504f4b1fe3/appointmentData",userDetails)
    .then((response)=>console.log(response))
    .catch((err)=>this.console.log(err))

    //var bookingId = new Date().getTime().toString();

    // Save the booking object to local storage with the unique ID
    //localStorage.setItem(bookingId, JSON.stringify(userDetails));

    // Clear the form inputs
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';


});
