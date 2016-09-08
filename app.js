var express = require('express');
var swig = require('swig');
var app = express();
var bodyParser = require('body-parser');
var models = require('./models/index');
var SalesPerson = models.SalesPerson;
var Region = models.Region;
var SalesPerson_Region = models.SalesPerson_Region;
var methodOverride = require('method-override');
var salesPersonRoutes = require('./routes/salespersonroutes');
var Promise = require('bluebird');
var regionRoutes = require('./routes/regionroutes');


app.set('view engine','html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache:false});

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use('/salesperson', salesPersonRoutes);
app.use('/region',regionRoutes);

app.get('/',function(req,res,next){
	res.render('index.html');
});


app.post('/add',function(req,res,next){
	SalesPerson.create({
		name: req.body.newsalesperson
	})
		.then (function(){
			res.redirect('/');
		})
});

app.post('/addregion', function(req,res,next){
	Region.findOrCreate({
		where:{
			zipcode: req.body.newregion,
		}

	})
		.then (function(){
			res.redirect('/')
		});
})



//SalesPerson.sync({force:true}).then(function(){return Region.sync({force:true})}).then(function(){return SalesPerson_Region.sync({force:true})})
//	.then(function*(){
		app.listen(3000);
//	});



