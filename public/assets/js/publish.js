const socket = io({ transports: ['websocket'] });

// this would be coming from devices install on the truck/buses/car/devices


var count = 1;
// takes a co-ordinate from the longlats lists 
// and sends it through web sockets to our back end.
setInterval(() => {
  // console.log(count);
  if (count <= 100){
    console.log(count)
    var item = {};
    item.Coordinate = {};
    item.Coordinate.Longitude = Math.random() * (90 - (-90)) + (-90);
    item.Coordinate.Latitude = Math.random() * (180 - (-180)) + (-180);
    count++;
    socket.emit('lastKnownLocation', item);
  }
}, 5000);