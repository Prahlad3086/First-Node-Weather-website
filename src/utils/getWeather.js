const request = require('request')

const getWeather = (address,callback) =>{
    const url = 'http://api.weatherstack.com/forecast?access_key=0dbc551d39229f7ca70221adda30547a&query='+address

    request({ url: url, json: true},(error,response) =>{
        if(error){
            callback("Unable to connect to Weather Services",undefined)
        }
        else if(response.body.error){
            callback("Unable to find Location Please try another location",undefined)
        }
        else{
            callback(undefined,{
                location : response.body.request.query,
                temp : response.body.current.temperature,
                updatedtime : response.body.current.observation_time,
                isday : response.body.current.is_day,
                precip : response.body.current.precip,
                feelslike : response.body.current.feelslike,
                descrp : response.body.current.weather_descriptions[0]
            })
        }
    })

}

module.exports = getWeather