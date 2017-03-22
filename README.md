# Performance and Rendering Optimisation

A website performance/rendering optimisation, submitted as a project for the Udacity Front-End Developer Nanodegree program.

## Introduction

As the number of devices users can access an application continues to grow, ensuring a quality user experience across those devices is of upmost importance. Understanding lower-level concepts regarding how the browser works and interprets code enables a developer to produce highly performant applications. This project showcases my skills in identifying performance bottlenecks and optimising web applications for an enjoyable user experience.

## Getting Started

Either click [here](https://chocobuckle.github.io/performance-optimisation/) to open the site via Github Pages, or just clone/download the repo, unzip the folder to your destination of choice, then click on index.html in the project root folder to open the site in your default web browser. The site is already built, but if you want to test the image optimisation/build process then just navigate to the project folder in your terminal and run 'npm install' to download and install all required dependencies, then run 'npm start' to optimise the source images again.

## Website Performance Optimisation

The project is divided into two parts, the first entailing a website performance optimisation, and the second a browser rendering optimisation. In the first part I was tasked with optimising index.html of a given website so that it achieves a Google Pagespeed score of at last 90 for mobile and desktop. I achieved a score of 96 for mobile and 97 for desktop. The screenshots below show the mobile and desktop Pagespeed scores of the site as provided to me, before I did any optimisations...

Mobile
![Screenshot of mobile PageSpeed score, before optimisations.](./screenshots/mobile-before.jpg?raw=true "Mobile PageSpeed score, before optimisations.")

Desktop
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

To test the PageSpeed score of the site yourself, click [here](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fchocobuckle.github.io%2Fperformance-optimisation%2F).


## Browser Rendering Optimisation

In the second part of the project I was given two tasks. First, to optimise 'dist/views/js/main.js' so that 'dist/views/pizza.html' renders with a consistent frame-rate of 60fps while scrolling, and second, to ensure that the time to resize the pizzas using the slider is less than 5ms. The site provided was purposefully designed badly and ignores numerous web development best practices, resulting in a poor user experience.

![Screenshot of pizzeria website.](./screenshots/pizzeria-website.jpg?raw=true "Pizzeria website.")

Please click [here](https://chocobuckle.github.io/rendering-before-optimisation/) to experience the slow, unoptimised version of the site as originally provided to me.

Below you can see a performance timeline profile of the unoptimised site, as captured in Chrome DevTools...

![Screenshot of Chrome DevTools performance timeline, before optimisations.](./screenshots/timeline-before.jpg?raw=true "DevTools performance timeline, before optimisations.")

The red bar stretching across the top of the screen indicates long frames and severe 'jank' problems. Beneath this, the low green chart indicates that the page is creeping along at a very slow FPS rate. The next chart below that reveals large amounts of CPU resources being consumed by Javascript(yellow) and CSS(purple) processing. The flame chart represents a visualisation of the CPUT stack trace, and in this case is showing repeated forced synchronous layout calculations, as indicated by the red triangles in the top-right corner of each purple layout event. Finally, the summary pie chart at the bottom of the screen reveals that most of the browser's time is being spent processing performance instensive scripting and rendering. In regards to changing the pizza sizes with the slider, the response time is reported in the DevTools console as approximately 100 - 120ms, which is far too slow for what should be a simple operation.

The optimisations I have implemented to address all the above issues are as follows:

* Layout and style calculation times both depend on the number of elements effected, so one way to keep those times down is to reduce the number of elements that layout and style have to be calculated for. Following on from this logic, I created a 'createPizzas' function that calculates the width and height of the user's screen and then generates the minimum amount of pizzas necessary to fill the screen. Originally, the unoptimised page was generating 200 pizza elements no matter what device the page was being viewed on. With my implementation, the page now displays between 8 - 72 pizzas, catering for the smallest mobile devices and the largest desktops. This reduces the amount of elements unnecessarily generated by 64 - 96%.
* I throttled the 'updatePositions' function by using the requestAnimationFrame method so that the function is only called by scroll events 60 times per second and no more.
* Because there are only 5 unique phase values for each scroll event I pushed them to a 'phaseValues' array so I have references to their constant values. This eliminates unncessary calculations in the subsequent for loop.
* For the background pizza animation I used 'style.transform' instead of the original 'style.left' and 'basicLeft' calculations, which trigger page layout/reflow. Transforms don't trigger layout/reflow, and by using 'translate3d' I was able to promote the animation to the GPU. I chose 'translate3d' over 'will-change' because the former currently has better browser support.
* Replaced the 'innerHTML' properties with 'textContent' in the 'changeSliderLabel' function, as 'textContent' is faster.
* Replaced all 'querySelector' and 'querySelectorAll' selectors with appropriate 'getElementById' and 'getElementsByClassName' selectors, which are faster. In the case of "var items = document.querySelectorAll('.mover')" I refactored it to "window.items = document.getElementsByClassName('mover')" and relocated it to the 'loadPizzas' function, which is only called once on page load. Originally, the 'items' variable was being re-declared and re-defined in the 'updatePositions' function, which in turn was called on every scroll event fired. Relocating the variable declaration and definition to the 'loadPizzas' function is a far more performant approach. Also moved the query to "#movingPizzas1" outside its containing for loop, so its constant value is cached and not recalculated on each loop iteration.
* Deleted the needlessly performance intensive oldWidth/windowWidth/offsetWidth calculations in the provided 'changePizzaSlices' and determineDX' functions, which were causing layout thrashing when each calculation touched the DOM to retrieve the offsetWidth property. Instead, I created a 'newWidth' variable and declared its percentage value depending on what value is passed into the switch statement via the function's 'size' argument. I then saved each DOM node with the class 'randomPizzaContainer' to an array, which allowed me to use the nodes in a for loop without repeatedly querying the DOM. Next, I updated each node's width property with the newWidth value returned from the switch statement previously mentioned. This approach minimises the calculations needed to be done by the browser to change the size of the pizza images, as there is no more query selecting inside the for loop and no more conversion back and forth between pixels and percentages. The net effect is a much quicker response time whenever the user adjusts the slider. Before optimisation the time it took to resize the pizza images was approximately 100 - 120ms. After the above optimisations were implemented I reduced the response time to approximately 0.3 - 0.5ms.

Below is a screenshot of the DevTools performance timeline after all the above optimisations were implemented...

![Screenshot of Chrome DevTools performance timeline, after optimisations.](./screenshots/timeline-after.jpg?raw=true "DevTools performance timeline, after optimisations.")

Here, a consistent 60FPS is achieved, 'jank' is gone, CPU calculations are minimal, the flame chart is no longer alerting forced synchronous layout events, and the summary pie chart shows that the browser is spending far less time scripting, rendering, and painting. The end result is a greatly improved user experience.

## NPM Dependencies

* [imagemin](https://www.npmjs.com/package/imagemin)
* [imagemin-mozjpeg](https://www.npmjs.com/package/imagemin-mozjpeg)
* [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant)
* [lwip](https://www.npmjs.com/package/lwip)

## Licence

The contents of this repository are covered under the [MIT License](https://github.com/chocobuckle/performance-optimisation/blob/master/LICENSE.txt).


