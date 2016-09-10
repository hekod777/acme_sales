var models = require('../models');
var SalesPerson = models.SalesPerson;
var Region = models.Region;
var SalesPerson_Region = models.SalesPerson_Region;
var express = require('express');
var Promise = require('bluebird');
var router = express.Router();


router.get('/', function(req,res,next){
	Promise.all([
		SalesPerson.findAll({ include: [ SalesPerson_Region ] }),
		Region.findAll()
	])
		.spread (function(salesPeople, regions){
			res.render('salespeople',{
        salesPeople: salesPeople,
        regions: regions
			});
		})
		.catch(next);
});

router.delete('/:id',function(req,res,next){
    SalesPerson_Region.destroy({
      where: { regionId: req.params.id }
    })
		.then(function(){
      return SalesPerson.destroy({
        where: { id: req.params.id }
      });
		})
		.then(function(){
			res.redirect('/salesPeople');
		})
		.catch(next);

});

router.post('/', function(req,res,next){
	SalesPerson.create({
		name: req.body.name
	})
  .then (function(){
    res.redirect('/salesPeople');
  })
  .catch(next);
});

module.exports = router;
