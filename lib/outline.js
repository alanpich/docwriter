var path = require('path'),
    fs = require('fs');

var markdown = require('./markdown');

class Node {
  constructor(type=null) {
    this.type = type;
    this.parent = null;
    this.children = [];
    this.source = {
      file: null,
      line: null
    }
  }

  addChild(child) {
    this.children.push(child);
  }

  addChildren(childArray) {
    this.children.push.apply(this.children, childArray);
  }
}



class Section extends Node {
  constructor (title) {
    super('section')
    this.title = title;
  }
}

class Figure extends Node {
  constructor () {
    super('figure');
  }
}

class Table extends Node {
  constructor () {
    super('table');
  }
}








var Outline = module.exports =
class Outline extends Node {
  constructor() {
    super('document');
  }
}



Outline.parse = function ( basePath, fileItem ) {
  var symbols = [];
  var mkd = markdown.parse(fs.readFileSync(fileItem.file).toString());
  console.log("\n\n", mkd);


  var curLvl = 0,
      itm;
  while(itm = mkd.shift()) {
    if(itm.type == 'heading_open'){

    }
  }





  return symbols;
}
