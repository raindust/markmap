#! /usr/bin/env node

var fs = require('fs');
var parse = require('../parse.txtmap');
var parseMarkdown = require('../parse.markdown');
var transform = require('../transform.headings');
var exec = require('child_process').exec;
var argv = require('yargs')
    .alias('t', 'text')
    .alias('m', 'markdown')
    .alias('s', 'source')
    .argv;

var text = fs.readFileSync(argv.s, 'utf-8');

var headings;
if(argv.m)
    headings = parseMarkdown(text);
else //default we parse text file
    headings = parse(text);
var root = transform(headings);

console.log(root);

fs.writeFileSync('result.json', JSON.stringify(root));

//replace gtor source so that we can view the result on browser by simplely open index.html
exec('mv result.json ../examples/gtor.json', function(err, stdout, stderr){
    if(err)
        console.log('move failed: ' + err);
    else
        console.log('move success!');
})