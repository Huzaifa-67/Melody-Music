// Sign Up Form Submission
// document.getElementById('signUpForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const username = document.getElementById('signUpUser').value;
//     const password = document.getElementById('signUpPass').value;
//     const confirmPassword = document.getElementById('signUpconfirmPass').value;
//     const email = document.getElementById('signUpEmail').value;

//     if (password !== confirmPassword) {
//         alert('Passwords do not match!');
//         return;
//     }

//     const userData = {
//         username: username,
//         password: password,
//         email: email
//     };

//     localStorage.setItem('user_' + username, JSON.stringify(userData));
//     console.log('User signed up:', userData);
//     alert('Signup successful! Data stored in local storage.');
// });

// // Sign In Form Submission
// document.getElementById('signInForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const username = document.getElementById('signInUser').value;
//     const password = document.getElementById('signInPass').value;

//     const storedUserData = localStorage.getItem('user_' + username);
//     if (storedUserData) {
//         const userData = JSON.parse(storedUserData);
//         if (userData.password === password) {
//             console.log('Login successful for username:', username);
//             alert('Login successful!');
//         } else {
//             console.log('Incorrect password for user:', username);
//             alert('Incorrect password!');
//         }
//     } else {
//         console.log('No user found with username:', username);
//         alert('No user found with this username!');
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    let myData = JSON.parse(localStorage.getItem('students')) || [];

    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signInUser').value.trim();
        const password = document.getElementById('signInPass').value.trim();

        if (validateSignIn(username, password)) {
            const userFound = myData.some(user => user.username === username && user.password === password);

            if (userFound) {
                alert('Login successful!');
                signInForm.reset();
            } else {
                alert('User not found');
            }
        }
    });

    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signUpUser').value.trim();
        const password = document.getElementById('signUpPass').value.trim();
        const confirmPassword = document.getElementById('signUpconfirmPass').value.trim();
        const email = document.getElementById('signUpEmail').value.trim();

        if (validateSignUp(username, password, confirmPassword, email)) {
            myData.push({ username, password, email });
            localStorage.setItem('students', JSON.stringify(myData));
            alert('Sign up successful!');
            signUpForm.reset();
        }
    });

    function validateSignIn(username, password) {
        let valid = true;
        clearErrors(signInForm);

        if (username.length < 3) {
            showError('signInUser', 'Username must be at least 3 characters long');
            valid = false;
        }

        if (password.length < 6) {
            showError('signInPass', 'Password must be at least 6 characters long');
            valid = false;
        }

        return valid;
    }

    function validateSignUp(username, password, confirmPassword, email) {
        let valid = true;
        clearErrors(signUpForm);

        if (username.length < 3) {
            showError('signUpUser', 'Username must be at least 3 characters long');
            valid = false;
        }

        if (password.length < 6) {
            showError('signUpPass', 'Password must be at least 6 characters long');
            valid = false;
        }

        if (password !== confirmPassword) {
            showError('signUpconfirmPass', 'Passwords do not match');
            valid = false;
        }

        const emailRE = /^[a-zA-Z0-9_]{3,}[@][a-z]{5}[.][a-z]{3}$/;
        if (!emailRE.test(email)) {
            showError('signUpEmail', 'Please enter a valid email address');
            valid = false;
        }

        return valid;
    }

    function clearErrors(form) {
        const errorElements = form.querySelectorAll('.error');
        errorElements.forEach(errorElement => errorElement.textContent = '');
    }

    function showError(inputId, message) {
        const inputElement = document.getElementById(inputId);
        let errorElement = inputElement.nextElementSibling;

        // Create an error element if it doesn't exist
        if (!errorElement || !errorElement.classList.contains('error')) {
            errorElement = document.createElement('small');
            errorElement.classList.add('error');
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }

        errorElement.textContent = message;
        errorElement.style.color = 'red';
    }
});

