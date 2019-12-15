// load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var count = 0;

var server = http.createServer(function (request,response) {
    // var queryData = url.parse(request.url, true).query;
    var pathData = url.parse(request.url, true).path;
    var template = "";

    if (pathData == "/") {
      pathData = "/index.html";
    }
    else {
		if (pathData == "/favicon.ico") {
			response.writeHead(404);
			response.end();
			return;
		}
      if (path.extname(pathData) != '.html') {
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + pathData));
        return;
      }
    }

    // start of html
    template += `<!doctype html><html>`;
    // add head
    template += fs.readFileSync(__dirname + "/head.html");
    // add body
    template += `<body>
      ${fs.readFileSync(__dirname + "/top-bar.html")}
      <div class="body-content">${fs.readFileSync(__dirname + pathData)}</div>
      ${fs.readFileSync(__dirname + "/bottom-bar.html")}
      </body>`
    // end of html
    template += `</html>`;

    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(template);

    console.log(
      `right response: ${count + 1}\nurl: ${pathData}\n`);
    count++;
});

server.listen(3000);
