var path = require('path');
var DocWriter = require('../lib/docwriter');




var projectPath = path.join(__dirname,'..','docs');


var project = DocWriter.getProject(projectPath);

var outline = project.getOutline();

console.log(JSON.stringify(outline,null,2));
