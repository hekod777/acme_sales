var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/acme_sales');

var SalesPerson = db.define('salesperson',{
	name:{
		type:Sequelize.STRING,
		allowNull:false,
	}
},{
	classMethods:{
		getSalesPerson: function(theid){
			return SalesPerson.findAll({
				where:{
					id: theid
				}
			})
				.catch(console.log.bind(console));
		}
	}
});

var Region = db.define('region',{
	zipcode:{
		type:Sequelize.STRING,
		allowNull:false,
	}
},{
	classMethods:{
		getRegion: function(theid){
			return Region.findAll({
				where:{
					id:theid
				}
			})
				.catch(console.log.bind(console));
		}
	}
})

var SalesPerson_Region = db.define('salesperson_region',{});

SalesPerson.hasMany(SalesPerson_Region);
Region.hasMany(SalesPerson_Region);
SalesPerson_Region.belongsTo(SalesPerson);
SalesPerson_Region.belongsTo(Region);

module.exports = {
	SalesPerson: SalesPerson,
	Region: Region,
	SalesPerson_Region: SalesPerson_Region,
};


