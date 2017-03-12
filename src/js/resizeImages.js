var lwip = require('lwip'); // https://github.com/EyalAr/lwip

lwip.open('./src/views/images/pizzeria.jpg', function(err, image) {
  if (err) throw err;
  image.resize(100, 75, function(err, image) {
    if (err) throw err;
    console.log('Pizza image resized.');
    image.writeFile('./dist/views/images/pizzeria.jpg', function(err) {
      if (err) throw err;
    });
  });
});