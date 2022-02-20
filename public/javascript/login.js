async function loginHandler(event) {
    event.preventDefault();
  
    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/'); //redirect to dash once logged in 
      } else {
        alert(response.statusText);
      }
    }
}

async function signupHandler(event) {
    event.preventDefault();

    // getting data from the form
    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({ //giving the server username & pass to store
            username,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        }); 
    // check the response status (error handling)
    if (response.ok) {
        console.log('successful signup');
        document.location.replace('/dashboard/'); //redirect to dash once signed up
      } else {
        alert(response.statusText);
      }
    }
}

document.getElementById('login-btn').addEventListener('click', loginHandler);
document.getElementById('signup-btn').addEventListener('click', signupHandler);
 