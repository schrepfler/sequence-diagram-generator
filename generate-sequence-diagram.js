#!/usr/bin/env node
const path = require('path');
var argv = require('yargs')
    .usage('Generate a sequence diagram from a diagram DSL file and output it as a png image with a given name. \nUsage: $0')
    .example('$0 -f diagram-file.txt -o output-file.png -t [snapHand|snapSimple]')
    .demand('f')
    .alias('f', 'input')
    .describe('f', 'Input filename with the diagram DSL')
    .demand('o')
    .alias('o', 'output')
    .describe('o', 'Output filename. Supported type is .png.')
    .default('o', 'out.png')
    .alias('t', 'theme')
    .describe('t', 'Diagram theme.')
    .choices('t', ['snapHand', 'snapSimple'])
    .default('t', 'snapHand')
    .argv;

var fs = require('fs');
var Nightmare = require('nightmare');
var Handlebars = require('handlebars');

console.log("Reading template " + './templates/sequence-diagram.handlebars');
var templateSrc = fs.readFileSync('./templates/sequence-diagram.handlebars', 'utf8');

var template = Handlebars.compile(templateSrc);

var sequenceDiagram;
var sequenceDiagramCaption = "";
var sequenceDiagramTheme = argv.t;
var tempFile = ".tmp.html";

sequenceDiagram = fs.readFileSync(argv.f, 'utf8');

var handlebarsContext = {
    "sequenceDiagram": sequenceDiagram,
    "caption": sequenceDiagramCaption,
    "theme": sequenceDiagramTheme
};

var sequenceDiagramOutput = template(handlebarsContext);

fs.writeFile(tempFile, sequenceDiagramOutput, function(err) {
    if(err) {
        return console.log("Error while saving html: " + err);
    }
    
    new Nightmare()
        .viewport(2000, 2000)
        .goto("file://" + path.resolve(".tmp.html"))
        .wait(1000)
        .screenshot(argv.o)
        .end()
        .then(()=>console.log(argv.o + " saved."))
        .catch(function (error) {
            console.error('Diagram generation failed:', error);
        });

}); 

