[![Build Status](https://travis-ci.org/schrepfler/sequence-diagram-generator.svg?branch=master)](https://travis-ci.org/schrepfler/sequence-diagram-generator) [![Stories in Ready](https://badge.waffle.io/schrepfler/sequence-diagram-generator.png?label=ready&title=Ready)](https://waffle.io/schrepfler/sequence-diagram-generator)
Sequence Diagram Generator
=====================

This project can be used to generate sequence diagrams from the command line after defining the diagram with a simple DSL. It's a node wrapper around js-sequence-diagrams, check this page for DSL syntax http://bramp.github.io/js-sequence-diagrams/

Requirements
--------------
node.js, npm, nightmare.js, handlebars.js

Setting up project
--------------

Clone project from git repository
```sh
git clone https://github.com/schrepfler/sequence-diagram-generator.git
```

Fetch dependencies
```sh
#install dependencies
npm install
#install web dependencies via bower
npm run setup
```

Generating sequence diagrams
--------------

Edit the sequence-diagrams.txt (or make your own) file according to the diagram syntax and after running the following command you will find a png with your image.

```sh
./generate-sequence-diagram.js -f sequence-diagram.txt -o sequence-diagram.png
```
TODO
=======

* Add an API eg.
```sh
var generator = require('generate-sequence-diagrams');
generator.generate('my dsl text', function (data) { // data is the output image });
```
* npm-ise and publish
* Add proper image caption above and below the image with stylesheet
* Tests
  * On body
  * On image
