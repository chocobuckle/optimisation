var critical = require('critical');

critical.generate({
    inline: true,
    base: './',
    src: 'index-without-criticalCSS.html',
    dest: 'index.html',
    minify: true,
    dimensions: [{
      width: 480
    },{
      width: 1200,
      height: 900
    }]
});