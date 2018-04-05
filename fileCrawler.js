const path = require('path'),
      fs   = require('fs'),
      os   = require('os'),
      home = os.homedir();

function routing(req, res){

    // ignore the brower's request for a favicon
    if(req.url.endsWith('/favicon.ico')){
        res.writeHead(404);
        res.end();
        return res;
    }

    let current_path = path.join(decodeURI(req.url));

    try {
        
        // if the request is for a file, give the file to the user
        if(fs.lstatSync(path.join(home, current_path)).isFile()){
            fs.readFile(path.join(home, current_path), (errors, contents) => {
                res.writeHead(200);
                res.write(contents);
                res.end();
                return res;
            });

        // otherwise show a list of all the files and folders
        }else{
            
            res.writeHead(200, {'Content-Type': 'text/html'});
            let contents = `<h1>Looking in ${path.join(home, current_path)}</h1><hr><ul>`;
            
            for(let file of fs.readdirSync(path.join(home, current_path))){
                // ignore hidden files and folders
                if(!file.startsWith('.')){
                    // if directory: have a slash at the end
                    if(fs.lstatSync(path.join(home, current_path, file)).isDirectory()){
                        contents += `<li><a href="${path.join(current_path, file)}">${file}/</a></li>`;
                    // if file: don't
                    }else if(fs.lstatSync(path.join(home, current_path, file)).isFile()){
                        contents += `<li><a href="${path.join(current_path, file)}">${file}</a></li>`;
                    }
                }
            }

            contents += `</ul>`;
            res.write(contents);
            res.end();
            return res;

        }

    }catch(error){
        console.log(error);
        res.writeHead(404);
        res.end();
        return res;
    }



}

module.exports = routing;