var critical = require('critical');

critical.generate({
    base: './',
    inline: true,
    src: 'index-without-critical-CSS.html',
    dest: 'index.html',
    dimensions: [{
        height: 480,
        width: 320
    }, {
        height: 568,
        width: 320
    }, {
        height: 667,
        width: 375
    },  {
        height: 736,
        width: 414
    }, {
        height: 1024,
        width: 768
    }, {
        height: 1080,
        width: 1920
    }]
});