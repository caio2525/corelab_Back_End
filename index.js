const express = require('express');
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser')

const mongoose = require('mongoose');

const Vehicle = require('./Models/Vehicles')

app.use(cors())
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw());

app.get('/vehicles', async (req,res) => {
  try {

    const allVehicles = await Vehicle.find()

    return res.json(allVehicles)

  } catch (e) {

    console.log('error', e)
    return res.json([])

  }
});

app.post('/save_vehicle', async(req, res) => {


  try {

    const vehicle = new Vehicle(req.body)
    await vehicle.save()

    return res.json({status: 200, 'mensagem': 'ok', 'vehicle': vehicle})

  } catch (e) {

    console.log(e)
    return res.status(400).json({status: 400, 'mensagem': 'fail'})

  }

})

app.delete('/vehicle/:id', async (req,res) => {
  var id = req.params.id

  try {
    await Vehicle.findByIdAndDelete(id)
    return res.json({status: 200, 'mensagem': 'deleted'});
  } catch (e) {
    return res.status(400).json({status: 400, 'mensagem': 'fail'});
  }
});


app.put('/vehicle/:id', async (req, res) => {
  var id = req.params.id


  try {

    const newDoc = await Vehicle.findByIdAndUpdate(id, req.body, {new: true})
    res.json(newDoc)

  } catch (e) {
    res.status(400).json({status: 400, 'mensagem': 'fail'})
  }

})

app.put('/favorite/:id', async (req, res) => {
  var id = req.params.id

  try {

    const vehicle = await Vehicle.findById(id)
    vehicle.isFavorite = ! vehicle.isFavorite
    await vehicle.save()
    res.json(vehicle)

  } catch (e) {
    res.status(400).json({status: 400, 'mensagem': 'fail'})
  }

})



async function main() {


  mongoose.connect('mongodb://some-mongo',
  {
    dbName:'VehiclesDB'
  })
  .then(() => console.log('connected'))
  .then(() => {
      app.listen(process.env.port || 3333,'0.0.0.0',()=>{
          console.log('Web Server is listening at port '+ (process.env.port || 3333));
        })
  })
  .catch(e => console.log('erro', e))



}

main()
