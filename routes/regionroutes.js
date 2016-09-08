var models = require('../models');
var SalesPerson = models.SalesPerson;
var Region = models.Region;
var SalesPerson_Region = models.SalesPerson_Region;
var express = require('express');
var Promise = require('bluebird');
var router = express.Router();


router.get('/', function(req,res,next){
	Promise.all([
		SalesPerson.findAll({}),
		Region.findAll({}),
		SalesPerson_Region.findAll({}),
	])
		.spread (function(salespersons, regions, salespersonregion){
			var results = [];
			regions.forEach(function(item){
				item.get().salespeople = [];
					salespersons.forEach(function(item2){
						var copy_item2 = Object.assign({},item2.get());
						salespersonregion.forEach(function(item3){
							if (item3.get().regionId == item.get().id && item3.get().salespersonId == copy_item2.id){
								console.log ('connected');
								copy_item2.toremove = true;
								console.log (copy_item2.toremove);
							}
						})			
						item.get().salespeople.push(copy_item2);
					})
				results.push(item.get());
			})
			
			res.render('region',{
				regions: results,
			});
		})
		.catch(next);
})


router.delete('/deleteregion/:id',function(req,res,next){
	Promise.all([
		Region.findOne({
			where:{
				id: req.params.id,
			}
		}),
		SalesPerson_Region.findAll({
			where:{
				regionId: req.params.id,
			}
		}),
	])
		.spread(function(theregion, theLinks){
			theregion.destroy();
			theLinks.forEach(function(link){
				link.destroy();
			})
		})
		.then(function(){
			res.redirect('/region');
		})
		.catch(next);

});

router.post('/add', function(req,res,next){
	Region.findOrCreate({
		where:{
			zipcode: req.body.newregion,
		}		
	})
		.then (function(){
			res.redirect('/region');
		})
})

module.exports = router;