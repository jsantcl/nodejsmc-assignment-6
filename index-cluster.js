//Dependencies
const cluster = require("cluster");
const os = require("os");
const server = require("./server");

//main app container
let app = {};

app.init = () => {
	if(cluster.isMaster) {
		//Just a message on main thread
		console.log("Main Thread Started...");

		//Fork the process
		for(let i = 0; i < os.cpus().length; i++) {
			cluster.fork();
		}
	} 
	else {		
		server.init();
	}
}


app.init();





