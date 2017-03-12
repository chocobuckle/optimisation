const imagemin = require('imagemin'); // https://github.com/imagemin/imagemin
const imageminWebp = require('imagemin-webp'); // https://github.com/imagemin/imagemin-webp

imagemin(['./src/img/*.png'], './dist/img/', {
    use: [
        imageminWebp({
          quality: 65,
          preset: 'picture',
          method: 6
        })
    ]
}).then(() => {
    console.log('PNG images losslessly converted to Webp.');
});