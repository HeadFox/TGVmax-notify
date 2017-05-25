var http = require('http');
var request = require('request');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  const options = {
      url: `https://ressources.data.sncf.com/api/records/1.0/search?dataset=tgvmax&facet=origine&sort=date&refine.origine=PARIS (gares intramuros)&refine.destination=STRASBOURG&refine.date=28/05/2017`,
      method: 'GET',
      json: true,
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'User-Agent': 'my-reddit-client'
      },
  };

  request(options, function(err, res, body) {
      body.records.forEach(function(element){
        if(element.fields.od_happy_card === "OUI"){
          console.log("Heure de départ : " + element.fields.heure_depart);
          console.log("Heure d'arrivée : " + element.fields.heure_arrivee);
          console.log("Numéro du train : " + element.fields.train_no);
          console.log("");
        }
      });
  });
}).listen(8000, 'localhost');
console.log('Server running at http://localhost:8000/');
