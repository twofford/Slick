const connection = new WebSocket("ws://localhost:8080");
const button = document.querySelector("#send");

connection.onopen = (event) => {
    console.log("WebSocket is open now.");
};

connection.onclose = (event) => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
    // append received message from the server to the DOM element 
    const chat = document.querySelector("#chat");
    chat.innerHTML += event.data;
};

button.addEventListener("click", () => {
    const name = document.querySelector("#name");
    const message = document.querySelector("#message");
    const data = `<p>${name.value}: ${message.value}</p>`;

    // Send composed message to the server
    connection.send(data);

    // clear input fields
    name.value = "";
    message.value = "";
});