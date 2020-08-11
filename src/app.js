const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getWeather = require('./utils/getWeather.js')


const app = express()
const port = process.env.PORT || 3000

//Defined Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlers emgine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index',{
        title : 'Weather',
        name : '© Copyright 2020 Prahlad_3086'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: '© Copyright 2020 Prahlad_3086'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title: 'Help',
        name: '© Copyright 2020 Prahlad_3086'
    })
})

app.get('/weather',(req, res) =>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide a address term'
        })
    }
    
    getWeather(req.query.address,(error, {location,temp,updatedtime,isday,precip,feelslike,descrp} = {})=>{
        if(error){
            return res.send({
                error: error
            })
        }

        else{
            res .send({
                location: location,
                temp: temp,
                uddatedtime: updatedtime,
                isday: isday,
                precip: precip,
                feelslike: feelslike,
                descrp: descrp
            })
        }
    })

})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Prahlad Kumar',
        message : 'Help Article Not Found'
    })
})

app.get('*',(req, res) =>{
    res.render('404',{
        title: '404',
        name: 'Prahlad Kumar',
        message:"Page Not found"
    })
})

app.listen(port,()=>{
    console.log("Server is up on "+port)
})