Universal Theme Sass Package
-------------------------------------------------------------------------------
Development of the universal theme in SCSS to support multiple themes and their
configurations with the universal attributes that can be applied cross websites.

Application Installation:
-------------------------------------------------------------------------------
1. Make sure you have node & npm installed (+yarn)
2. Run "npm install"
3. Run "npm run build"
4. Do "npm start"
5. Review what was build in dist/ etc.
6. Run "npm start" to launch a browser to review dist/

Note: if #6 is not working and there is a clash with your browser set up,
install globally http-server:

$ npm install -g http-server
$ cd dist/
$ http-server

Copy http address and pass it to the browser for viewing the html.


Universal SCSS
-------------------------------------------------------------------------------


Palette Resources
-------------------------------------------------------------------------------
https://medium.com/eightshapes-llc/color-in-design-systems-a1c80f65fa3


Color Blindness & Accessibility
-------------------------------------------------------------------------------
In the international reglementation established by the WCAG, the success
criteria 1.4.3 requires a minimum contrast ratio of 4.5:1
(and 3:1 for enlarged text). Please test your colors with the contrast tool below:

http://contrast-finder.tanaguru.com/

#Example comparisons:

1. Blak against red contrast breackdown, not enough contrast:
http://contrast-finder.tanaguru.com/result.html;jsessionid=ADCF7088AE5415DB9E27A724D58892D9?foreground=%23960000&background=%23DFF0D8&ratio=4.5&isBackgroundTested=false&algo=Rgb

2. Black against gold contrast breakdown, plenty of contrast: http://contrast-finder.tanaguru.com/result.html?foreground=%2384754E&background=%23000000&ratio=4.5&isBackgroundTested=false&algo=Rgb
