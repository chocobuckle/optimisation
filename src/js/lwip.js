var lwip = require('lwip');

lwip.open('./src/views/images/pizzeria.jpg', function(err, image) {
  if (err) throw err;
  image.resize(100, function(err, image) {
    if (err) throw err;
    console.log('Image resized.');
    image.writeFile('./dist/views/images/pizzeria.jpg', function(err) {
      if (err) throw err;
    });
  });
});


