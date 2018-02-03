Simple starfield, like the famous screensaver, in a canvas element, written in javascript.

Should be pretty easy to tinker with. Alter the values in starValues[] for example.

Uses webpack-dev-server, so it should be a simple:

    nmp install && npm start

after cloning.

Developed in chrome, may break in IE. 

Areas that could be improved:

1) Having the 'global' configurations separate from the star configuration would let you have multiple colors of stars, and other neat things.

2) It should be easy to add trailing lines behind each star.

3) Add some sort of interface below the canvas to configure the starField.

4) Make it all in a simple namespace or module.