const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/employees', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/employees/:id', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/employees/top', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/employees/csv', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/count_employees/', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/*', { target: 'http://localhost:5000' }))
}