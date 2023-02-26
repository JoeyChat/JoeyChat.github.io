const messageForm = document.querySelector('.message-form');
const messagesContainer = document.querySelector('.messages-container');

// Connect to the WebSocket server
const socket = new WebSocket('ws://localhost:8080');

// Handle incoming messages from the server
socket.addEventListener('message', (event) => {
	const message = JSON.parse(event.data);
	addMessage(message);
});

// Handle form submission
messageForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const input = messageForm.querySelector('input');
	const message = {
		username: 'Your Username', // Replace with the username of the sender
		content: input.value,
		timestamp: new Date().toISOString()
	};
	socket.send(JSON.stringify(message));
	input.value = '';
});

// Add a new message to the messages container
function addMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `
		<span class="username">${message.username}</span>
		<span class="timestamp">${formatTimestamp(message.timestamp)}</span>
		<span class="content">${message.content}</span>
	`;
	messagesContainer.appendChild(div);
	messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Format a timestamp in a readable format
function formatTimestamp(timestamp) {
	const date = new Date(timestamp);
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
