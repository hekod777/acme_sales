var express = require('express');
var swig = require('swig');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


app.set('view engine','html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache:false});

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use('/salesPeople', require('./routes/salesPeople'));
app.use('/region', require('./routes/regions'));
app.use('/salesPersonRegions', require('./routes/salesPersonRegions'));

app.get('/',function(req, res, next){
	res.render('index');
});

if(process.env.SYNC){
  require('./models').sync()
    .then(function(){
      console.log('tables created');
    })
    .catch(function(err){
      console.log(err);
    });

}


var port = process.env.PORT;
app.listen(port, function(){
  console.log('listening on port ' + port);
});
