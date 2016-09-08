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

			salespersons.forEach(function(item){
				item.get().locations = [];
					regions.forEach(function(item2){
						var copy_item2 = Object.assign({},item2.get());
						salespersonregion.forEach(function(item3){
							if (item3.get().salespersonId == item.get().id && item3.get().regionId == copy_item2.id){
								console.log ('connected');
								copy_item2.toremove = true;
								console.log (copy_item2.toremove);
							}
						})			
						item.get().locations.push(copy_item2);
					})
				results.push(item.get());
			})

			console.log(results[0]);
			
			res.render('salesperson',{
				salespersons: results,
			});
		})
		.catch(next);
})


router.put('/salesPersonRegions/:salespersonid/remove/:regionid', function(req,res,next){
	SalesPerson_Region.findOne({
		where:{
			salespersonId: req.params.salespersonid,
			regionId: req.params.regionid,
		}
	})
		.then(function(theLink){
			return theLink.destroy();
		})
		.then(function(){
			if (req.query.back == 'sales'){
				return res.redirect('/salesperson');
			}
			else {
				return res.redirect('/region');
			}	
		})
		.catch(next);
})


router.put('/salesPersonRegions/:salespersonid/add/:regionid', function(req,res,next){
	SalesPerson_Region.create({
		salespersonId: req.params.salespersonid,
		regionId: req.params.regionid,
	})
		.then(function(){
			if (req.query.back == 'sales'){
				return res.redirect('/salesperson');
			}
			else {
				return res.redirect('/region');
			}
		})
});

router.delete('/deleteperson/:id',function(req,res,next){

	Promise.all([
		SalesPerson.findOne({
			where:{
				id: req.params.id,
			}
		}),
		SalesPerson_Region.findAll({
			where:{
				salespersonId: req.params.id,
			}
		}),
	])
		.spread(function(theperson, theLinks){
			theperson.destroy();
			theLinks.forEach(function(link){
				link.destroy();
			})
		})
		.then(function(){
			res.redirect('/salesperson');
		})
		.catch(next);

});

router.post('/add', function(req,res,next){
	SalesPerson.create({
		name: req.body.newperson
	})
		.then (function(){
			res.redirect('/salesperson');
		})
})

module.exports = router;