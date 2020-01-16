var http = require("http");

let fs = require("fs"),
    xml2js=require("xml2js")
var DOMParser = require('xmldom').DOMParser;
var parser= new DOMParser();

//create a server object:
http
  .createServer(async function(req, res) {
    let xml_data = fs.readFileSync( "data.xml", "utf8");
     var xmldoc=parser.parseFromString(xml_data,"text/xml");
     var i;
    for ( i=0;i<32;i++){
    var x=xmldoc.getElementsByTagName('forecast')[0];
   var y= x.getElementsByTagName('area')[i];
   var attr = y.getAttribute("description");
 
    if(y.childNodes==0){
      console.log(attr);
      
      fs.appendFileSync("all.txt", " "+attr+"\n");
   
          
    
    } else {
      var z= y.getElementsByTagName('forecast-period')[3];
      var xy= z.getElementsByTagName('text')[0];
      var value= xy.firstChild.nodeValue;
      console.log(attr);
      console.log(value);
      fs.appendFileSync("all.txt", " "+attr+"\n"+value+"\n");
      
    } 
    

  }
  let final = fs.readFileSync( "all.txt", "utf8");
    res.write(final);
    res.end();
  }
  ).listen(8080); //the server object listens on port 8080



//create a server object:
http
  .createServer(async function(req, res) {
    let xml_data = fs.readFileSync("data.xml", "utf8");
    res.write(xml_data);
    var xmldoc = parser.parseFromString(xml_data, "text/xml");

    console.log(xmldoc.getElementsByTagName("forecast")[0].firstchild);

    res.end();
  })

  .listen(8080); //the server object listens on port 8080
