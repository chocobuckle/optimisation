const imagemin = require('imagemin'); // https://github.com/imagemin/imagemin
const imageminMozjpeg = require('imagemin-mozjpeg'); // https://github.com/imagemin/imagemin-mozjpeg#imagemin-mozjpeg--
const imageminPngquant = require('imagemin-pngquant'); // https://github.com/imagemin/imagemin-pngquant

imagemin(['./src/img/*.{jpg,png}'], './dist/img/', {
    plugins: [
      imageminMozjpeg(),
      imageminPngquant({
        quality: '40-55'
      })
    ]
}).then(() => {
    console.log('Images compressed.');
});

imagemin(['./src/views/images/*.png'], './dist/views/images/', {
    plugins: [
      imageminPngquant({
        quality: '65-80'
      })
    ]
}).then(() => {
    console.log('pizza.png file compressed.');
});

imagemin(['./dist/views/images/pizzeriaForPizzaHTMLResized.jpg'], './dist/views/images', {
    plugins: [
      imageminMozjpeg()
    ]
}).then(() => {
    console.log('pizzeriaForPizzaHTML.jpg compressed.');
});