const
  path = require('path'),
  fs = require('fs'),
  YAML = require('js-yaml');

const
  Outline = require('./outline');


module.exports =
class Project {

  constructor ( projectPath ) {
    this.path = projectPath;
    this.configFile = path.join(projectPath,'docwriter.yml');
    this.config = {};

    if(!fs.existsSync(projectPath))
      throw new Error(`Project path does not exist`);

    if(!fs.existsSync(this.configFile))
      throw new Error(`Project folder does not contain a config file`);

    this.loadConfigFromDisk();
  }




  /**
   * Generate an outline of the document
   *   Outline is a heirarchical list of headings, tables & figures.
   *
   *  @returns Outline
   */
  getOutline () {
    var outline = new Outline();

    // Recursively parse files to product the outline
    for(var k = 0; k < this.config.outline.length; k++) {
      outline.addChildren( Outline.parse( this.path, this.config.outline[k]) );
    }


    return outline;
  }




  loadConfigFromDisk() {
    var yml = YAML.safeLoad(fs.readFileSync(this.configFile));

    this.config.title = yml.title || null;
    this.config.author = yml.author || null;
    this.config.copyright = yml.copyright || null;
    this.config.version = yml.version || "1.0";
    this.config.outline = [];

    if ( yml.outline ) {
      for(var k = 0; k < yml.outline.length; k++) {
        this.config.outline.push(parse_config_outline_item(this.path, yml.outline[k]));
      }
    }
  }




}// end class Project







function parse_config_outline_item ( basePath, item) {
  if( typeof(item) == 'string' ){
    let file = path.join(basePath,item+'.md');
    if( ! fs.existsSync(file)){
      file = path.join(basePath,item,'_index.md');
      if(! fs.existsSync(file))
        throw new Error("Cannot find file "+item);
    }
    return {
      file: file,
      children: []
    }
  }
  else if ( typeof(item) == 'object' ){
    var fileName = Object.keys(item)[0],
        children = [],
        newBasePath = path.join(basePath,fileName);
    for(var k = 0; k < item[fileName].length; k++){
      children.push(parse_config_outline_item(newBasePath, item[fileName][k]))
    }

    let file = path.join(basePath,fileName+'.md');
    if( !fs.existsSync(file)){
      file = path.join(basePath,fileName,'_index.md');
      if( !fs.existsSync(file))
        throw new Error("Cannot find file "+item);
    }
    return {
      file: file,
      children: children
    }
  }
  throw new Error('Invalid item format');
}
