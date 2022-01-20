const messageform = document.querySelector(".chatbox form");
const messageList = document.querySelector("#messagelist");
const userList = document.querySelector("ul#users");
const chatboxinput = document.querySelector(".chatbox input")
const useraddform = document.querySelector(".modal")
const backdrop = document.querySelector(".backdrop")
const useraddinput = document.querySelector(".modal input");
const socket = io("http://localhost:3000");



let users = [];
let messages = []


console.log(messageList);

socket.on("message", (message) => {
    messages.push(message);
    updateMessages()
})


socket.on('users', function (_users) {
    users = _users
    updateUsers()
});


messageform.addEventListener('submit', messageSubmitHandler)
useraddform.addEventListener('submit', userAddHandler)

function updateUsers() {
    userList.textContent = ''
    for (let i = 0; i < users.length; i++) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(users[i]);
        node.appendChild(textnode);
        userList.appendChild(node);
    }
}

function updateMessages() {
    messageList.textContent = ''
    for (let i = 0; i < messages.length; i++) {
        messageList.innerHTML += `<li>
                     <p>${messages[i].user}</p>
                     <p>${messages[i].message}</p>
        
                       </li>`
    }
}

function messageSubmitHandler(e) {
    e.preventDefault();

    let message = chatboxinput.value;

    socket.emit("message", message)

    chatboxinput.value = ""


}

function userAddHandler(e) {
    e.preventDefault();

    let username = useraddinput.value;


    if (!username) {
        return alert("You must add a user name");
    }
    socket.emit("adduser", username)

    useraddform.classList.add("disappear")
    backdrop.classList.add("disappear")


}
