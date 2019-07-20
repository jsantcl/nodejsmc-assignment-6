//Dependencies
const cluster = require("cluster");
const os = require("os");
const server = require("./server");

//main app container
let app = {};

app.init = () => {
	let forks = [];
	if(cluster.isMaster) {
		//Just a message on main thread
		console.log("Main Thread Started with process id:" + process.pid);

		//Fork the process and save them in array
		for(let i = 0; i < os.cpus().length; i++) {
			let child = cluster.fork(); 
			forks.push( child);

			//add event handler for messages
			child.on('message', (msg) => {
				console.log(`Main thread received message from fork process id: ${child.process.pid} it's replying to localhost/hello/`);
			});
		}

		//print what process id each forked process got
		forks.forEach((child) => {
			console.log(`This is forked process id ${child.process.pid}`);
		});
	} 
	else {		
		server.init();
	}
}


app.init();





