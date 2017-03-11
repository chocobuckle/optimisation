var lwip = require('lwip');

lwip.open('./src/views/images/pizzeria.jpg', function(err, image) {
  if (err) throw err;
  image.resize(115.39, 75, function(err, image) {
    if (err) throw err;
    console.log('Image resized.');
    image.writeFile('./dist/views/images/pizzeria.jpg', function(err) {
      if (err) throw err;
    });
  });
});