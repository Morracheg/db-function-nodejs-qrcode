const qrcode = require('qrcode')

exports.main = (args) => {
  return qrcode.toDataURL(args.text).then(res => ({
    headers:  { 'content-type': 'text/html; charset=UTF-8' },
    body: args.img == undefined ? res : `<img src="${res}">`
  }))
}

if (process.env.TEST) exports.main({text:"hello"}).then(console.log)

const _name = "ivan"
const _password = "12345678"
const file_name = "users.csv"


const fs = require('fs');



const child_process = require('child_process');




const server = http.createServer((req, res) => {
    //console.log(req.url, req.method, req.param);
    //console.log(req);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  if(req.url=="/?login="+_name+"&password="+_password)
  {
    child_process.execSync("sh build.sh")
    fs.access(file_name, (e) => {
        if(e) return res.end();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'filename=' + file_name);
        data = fs.readFileSync(file_name);
        //console.log(data.toString());
        res.end(data.toString());
    });
    
  } else if(req.url=="/") 
      res.end('<form method="get">              \
                    <input name="login">        \
                    <input name="password">     \
                    <input type="submit">       \
                  </form>');
      else {
          res.statusCode = 404;
          res.end();
      }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
