const imagemin = require('imagemin'); // https://github.com/imagemin/imagemin
const imageminMozjpeg = require('imagemin-mozjpeg'); // https://github.com/imagemin/imagemin-mozjpeg#imagemin-mozjpeg--
const imageminPngquant = require('imagemin-pngquant'); // https://github.com/imagemin/imagemin-pngquant

imagemin(['./src/img/profilepic.jpg'], './dist/img/', {
    plugins: [
      imageminMozjpeg({
        quality: 95
      })
    ]
}).then(() => {
    console.log("'profilepic.jpg' compressed.");
});

imagemin(['./src/img/project-2048.jpg'], './dist/img/', {
    plugins: [
      imageminMozjpeg({
        quality: 90
      })
    ]
}).then(() => {
    console.log("'project-2048.jpg' compressed.");
});

imagemin(['./src/img/project-webperf.jpg'], './dist/img/', {
    plugins: [
      imageminMozjpeg({
        quality: 95
      })
    ]
}).then(() => {
    console.log("'project-webperf.jpg' compressed.");
});

imagemin(['./src/img/project-mobile.jpg'], './dist/img/', {
    plugins: [
      imageminMozjpeg({
        quality: 85
      })
    ]
}).then(() => {
    console.log("'project-mobile.jpg' compressed.");
});

imagemin(['./dist/img/pizzeria.jpg'], './dist/img/', {
    plugins: [
      imageminMozjpeg({
        quality: 85
      })
    ]
}).then(() => {
    console.log("'pizzeria.jpg' compressed.");
});

imagemin(['./src/img/2048.png'], './dist/img/', {
    plugins: [
      imageminPngquant({
        quality: '75-90'
      })
    ]
}).then(() => {
    console.log("'2048.png' compressed.");
});

imagemin(['./src/img/cameron.jpg'], './dist/img/', {
    plugins: [
      imageminMozjpeg({
        quality: 60
      })
    ]
}).then(() => {
    console.log("'cameron.jpg' compressed.");
});

imagemin(['./src/img/mobilewebdev.jpg'], './dist/img/', {
    plugins: [
      imageminMozjpeg({
        quality: 80
      })
    ]
}).then(() => {
    console.log("'mobilewebdev.jpg' compressed.");
});

imagemin(['./dist/views/images/pizzeriaForPizzaHTMLResized.jpg'], './dist/views/images', {
    plugins: [
      imageminMozjpeg({
        quality: 60
      })
    ]
}).then(() => {
    console.log("'pizzeriaForPizzaHTML.jpg' compressed.");
});

imagemin(['./src/views/images/pizza.png'], './dist/views/images/', {
    plugins: [
      imageminPngquant({
        quality: '30-45'
      })
    ]
}).then(() => {
    console.log("'pizza.png' file compressed.");
});