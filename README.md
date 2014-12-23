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

Edit the sequence-diagrams.html (or make your own) file according to the diagram syntax and after running the following command you will find a png with your image.

```sh
./generate-sequence-diagram.js -f sequence-diagram.html -o sequence-diagram.png
```
TODO
=======

Full lines seem not to be rendered, check with nightmare team or phantom or js-sequence-diagram project
Make the flow where the template is vanilla text file which then gets injected using handlebars in the proper place
npm-ise and publish
Use handlebars to inject text above and below the diagram.
See if libs can be fetched as deps

