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
  .describe('o', 'Output filename. Could be either jpeg, png or pdf. Defaults to "png".')
  .default('o', 'out.png')
  .alias('t', 'theme')
  .describe('t', 'Diagram theme.')
  .choices('t', ['snapHand', 'snapSimple'])
  .default('t', 'snapHand')
  .argv;

var fs = require('fs');
// var Nightmare = require('nightmare');
const puppeteer = require('puppeteer');
var Handlebars = require('handlebars');

console.log("Reading template " + './templates/sequence-diagram.handlebars');
var templateSrc = fs.readFileSync('./templates/sequence-diagram.handlebars', 'utf8');

var template = Handlebars.compile(templateSrc);

var sequenceDiagram;
var sequenceDiagramCaption = "";
var sequenceDiagramTheme = argv.t;
var tempFile = ".tmp.html";
const pdfRegex = /pdf$/g;
const imageRegex = /(png|jpg|jpeg)$/g;

sequenceDiagram = fs.readFileSync(argv.f, 'utf8');

var handlebarsContext = {
  "sequenceDiagram": sequenceDiagram,
  "caption": sequenceDiagramCaption,
  "theme": sequenceDiagramTheme
};

var sequenceDiagramOutput = template(handlebarsContext);

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({
    width: 2000,
    height: 2000
  });
  await page.goto(`file://${path.resolve('.tmp.html')}`, {
    waitUntil: 'networkidle'
  });

  if(pdfRegex.test(argv.o)){
    await page.pdf({
      path: argv.o
    });
  } else if (imageRegex.test(argv.o)) {
    await page.screenshot({
      path: argv.o
    });
  } else {
    console.error(`File format for file ${argv.o} is not supported.`);
  }


  browser.close();
})();
