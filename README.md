Sequence Diagram Generator
=====================

This project can be used to generate sequence diagrams from the command line after defining the diagram with a simple DSL. It's a node wrapper around js-sequence-diagrams, check this page for DSL syntax http://bramp.github.io/js-sequence-diagrams/

Requirements
--------------
node.js, npm, phantomjs, handlebars

Setting up project
--------------

Clone project from git repository
```sh
git clone https://github.com/schrepfler/sequence-diagram-generator.git
```

Fetch dependencies
```sh
npm install
```

Generating sequence diagrams
--------------

Edit the sequence-diagrams.txt (or make your own) file according to the diagram syntax and after running the following command you will find a png with your image.

```sh
./generate-sequence-diagram.js -f sequence-diagram.txt -o sequence-diagram.png
```
TODO
=======

* See if we can avoid having to modify the tpl after precompilation.
* Full lines seem not to be rendered, check with nightmare team or phantom or js-sequence-diagram project
* npm-ise and publish
* Add proper image caption above and below the image with stylesheet
* See if libs can be fetched as deps

