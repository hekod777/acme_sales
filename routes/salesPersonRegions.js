var models = require('../models');
var SalesPersonRegion = models.SalesPerson_Region;
var express = require('express');
var router = express.Router();


router.delete('/:salesPersonId/:regionId', function(req, res, next){
  SalesPersonRegion.destrory({
    where: {
      regionId: req.params.regionId,
      salesPersonId: req.params.salesPersonId
    }
  })
  .then(function(){
    res.redirect(req.url.backTo);
  })
  .catch(next);
});

router.post('/:salesPersonId/:regionId', function(req,res,next){
  SalesPersonRegion.create({
    regionId: req.params.regionId,
    salesPersonId: req.params.salesPersonId
  })
  .then(function(){
    res.redirect(req.url.backTo);
  })
  .catch(next);
});

module.exports = router;
