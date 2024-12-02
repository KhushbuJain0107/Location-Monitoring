document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;

  try {
    const response = await fetch("https://minor-backend-l8uw.onrender.com/contactus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    const msgStatus = document.getElementById("contactMessageStatus");
    msgStatus.style.display = "block";
    if (response.ok) {
      msgStatus.innerText = data.message;

      // reset form fields
      document.getElementById("contactName").value = "";
      document.getElementById("contactEmail").value = "";
      document.getElementById("contactMessage").value = "";
    } else {
      msgStatus.innerText = data.message || "Submission failed";
    }
  } catch (err) {
    msgStatus.style.color = "red";
    msgStatus.style.backgroundColor = "white";
    msgStatus.innerText = " * An error occurred while submitting your message.";
  }
});
