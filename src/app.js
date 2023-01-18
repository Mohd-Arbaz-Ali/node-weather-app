const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')
const partialsPath = path.join(__dirname, '../tempelate/partials')
hbs.registerPartials(partialsPath)
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../tempelate/views')
app.set('view engine', 'hbs')
app.set('views', viewPath)
const port = process.env.PORT || 3000

app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Mohd Arbaz Ali'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mohd Arbaz Ali'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mohd Arbaz Ali'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is o port 3000!')
})