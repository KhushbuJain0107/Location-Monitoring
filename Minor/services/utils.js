const loggedElement = `<a href="dashboard.html" target="_blank"><img class="usericonlogo" src="./img/usericon.webp" alt="user icon"></a>`;

const notLoggedElement = `<a href="sign.html" target="_blank"><button class="secondary-btn">Sign In</button></a>`

const renderLoginState = document.getElementById("renderLoginState");

if(localStorage.getItem("isLoggedin")) {
  renderLoginState.innerHTML = loggedElement;
} else {
  renderLoginState.innerHTML = notLoggedElement;
}