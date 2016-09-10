//just name this route regions, not regionroutes
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
		Region.findAll({ include: [ SalesPerson_Region ]}),
	])
		.spread (function(regions, salesPeople){
			res.render('region',{
				regions: regions,
				salesPeople: salesPeople
			});
		})
		.catch(next);
});
/* see the code in routes salesPeople.js
 * the routes should be the similar
 */

module.exports = router;
