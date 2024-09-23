const form = document.getElementById('signinForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const flag=0
    if (username === '' || password === '') {
        alert('Please fill in all fields.');
        flag+=1
    } else if(!checkusername(username))
        {
          alert("Username Does't strat with number!!!!")
          flag+=1
          return;
        }
        else if(password.length<8)
        {
          alert("Password Length is minimum 8 charcters!!!")
          flag+=1
          return;
        }
        if(flag==0)
        {
          window.location.href="dashboard.html";
        }
});
function checkusername(username)
{
  const regex = /^[A-Za-z]/;
  return regex.test(username);
}
