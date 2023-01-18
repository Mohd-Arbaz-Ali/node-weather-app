const request = require('request')
const geocode = (address, callback) => {
  const url = 'http://api.positionstack.com/v1/forward?access_key=c2cb5bf87d39b580bba0551b126c75f3&query=' + encodeURIComponent(address)
  request({url,json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect the weather service!', undefined)
    }else if (body.error || body.data.length==0) {
      callback('Unable to find the weather report with this address', undefined)
    }else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].label
      })
    }
  })
}

module.exports = geocode
