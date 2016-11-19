const fs = require('fs'),
      path = require('path');


const Project = require('./project');




module.exports = {

  createProject ( projectPath, title="Unnamed Documentation", author="Unknown" ) {
    // Throw error if path doesnt exist
    if ( ! fs.existsSync(projectPath))
      throw new Error("Project path "+projectPath+" does not exist");


    // Throw error if project config file already exists
    const configFile = path.join(projectPath,'docwriter.yml');
    if ( fs.existsSync(configFile) )
      throw new Error("DocWriter project already exists at path "+projectPath);

    // Create the stub project config file
    const config = `\
    title: ${title}
    author: ${author}
    outline:
      - Documentation
    `;
    fs.writeFileSync(configFile, config)

    // Create the stub for the documentation pages
    fs.writeFileSync( path.join(projectPath,'Documentation.md'), "Documentation Project\n===");
  },


  getProject ( projectPath ) {
    if( ! fs.existsSync( projectPath ))
      throw new Error(`DocWriter project not found at path ${projectPath}`);

    var project = new Project( projectPath );
    return project;
  }



}
