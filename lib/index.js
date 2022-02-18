"use strict";

var _express = _interopRequireDefault(require("express"));

var _socket = require("socket.io");

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cors = require('cors');

var app = (0, _express["default"])();
app.use(cors());

var server = _http["default"].createServer(app);

var io = new _socket.Server(server, {
  cors: {}
});
io.on('connection', function (socket) {
  var idHandShake = socket.id;
  var nameRoom = socket.handshake.query.nameRoom;
  console.log("id: ".concat(idHandShake, " => ").concat(nameRoom));
  socket.join(nameRoom);
  socket.on('event', function (res) {
    var data = res;
    console.log(res);
    socket.to(nameRoom).emit('event', data);
  });
});
server.listen(5000, function () {
  console.log('run in 5000');
});