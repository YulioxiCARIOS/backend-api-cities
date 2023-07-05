const Cities = require("../models/citiesmodel")

const citiesControllers = {
    getAllCities: async (req, res) => {
        let cities
        let error = null

        try {
            cities = await Cities.find()
        } catch (err) { error = err }

        res.json({
            response: error ? "Error" : { cities },
            success: error ? false : true,
            error: error

        })
    },
    getOneCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null

        try {
            city = await Cities.find({ _id: id })
        } catch (err) { error = error }
        res.json({
            response: error ? "Error" : { city },
            success: error ? false : true,
            error: error

        })
    },
    modifyCity: async (req, res) => {
        const id = req.params.id
        const data = req.body.data

        let city
        let error = null
        try {
            city = await Cities.findOneAndUpdate({ _id: id }, data, { new: true })
        } catch (err) { error = err }
        res.json({
            response: error ? "Error" : city,
            success: error ? false : true,
            error: error
        })

    },

    addCity: async (req, res) => {
        const {name, country, continent,language,description, image} = req.body.data

        let city
        let error = null
        try {
            let verifyCity = await Cities.find({ name: { $regex: city.name, $options: "i" } })
            if (verifyCity.length == 0) {
                city = await new Cities({
                    name: name,
                    country: country,
                    continent:continent,
                    language:language,
                    description: description,
                    image: image,
                }).save()
            } else {
                error = "La ciudad ya existe en la BD con el id: " + verifyCity[0]._id
            }
        } catch (err) { error = err }
        res.json({
            response: error ? "Error" : city,
            success: error ? false : true,
            error: error
        })
    },

    addMultiplesCities: async (req, res) => {
        let error = []
        let cities = []
        for (let city of req.body.data) {
        try {
                let verifyCity = await Cities.find({ name: { $regex: city.name, $options: "i" } })
                if (verifyCity.length == 0) {
                    let dataCity = {
                        name: city.name,
                        country: city.country,
                        continent:city.continent,
                        language:city.language,
                        description: city.description,
                        image: city.image
                    }
                    await new Cities({
                        ...dataCity
                    }).save()
                    cities.push(dataCity)
                } else {
                    error.push({
                        name: city.name,
                        result: "Ya existe en la base de datos con el Id: " + verifyCity[0]._id
                    })
                }

            }
         catch (err) { error.push({name: city.name, err})}
        }
        res.json({
            response: error.length > 0 && cities.length === 0 ? "Error" : cities,
            success: error.length > 0 ? (cities.length > 0 ? "Warning" : false) : true,
            error: error
        })

    },

    removeCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null

        try {
            city = await Cities.findOneAndDelete({ _id: id })
        } catch (err) { error = error }
        res.json({
            response: error ? "Error" : city,
            success: error ? false : true,
            error: error


        })
    },

//Eliminar varios datos al mismo tiempo
    removeManyCity: async (req, res) => {
        const data = req.body.data
        let citiesDelete = []
        let error = []
        for (let id of data) {
        try {
            let city
            
                city = await Cities.findOneAndDelete({ _id: id })
                console.log(city)
                if (city) {
                    citiesDelete.push(city)
                } else {
                    error.push({
                        id: id,
                        error: "No se encontro el id para eliminar"
                    })
                }

            }
         catch (err) { error.push ({err, name:city.name})}
        }
        res.json({
            response: error.length > 0 && citiesDelete.length === 0 ? "Error" : citiesDelete,
            success: error.length > 0 ? (citiesDelete.length > 0 ? "Warning" : false) : true,
            error: error
        })
    } 
};
module.exports = citiesControllers