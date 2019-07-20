//server configuration
const config = require("./config.js");

//dependencies
const http = require("http");
const url = require("url");


//server container object
let server = {};

//create the http server
server.http = http.createServer( (req, res) => {
    server.mainFunction( req, res);
});


// A main function for processing
server.mainFunction = ( req, res) => {

    // Check url sent by user
    const parsedUrl = url.parse( req.url, true);
    // get the route
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
     
    // Reply the request
    //Pick the handler (default is not found)
    var chosenHandler = server.router.has( trimmedPath) ? server.router.get( trimmedPath) : server.handler.notFound;

    //Call the handler
    chosenHandler( ( statusCode, payload)=> {
        
            // set payload to chosen handler or empty one
            var payload = typeof( payload) == 'object' ? payload : {};
            var payloadString = JSON.stringify( payload);

            //set the content type to JSON
            res.setHeader("Content-Type","applications/json");
            //set the status code
            res.writeHead( statusCode);
            res.end( payloadString);
        }, trimmedPath);
};


// A handler object
server.handler = {};

// 404 for any route not managed
server.handler.notFound = ( callback)=> {
    callback( 404);
}

// Reply with welcome message on route /hello
server.handler.hello = ( callback, trimmedPath)=> {
    //Send message to main thread
    process.send({ msg: `Message from child thread ${process.pid} on path ${trimmedPath}` });
    //response
    callback( 200,  {"message":"Welcome to Homework Assignment #6, Nodejs Master Class!!"});
}

// I'm using a map for the actual router
server.router = new Map();
server.router.set("hello", server.handler.hello);

//Init server
server.init = () => {
    // Listen on port set by config
    server.http.listen( config.port, "192.168.0.13", ()=>{
    console.log(`Server listening on port ${config.port} environment ${config.envName.toUpperCase()}`);
});
}

module.exports = server;
