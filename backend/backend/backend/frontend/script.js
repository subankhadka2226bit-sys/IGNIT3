const socket = io("http://localhost:5000");
let token = null;

async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  alert(data.message || data.error);
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    document.getElementById("auth").style.display = "none";
    document.getElementById("chatUI").style.display = "block";
    alert(`Welcome ${data.name}`);
  } else {
    alert(data.error);
  }
}

function sendMessage() {
  const input = document.getElementById("msgInput");
  const msg = input.value;
  socket.emit("sendMessage", msg);
  input.value = "";
}

socket.on("receiveMessage", (msg) => {
  const div = document.createElement("div");
  div.innerText = msg;
  document.getElementById("messages").appendChild(div);
});
