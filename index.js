const http = require('http');
const url = require('url');
const config = require('./config');

const port = config.port;

const server = http.createServer((request, response)=> {
    const parsedURL = url.parse(request.url, true);
    let path = parsedURL.pathname;
    path = path.replace(/^\/+|\/+$/g, '');
    request.on('data', ()=> {});
    request.on('end', ()=> {

        console.log(path)
        if(Object.getOwnPropertyNames(routes).includes(path)) {
            handler = routes[path];
        } else {
            handler = routes.notFound;
        }
        handler((status=200, payload={})=> {
            const payloadString = JSON.stringify(payload)
            response.setHeader('Content-Type', 'application/json');
            response.writeHead(status);
            response.write(payloadString)
            response.end('\n');
            console.log(status, payloadString);
        });
    });
});

handlers = {
    hello(callback) {
        callback(200, { message: 'Hello!' });
    },
    notFound(callback) {
        callback(404, { message: '404 not found'});
    }
}

routes = {
    hello: handlers.hello,
    notFound: handlers.notFound
}

server.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});