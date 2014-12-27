#!/usr/bin/env node
var argv = require('yargs')
    .usage('Generate a sequence diagram from a diagram DSL file and output it as a png image with a given name. \nUsage: $0')
    .example('$0 -f diagram-file.txt -o output-file.png -t [hand|simple]')
    .demand('f')
    .alias('f', 'input')
    .describe('f', 'Input filename with the diagram DSL')
    .demand('o')
    .alias('o', 'output')
    .describe('o', 'Output filename image. Should be *.png')
    .alias('t', 'type')
    .describe('t', 'Diagram type.')
    .default('hand')
    .argv;

var rx = require('rx');
var fs = require('fs');
var Nightmare = require('nightmare');
var Handlebars = require('handlebars');
var sequenceDiagramTemplate = require('./sequenceDiagram.tpl.js');

var sequenceDiagram;
var sequenceDiagramCaption = "";
var sequenceDiagramTheme = "hand";
var tempFile = ".tmp.html";

sequenceDiagram = fs.readFileSync(argv.f, 'utf8');

var handlebarsContext = {
    "sequenceDiagram": sequenceDiagram,
    "caption": sequenceDiagramCaption,
    "theme": sequenceDiagramTheme
};

var sequenceDiagramOutput = Handlebars.templates.sequenceDiagram(handlebarsContext);


fs.writeFileSync(tempFile, sequenceDiagramOutput);

new Nightmare()
        .goto(tempFile)
        .screenshot(argv.o)
        .run();

