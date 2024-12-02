document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('loggedUser')
    window.location.href = 'index.html';
});

const isLoggedin = localStorage.getItem('isLoggedin');
if(isLoggedin) {
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const updatedName = document.getElementById("updatedName");
  const updatedEmail = document.getElementById("updatedEmail");
  const updatedMobile = document.getElementById("updatedMobile");

  updatedName.placeholder = user.name;
  updatedEmail.placeholder = user.email;
  updatedMobile.placeholder = user.mobile;
}