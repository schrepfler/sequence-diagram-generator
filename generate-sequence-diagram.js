#!/usr/bin/env node
var argv = require('yargs')
    .usage('Generate a sequence diagram from a diagram DSL file and output it as a png image with a given name. \nUsage: $0')
    .example('$0 -f diagram-file.txt -o output-file.png -t [hand|simple]')
    .demand('f')
    .alias('f','input')
    .describe('f', 'Input filename with the diagram DSL')
    .demand('o')
    .alias('o','output')
    .describe('o', 'Output filename image. Should be *.png')
    .alias('t','type')
    .describe('t', 'Diagram type.')
    .default('hand')
    .argv;

var fs                      = require('fs');
var Nightmare               = require('nightmare');
var Handlebars              = require('handlebars');
var sequenceDiagramTemplate = require('./sequenceDiagram.tpl.js');

var sequenceDiagram;
var sequenceDiagramCaption = "";
var sequenceDiagramTheme = "hand";
var tempFile = ".tmp.html";

fs.readFile(argv.f, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    sequenceDiagram = data;

    var handlebarsContext = { "sequenceDiagram" : sequenceDiagram,
        "caption" : sequenceDiagramCaption,
        "theme": sequenceDiagramTheme };

    var sequenceDiagramOutput = Handlebars.templates.sequenceDiagram(handlebarsContext);


    fs.writeFile(".tmp.html", sequenceDiagramOutput, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The diagram markup was saved!");
            makeScreenshot();
        }
    });

    var makeScreenshot = function(){
        new Nightmare()
            .goto(".tmp.html")
            .evaluate(function (page) {
                return;
            }, function (res) {
                console.log(res);
            })
            .screenshot(argv.o)
            .run();
    };




});