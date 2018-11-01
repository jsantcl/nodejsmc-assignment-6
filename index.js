//Dependencies
const http = require("http");
const url = require("url");
const config = require("./config");



// Create the server and pass to mainFunction
const server = http.createServer( (req,res)=> {
    mainFunction( req, res);
})



// A main function for processing
const mainFunction = function( req, res) {

    // Check url sent by user
    const parsedUrl = url.parse( req.url, true);
    // get the route
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
     
    // Reply the request
    //Pick the handler (default is not found)
    var chosenHandler = router.has( trimmedPath) ? router.get( trimmedPath) : handler.notFound;

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

            // log the requested route and the response
            console.log("Request received on path: ",trimmedPath);
            console.log("Response : ", statusCode, payloadString);
        });
};


// Listen on port set by config
server.listen( config.port, "localhost", ()=>{
    console.log(`Server listening on port ${config.port} environment ${config.envName.toUpperCase()}`);
});


// A handler object
const handler = {};

// 404 for any route not managed
handler.notFound = ( callback)=> {
    callback( 404);
}

// Reply with welcome message on route /hello
handler.hello = ( callback)=> {
    callback( 200,  {"message":"Welcome to Homework Assignment #1, Nodejs Master Class!!"})
}

// I'm using a map for the actual router
const router = new Map();
router.set("hello", handler.hello);