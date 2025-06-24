function toggleChat() {
  const chat = document.getElementById("chatWindow");
  chat.style.display = chat.style.display === "flex" ? "none" : "flex";
  if (chat.style.display === "flex") {
    chat.scrollTop = chat.scrollHeight;
  }
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  input.value = "";

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    const reply = getBotReply(message);
    appendMessage("bot", reply);
  }, 1500);
}

function appendMessage(sender, text) {
  const chatBody = document.getElementById("chatBody");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

  if (sender === "bot") {
    const icon = document.createElement("img");
    icon.src = "https://i.ibb.co/2kW56kL/avatar-girl.png";
    icon.className = "icon";
    messageDiv.appendChild(icon);
  }

  const span = document.createElement("span");
  span.textContent = text;
  messageDiv.appendChild(span);
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
  const chatBody = document.getElementById("chatBody");
  const typing = document.createElement("div");
  typing.className = "bot-message";
  typing.id = "typingIndicator";

  const icon = document.createElement("img");
  icon.src = "https://i.ibb.co/2kW56kL/avatar-girl.png";
  icon.className = "icon";
  typing.appendChild(icon);

  const dots = document.createElement("div");
  dots.className = "typing";
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span");
    dots.appendChild(dot);
  }

  typing.appendChild(dots);
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}
document.getElementById("userInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    sendMessage();
  }
});
function getBotReply(msg) {
  const lower = msg.toLowerCase();

  if (lower.includes("qodematrix") || lower.includes("qode") || lower.includes("matrix")) {
    return "Qodematrix is a tech company that offers training and builds client apps.";
  } 
  else if (lower.includes("services")) {
    return "We offer full-stack development, web & mobile app development,Digital Marketing and Software Solutions";
  }
   else if (lower.includes("contact")) {
    return "You can email us at qodematrixservices@gmail.com 📧";
  } 
  else if (lower.includes("training")) {
    return "The trainings offered by QodeMatrix are Web development,App development languages are like Python,C,Java,C++...";
  } 
  else if (lower.includes("hello") || lower.includes("Hi")) {
    return "Hello! How can I help you today about Qodematrix?";
  }
   else if (lower.includes("okay") || lower.includes("bye")) {
    return "Okay! Let me know if you need any assistance";
  }
  else if (lower.includes("great") || lower.includes("well done")) {
    return "Thank you for visiting QodeMatrix!";
  }
   else if (lower.includes("thank you")) {
    return "You're welcome,Thanks for visiting QodeMatrix!";
  }
   else if (lower.includes("careers") || lower.includes("hiring")) {
    return "You can visit our 'Contact US' page or else I'm requesting you to send an email to us at qodematrixservices@gmail.com, We'll get in touch with you!";
  }
  
  
   else {
    return "Sorry, I can only provide information related to Qodematrix.";
  }
}

window.onload = () => {
  setTimeout(() => {
    const popup = document.querySelector(".chatbot-popup");
    if (popup) popup.style.display = "none";
  }, 5000);
};
