document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  const cookie = document.getElementById('cookie').value;

  const response = await fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email, cookie })
  });

  const result = await response.text();
  document.getElementById('status').innerText = result;
});
