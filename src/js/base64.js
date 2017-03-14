const base64Img = require('base64-img'); // https://www.npmjs.com/package/base64-img

base64Img.base64('./dist/img/profilepic.jpg', function(err, data) {
  if (err) throw err;
  console.log(data);
})