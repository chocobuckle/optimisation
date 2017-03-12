const imagemin = require('imagemin'); // https://github.com/imagemin/imagemin
const imageminWebp = require('imagemin-webp'); // https://github.com/imagemin/imagemin-webp

imagemin(['./dist/img/pizzeria.jpg'], './dist/img', {
    use: [
        imageminWebp({
          quality: 70
        })
    ]
}).then(() => {
    console.log('pizzeria.jpg lossy converted to Webp.');
});

imagemin(['./dist/views/images/pizzeriaForPizzaHTMLResized.jpg'], './dist/views/images/', {
    use: [
        imageminWebp({
          quality: 70
        })
    ]
}).then(() => {
    console.log('pizzeriaForPizzaHTMLResized.jpg lossy converted to Webp.');
});