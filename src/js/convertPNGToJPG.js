const imagemin = require('imagemin');
const pngToJpeg = require('png-to-jpeg');

imagemin(['images/*.png'], 'build/images', {
    plugins: [
        pngToJpeg({quality: 90})
    ]
}).then((files) => {
    console.log('PNG converted to JPEG:', files);
});