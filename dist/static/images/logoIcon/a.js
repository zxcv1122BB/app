let fs = require("fs");
let path = require("path");
let files = fs.readdirSync('./', "utf-8");
files.forEach(function(filename){
    let filedir = path.join('', filename);
    fs.rename(filedir, path.join('', filename.replace(/png/g, 'jpg')), function (map) {
        console.log(map);
    })
});
