const chatMessages = document.querySelector(".chat")
const send = document.querySelector(".send-msg")
const txtMsg = document.querySelector(".msg")
const personTyping = document.querySelector(".typing")

const socket = io("localhost:3000")

socket.on("message", (msg) => {
  displayMessage(msg)

  chatMessages.scrollTop = chatMessages.scrollHeight
})
socket.on("typing", function (data) {
  personTyping.innerHTML = `<p><em>${data} is typing a message...</em></p>`
})

send.addEventListener("click", sendMessage)
txtMsg.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    sendMessage()
  } else {
    socket.emit("typing", document.querySelector(".user").value)
  }
})

function sendMessage() {
  personTyping.innerHTML = ""
  const msg = document.querySelector(".msg")
  const username = document.querySelector(".user")

  socket.emit("message", {
    username: username.value,
    text: msg.value,
  })

  msg.value = ""
  msg.focus()
}

function displayMessage(msg) {
  personTyping.innerHTML = ""

  const messages = document.createElement("div")
  messages.classList.add("messages")

  const msgTime =
    new Date(msg.time).getDate() +
    "." +
    new Date(msg.time).getMonth() +
    "." +
    new Date(msg.time).getFullYear() +
    " " +
    new Date(msg.time).getHours() +
    ":" +
    new Date(msg.time).getMinutes()

  messages.innerHTML = `<div><div class="username"> ${msg.username} <span class="time">${msgTime}</span></div><div class="text-msg">${msg.text}</div></div>`

  chatMessages.appendChild(messages)
}
