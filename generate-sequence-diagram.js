#!/usr/bin/env node
var argv = require('yargs')
    .usage('Generate a sequence diagram from a diagram DSL file and output it as a png image with a given name. \nUsage: $0')
    .example('$0 -f diagram-file.html -o output-file.png')
    .demand('f')
    .alias('f','input')
    .describe('f', 'Input filename with the diagram DSL')
    .demand('o')
    .alias('o','output')
    .describe('o', 'Output filename image. Should be .png')
    .argv;

var Nightmare = require('nightmare');

new Nightmare()
  .goto(argv.f)
  .evaluate(function (page) {
    return;
  }, function (res) {
    console.log(res);
  })
  .screenshot(argv.o)
  .run();
