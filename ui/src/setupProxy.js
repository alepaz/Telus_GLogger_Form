const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy('/auth/google/callback', { target: 'http://webappstest02.telusinternational.com:5000' }))
    app.use(proxy('/auth/google', { target: 'http://webappstest02.telusinternational.com:5000' }))
    app.use(proxy('/api/employees', { target: 'http://webappstest02.telusinternational.com:5000' }))
    app.use(proxy('/api/employees/:id', { target: 'http://webappstest02.telusinternational.com:5000' }))
    app.use(proxy('/api/top_employees/', { target: 'http://webappstest02.telusinternational.com:5000' }))
    app.use(proxy('/api/csv_employees/', { target: 'http://webappstest02.telusinternational.com:5000' }))
    app.use(proxy('/api/count_employees/', { target: 'http://webappstest02.telusinternational.com:5000' }))
    app.use(proxy('/api/employee', { target: 'http://webappstest02.telusinternational.com:5000' }))
    app.use(proxy('/api/*', { target: 'http://webappstest02.telusinternational.com:5000' }))
    //app.use(proxy('/api/*', { target: 'http://172.25.29.30:5000' }))
}