// Sending a message to the backend is a request
// Backend will send back a response 
// Called Request-Response Cycle - One request, One response

const xhr = new XMLHttpRequest(); // Creates a new http request to send to the backend

xhr.addEventListener('load', () => {
    console.log(xhr.response)
}); // load - response has loaded, function

xhr.open('GET', 'https://supersimplebackend.dev'); // parameters, what type of request, where to send http message
xhr.send(); // Sends the message - Asynchronous code (Doesnt wait for response to complete)

// A get request is the same as using the browser
// If a request is sent to an invalid url, an error message will be displayed
// If Status Code starts with a 4 it is our problem, or 5 it is the backends problem
// Starting with 2 means successsful
// List of all supported url paths are called the Backend API
// Backend can respond with different types of data, Eg. text, JSON, html, image
