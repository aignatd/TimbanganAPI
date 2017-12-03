var SerialPort = require("serialport");

var InitSerialPort2 =
new SerialPort('COM5',
{
  baudRate    : 9600, // this is synced to what was set for the Arduino Code
  dataBits    : 8, // this is the default for Arduino serial communication
  parity      : 'none', // this is the default for Arduino serial communication
  stopBits    : 1, // this is the default for Arduino serial communication
  flowControl : false, // this is the default for Arduino serial communication
  autoOpen    : false
},
function (err)
{
  if (err) return console.log('Error: ', err.message);
});

module.exports = InitSerialPort2;
