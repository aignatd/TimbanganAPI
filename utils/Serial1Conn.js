var SerialPort = require("serialport");

var InitSerialPort1 =
new SerialPort('COM21',
{
  baudRate    : 2400, // this is synced to what was set for the Arduino Code
  dataBits    : 7, // this is the default for Arduino serial communication
  parity      : 'even', // this is the default for Arduino serial communication
  stopBits    : 1, // this is the default for Arduino serial communication
  flowControl : false, // this is the default for Arduino serial communication
  autoOpen    : false
},
function (err)
{
  if (err) return console.log('Error: ', err.message);
});

module.exports = InitSerialPort1;
