const imagemin = require('imagemin'); // https://github.com/imagemin/imagemin
const imageminWebp = require('imagemin-webp'); // https://github.com/imagemin/imagemin-webp

imagemin(['./src/img/*.jpg'], './dist/img/', {
    use: [
        imageminWebp({
          quality: 80,
          preset: 'photo',
          method: 6
        })
    ]
}).then(() => {
    console.log('JPG images lossy converted to Webp.');
});