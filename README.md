FullContact Service  
2014-01-27  
  
Miles Poindexter  
selfpropelledcity@gmail.com  
  
URLs:  
http://localhost:2900/fullcontact/xml/info?email={email}&apikey={apiKey}  
  
EXAMPLE:  
http://localhost:2900/fullcontact/xml/info?email=bart@fullcontact.com&apiKey=123abc  
  
START:  
cd /app/node_apps/fullcontact_svc  
nohup node fullContactServer.js > fullcontact.log &  
  
Use trang to generate xsd files for requests:  
xml2xsd bart_sample.xml fullcontact.xsd  
  
_______________________________________________________________________  
Full Contact API:  
http://api.fullcontact.com/v2/person.xml?email=$email&apiKey=$apiKey  
  
Sandbox API Key is a great place to start. You can get one here:  
http://www.fullcontact.com/sign-up/  
  
Developer Docs:  
http://www.fullcontact.com/developer/docs/  
  
API Code Libraries:  
http://www.fullcontact.com/developer/docs/libraries/  
