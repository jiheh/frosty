var tessel = require('tessel');
var climatelib = require('climate-si7020');
var servolib = require('servo-pca9685');

var climate = climatelib.use(tessel.port['A']);
var servo = servolib.use(tessel.port['B']);

var servo1 = 1; // We have a servo plugged in at position 1
var servo2 = 4; // We have a servo plugged in at position 4
var position1 = 0;
var position2 = 1;

climate.on('ready', function() {
	setInterval(function() {
		climate.readTemperature('f', function (err, temp) {
			var currentTemp = temp.toFixed(4);
			console.log(currentTemp);
			if (currentTemp < 99) {
				makeCoffee();
			}
		});
	}, 1500);
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});

function makeCoffee() {
	if (position1 >= .98) {
		position1 = 0;
	} else {
		position1+= .5;
	}

	if (position2 <= 0) {
		position2 = 1;
	} else {
		position2 -= .5;
	}
	servo.move(servo1, position1);
	servo.move(servo2, position2);
}

