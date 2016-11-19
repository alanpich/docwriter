var Remarkable = require('remarkable');


var DocWriter_Remarkable_Plugin = function (md, opts) {

  // md.
}

var md = new Remarkable()
  // .use(DocWriter_Remarkable_Plugin);




module.exports.parse = function (content) {

  console.log("-->",content);
  return md.parse(content,{})




}
