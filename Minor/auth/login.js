document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const identifier = document.getElementById("loginIdentifier").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch("https://minor-backend-l8uw.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        [identifier.includes("@") ? "email" : "mobile"]: identifier,
        password,
      }),
    });

    const data = await response.json();
    document.getElementById("signupMessage").style.display = "block";

    if (response.ok) {
      document.getElementById("signupMessage").innerText = " * " + data.message;
      // Redirect to user dashboard after successful login immediately
      localStorage.setItem("isLoggedin", true);
      localStorage.setItem("loggedUser", JSON.stringify({name: data.user.name, email: data.user.email, mobile: data.user.mobile}));
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("signupMessage").innerText = " * " + data.message || "Login failed";
    }
  } catch (err) {
    document.getElementById("signupMessage").innerText = "An error occurred";
  }
});