// CarController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var Car = require('./Car');

// CREATES A NEW CAR
router.post('/', function (req, res) {
    Car.create({
			make : req.body.make,
			model : req.body.model,
			year : req.body.year,
			value : req.body.value,
			mileage : req.body.mileage,
			transmission : req.body.transmission,
			colour : req.body.colour
        }, 
        function (err, car) {
            if (err) return res.status(500).send("There was a problem adding the car information to the MongoDB database.");
            res.status(200).send(car);
        });
});
/*router.post('/addcar', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});*/
// RETURNS ALL THE CARS IN THE DATABASE
router.get('/', function (req, res) {
    Car.find({}, function (err, cars) {
        if (err) return res.status(500).send("There was a problem finding the cars.");
        res.status(200).send(cars);
    });
});
// GETS A SINGLE CAR FROM THE DATABASE
router.get('/:id', function (req, res) {
    Car.findById(req.params.id, function (err, car) {
        if (err) return res.status(500).send("There was a problem finding the car.");
        if (!car) return res.status(404).send("No car was found.");
        res.status(200).send(car);
    });
});
// DELETES A CAR FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Car.findByIdAndRemove(req.params.id, function (err, car) {
        if (err) return res.status(500).send("There was a problem deleting the car.");
        res.status(200).send("Car "+ car.name +" was deleted.");
    });
});
/*router.delete('/deletecar/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('cars');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});*/
// UPDATES A SINGLE CAR IN THE DATABASE
router.put('/:id', function (req, res) {
    
    Car.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, car) {
        if (err) return res.status(500).send("There was a problem updating the car.");
        res.status(200).send(car);
    });
});
module.exports = router;