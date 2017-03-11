const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-webp');

imagemin(['images/*.{jpg,png}'], 'build/images', {
    plugins: [
        imageminWebp({quality: 50})
    ]
}).then(files => {
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
});