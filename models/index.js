var Sequelize = require('sequelize');
//use environment variables
var db = new Sequelize('postgres://localhost:5432/acme_sales');

var SalesPerson = db.define('salesperson',{
	name:{
		type:Sequelize.STRING,
		allowNull:false,
	}
},{
	classMethods:{
    /*
     * Not good.. this swallows exception-- plus
     * you can just use SalesPerson.getById()
		getSalesPerson: function(theid){
			return SalesPerson.findAll({
				where:{
					id: theid
				}
			})
				.catch(console.log.bind(console));
		}
    */
	}
});

var Region = db.define('region',{
	zipcode:{
		type:Sequelize.STRING,
		allowNull:false,
	}
},{
	classMethods:{
    /*
     * see my comments from SalesPerson-- same applies
		getRegion: function(theid){
			return Region.findAll({
				where:{
					id:theid
				}
			})
				.catch(console.log.bind(console));
		}
    */
	}
})

//name this model SalesPersonRegion - we're using camel case, so no underscores.
var SalesPerson_Region = db.define('salesperson_region',{});

SalesPerson.hasMany(SalesPerson_Region);
Region.hasMany(SalesPerson_Region);
SalesPerson_Region.belongsTo(SalesPerson);
SalesPerson_Region.belongsTo(Region);

module.exports = {
  sync: function(){
    return db.sync({ force: true });
  },
	SalesPerson: SalesPerson,
	Region: Region,
	SalesPerson_Region: SalesPerson_Region,
};
