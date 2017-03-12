const imagemin = require('imagemin'); // https://github.com/imagemin/imagemin
const imageminWebp = require('imagemin-webp'); // https://github.com/imagemin/imagemin-webp

imagemin(['./dist/views/images/pizzeria.jpg'], './dist/views/images/', {
    use: [
        imageminWebp({
          quality: 70
        })
    ]
}).then(() => {
    console.log('Pizza image lossy converted to Webp.');
});