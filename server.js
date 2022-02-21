var bus = require('statebus').serve({
    braid_mode: true,
    port: process.env.port || 'auto'
})

// Serve statebus to the client
bus.serve_clientjs('pub/client.js')

// Serve static assets
bus.http.use('/pub/files', require('express').static(__dirname + '/files'))

// Serve the /pub pages
bus.http.get('/pub/*', (req, res, next) => {
    if (req.headers.accept === 'application/json')
        next()
    else
        res.sendFile('pub.html', {root:'.'})
})
