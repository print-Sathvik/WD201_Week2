const http = require("http");
const fs = require("fs");

const minimist = require("minimist");
let args = minimist(process.argv);
let port = args['port'];

let globalHome = "";
let globalProject = "";
let globalRegistration = "";

fs.readFile("home.html", (err, home) =>
{
  if (err)
	{
    throw err;
  }
  globalHome = home;
});

fs.readFile("project.html", (err, project) =>
{
  if (err)
	{
    throw err;
  }
  globalProject = project;
});

fs.readFile("registration.html", (err, registration) =>
{
  if (err)
	{
    throw err;
  }
  globalRegistration = registration;
});

let server = http.createServer((request, response) =>
{
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
		switch (url)
		{
      case "/project":
        response.write(globalProject);
        response.end();
        break;
			case "/registration":
        response.write(globalRegistration);
        response.end();
        break;
      default:
        response.write(globalHome);
        response.end();
        break;
    }

});

server.listen(port);
