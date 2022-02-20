async function logoutHandler() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/'); //go back to homepage once user logs out
    } else {
      alert(response.statusText);
    }
  }
  
  document.getElementById('logout-btn').addEventListener('click', logoutHandler);