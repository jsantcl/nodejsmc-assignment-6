// simple setup for one env
// environment object
const environments = {};


//set the port and name
environments.development = {
    port:3000,
    envName:"development"
}

//Get the requested env
const currentEnvironment =  typeof( process.env.NODE_ENV) == "string" ? process.env.NODE_ENV.toLowerCase() : "";

//Pick the default in any case
const environmentToExport = typeof( environments[currentEnvironment]) == "object" ? environments[currentEnvironment] : environments.development;

//export the configuration object
module.exports = environmentToExport;

