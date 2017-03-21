# Performance and Rendering Optimisation

A website performance/rendering optimisation, submitted as a project for the Udacity Front-End Developer Nanodegree program.

## Getting Started

Either click [here](https://chocobuckle.github.io/performance-optimisation/) to open the site via Github Pages, or just clone/download the repo, unzip the folder to your destination of choice, then click on index.html in the project root folder to open the site in your default web browser. The site is already built, but if you want to test the build process just navigate to the project folder and run 'npm install' to download and install all required dependencies, then run 'npm start' to build the site again.

## Website Performance Optimisation

The project is divided into two parts, the first entailing a website performance optimisation, and the second a browser rendering optimisation. In the first part I was tasked with optimising index.html of a given website so that it achieves a Google Pagespeed score of at last 90 for mobile and desktop. I achieved a score of 96 for mobile and 97 for desktop. The screenshots below show the mobile and desktop Pagespeed scores of the site as provided to me, before I did any optimisations...

![Screenshot of mobile PageSpeed score, before optimisations.](./screenshots/mobile-before.jpg?raw=true "Mobile PageSpeed score, before optimisations.")



![Screenshot of desktop PageSpeed score, before optimisations.](./screenshots/desktop-before.jpg?raw=true "Desktop PageSpeed score, before optimisations.")

The optimisations I made are as follows:

* Minified and inlined 'style.css', then placed it in a style tag in the index.html header. Removed the call to the external 'style.css' stylesheet.
* Downloaded fonts and inlined their calls into the style tag in the header. This is quicker than making external calls to Google Fonts and removes the possibility of a single point of failure if Google Fonts goes down.
* Removed the link tag for 'print.css' from the header, and instead chose to construct the tag in 'downloadJSAndPrintCSSAtOnload', which is a function that is only called when the page's 'onload' event is fired. The newly constructed link tag is only then appended to the document body. This ensures that that the 'print.css' link tag is out of the critical rendering path.
* The index.html page was originally making an external call to Google to retrieve the 'analytics.js' JavaScript, so I went to the web address the script tag was calling, copied the JavaScript found there, and saved it to a local .js file called 'deferGoogleAnalytics.js'. I then constructed a script tag in the same function mentioned above -  'downloadJSAndPrintCSSAtOnload' - to call the script only when the page's 'onload' event is fired and append the new script to the document body. This solution not only allowed the browser to do less work, but also solved the problem of the original 'analytics.js' script being loaded over http instead of https, resulting in it being blocked by Chrome and labelled as an "insecure" script. The easiest solution to this is usually to just call the script with 'https' in the web address instead of 'http', but better even still is to store the file locally with the rest of your page resources, so the browser has to make less external GET requests.
* Removed the external call to 'perfmatters.js' and inlined its function into the script tag at the bottom of the 'index.html' document body. This function, along with the JavaScript used to construct the 'print.css' and 'deferGoogleAnalytics.js' tags, are all placed within one script tag at the bottom of the document body, instead of placing each of them in 3 separate scripts. By having the page load just one single script the browser minimises its calls to the server.
* Removed external calls to the 'project-2048', 'project-webperf', and 'project-mobile' images. I instead downloaded the images and constructed a CSS Sprite image between them, the pizzeria image, and the profile image of Cameron Pittman. By doing this the browser can just download the one CSS Sprite image instead of making 5 calls to download 5 separate images.
* Resized the 'pizzeria.jpg' image using an NPM script called 'lwip'. I reduced it's size from 2048 x 1536 pixels to just 100 x 75 pixels, which is the maximum resolution required to display the image appropriately at the bottom of index.html.
* Compressed all images displayed on index.html with the 'imagemin', 'imageminMozjpeg', and 'imageminPngquant' NPM scripts. This allowed me to reduce file sizes for the images by up to 80%.

After the above optimisations the website achieved a mobile/desktop PageSpeed score of 96/97 respectively. See below...

Mobile
![Screenshot of mobile PageSpeed score, before optimisations.](./screenshots/mobile-after.jpg?raw=true "Mobile PageSpeed score, before optimisations.")


Desktop
![Screenshot of desktop PageSpeed score, before optimisations.](./screenshots/desktop-after.jpg?raw=true "Desktop PageSpeed score, before optimisations.")


To test the PageSpeed score of the site yourself, just click [here](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fchocobuckle.github.io%2Fperformance-optimisation%2F).

## Browser Rendering Optimisation

* Use the arrow keys to move.
* The goal is to collect all the treasure required to open one of the doors on the far side of road, whilst avoiding the ladybugs.
* Treasure chests can only be opened by first collecting the necessary key.
* You have 3 lives and there are 10 levels. The ladybugs will get faster as you progress and the levels will get increasingly more diffiult to navigate, but patience is your friend. Don't panic and you'll make it to the end.

## NPM Dependencies

* [imagemin](https://www.npmjs.com/package/imagemin)
* [imagemin-mozjpeg](https://www.npmjs.com/package/imagemin-mozjpeg)
* [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant)
* [lwip](https://www.npmjs.com/package/lwip)

## Licence

The contents of this repository are covered under the [MIT License](https://github.com/chocobuckle/performance-optimisation/blob/master/LICENSE.txt).


