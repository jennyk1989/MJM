async function loginByUser(event) {
    event.preventDefault();
  
    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
}

document.getElementById('login-btn').addEventListener('click', loginByUser);
