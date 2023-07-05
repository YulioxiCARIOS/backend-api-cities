const Router=require("express").Router()

const citiesControllers=require("../controllers/citiescontrollers")

const {getAllCities,getOneCity,removeCity,addCity,addMultiplesCities, modifyCity,removeManyCity}=citiesControllers

Router.route("/cities")
.get(getAllCities)
.post(addCity)
.delete(removeManyCity)

Router.route("/cities/:id")
.get(getOneCity)
.delete(removeCity)
.put(modifyCity)

Router.route("/multiplescities")
.post(addMultiplesCities)


module.exports = Router