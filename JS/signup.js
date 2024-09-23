document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const genre = document.getElementById('genre').value;
    const successMessage = document.getElementById('success-message');
    const flag=0
    if (!name || !email || !password || !genre) 
    {
      alert('Please fill in all fields');
      flag+=1
      return;
    }
    else if(!checkusername(name))
    {
      successMessage.textContent = 'Username not start with Number';
      successMessage.style.display = 'block';
      flag+=1
      return;
    }
    else if(password.length<8)
    {
      successMessage.textContent = 'Password Length is minimum 8 charcters';
      successMessage.style.display = 'block';
      flag+=1
      return;
    }
    if(flag==0)
    {
      window.location.href="dashboard.html";
    }
    document.getElementById('signup-form').reset();
  });
function checkusername(username)
{
  const regex = /^[A-Za-z]/;
  return regex.test(username);
}