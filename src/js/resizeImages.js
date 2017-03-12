var lwip = require('lwip'); // https://github.com/EyalAr/lwip

lwip.open('./src/views/images/pizzeria.jpg', function(err, image) {
  if (err) throw err;
  image.resize(100, 75, function(err, image) {
    if (err) throw err;
    console.log('pizzeria.jpg image resized.');
    image.writeFile('./dist/img/pizzeria.jpg', function(err) {
      if (err) throw err;
    });
  });
});

lwip.open('./src/views/images/pizzeria.jpg', function(err, image) {
  if (err) throw err;
  image.resize(720, 540, function(err, image) {
    if (err) throw err;
    console.log('pizzeriaForPizzaHTML.jpg image resized.');
    image.writeFile('./dist/views/images/pizzeriaForPizzaHTMLResized.jpg', function(err) {
      if (err) throw err;
    });
  });
});