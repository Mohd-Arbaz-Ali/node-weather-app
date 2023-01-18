const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=80740a8e671d3bee9455f828d7d5d8c9&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.success === false) {
            callback('Unable to find the location', undefined)
        } else {
            let time
            if (body.current.is_day === 'no')
                time = 'night'
            else time = 'day'
            callback(undefined, 'It is currently ' + body.current.weather_descriptions[0] + ' at ' + time
                + '. It is currently ' + body.current.temperature + ' degree out.' + 'It feels like ' + body.current.feelslike + ' degree out.' +
                'The humidity is ' + body.current.humidity + '%.')
        }
    })
}
module.exports = forecast