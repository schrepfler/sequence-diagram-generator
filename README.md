Nightmare Automation
=====================

This project can be used as an illustration what can be achieved with Nightmare.js and it's automation.

Requirements
--------------
node.js, npm

Setting up project
--------------

Clone project from git repository
```sh
git clone
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
Make the flow where the template is vanilla text file and then gets injected in the proper place
npm-ise and publish
see if libs can be fetched as deps
