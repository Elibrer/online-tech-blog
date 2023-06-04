const username = document.querySelector('#username-signup')
const email = document.querySelector('#email-signup')
const password = document.querySelector('#password-signup')
const signupCloseButtons = document.querySelectorAll('.signup-close');
const postSelector = document.querySelectorAll('.blog-post');

const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};


const saveUser = async (newUser) => {

  return await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  signupModal.style.display = "block";

  const signupModalSubmit = document.getElementById("signup-submit");
  signupModalSubmit.onclick = async function () {
    const newUsername = username.value.trim();
    const newEmail = email.value.trim();
    const newPassword = password.value.trim();

    if (username && email && password) {
      console.log(newUsername, newEmail, newPassword)
      const newUser = {
        username: newUsername,
        email: newEmail,
        password: newPassword
      }
      
      const response = await saveUser(newUser);

      if (response.ok) {
        alert('Account created! Please sign in.')
        clearModal();
      } else {
        alert('Please fill out all fields.');
      }

    };
  }
};

const clearModal = () => {
  signupModal.style.display = "none";
  username.value = '';
  email.value = '';
  password.value = '';
}



const signupModal = document.querySelector("#signup-modal");
if (signupModal !== null) {
  clearModal();
}
signupCloseButtons.forEach(button => {
  button.addEventListener('click', clearModal);
});


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('#signup-link').addEventListener('click', signupFormHandler);
