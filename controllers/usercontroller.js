const UserModel = require('../models/usermodel');

const UserController = {

    getAll: async (request, response) => {
        try {
            let result = await UserModel.find({})
            response.status(200).send({
                isSuccessfull: true,
                data: result,
                message: "Data fetched successfully",
            })
        } catch (error) {
            response.status(500).send({
                isSuccessfull: false,
                data: error,
                message: "internal server error",
                error: error.message,
            })
        }
    },

    getById: async (request, response) => {
        try {
            let id = request.params.id
            let result = await UserModel.findById(id)
            response.status(200).send({
                isSuccessfull: true,
                data: result,
                message: "data fetch successfully",
            })
        } catch (error) {
            response.status(500).send({
                isSuccessfull: false,
                data: null,
                message: "No data found for this ID",
                error: error.message,
            });
        }

    },


    add: async (request, response) => {
        try {
            const body = request.body
            let obj = {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password
            }

            let existingUser = await UserModel.findOne({
                email: obj.email
            })
            if (existingUser) {
                response.status(409).send({
                    isSuccessfull: false,
                    data: null,
                    message: "user already exists with this email",
                })
                return; 
            }

            let UserObj = new UserModel(obj)
            UserObj.save().then((result) => {
                response.status(201).send({
                    isSuccessfull: true,
                    data: result,
                    message: "user added successfully",
                })
            }).catch((err) => {
                response.status(500).send({
                    isSuccessfull: false,
                    data: null,
                    message: "internal server error",
                    error: err,
                })
            });

        } catch (error) {
            response.status(500).send({
                isSuccessfull: false,
                data: error,
                message: "internal server error",
                error: error.message,
            });
        }

    },


    update: (request, response) => {
        try {
            let id = request.params.id;
            let body = {
                ...request.body,
                updated_at: new Date()
            };
            UserModel.findByIdAndUpdate(id, body, { new: true })
                .then((result) => {
                    response.status(200).send({
                        isSuccessfull: true,
                        data: result,
                        message: "User updated successfully",
                    })
                })
                .catch((err) => {
                    throw err;
                });

        } catch (error) {
            response.status(500).send({
                isSuccessfull: false,
                data: error,
                message: "internal server error",
                error: error.message,
            });
        }
    },

    
    del: (request, response) => {
        try {
            let id = request.params.id;
            UserModel.findByIdAndDelete(id)
                .then((result) => {
                    response.status(200).send({
                        isSuccessfull: true,
                        data: null,
                        message: "user deleted successfully",
                    })
                })
                .catch((err) => {
                    response.status(500).send({
                        isSuccessfull: false,
                        data: null,
                        message: "Internal Server Error",
                        error: err.message,
                    })
                });
        } catch (err) {
            response.status(500).send({
                isSuccessfull: false,
                data: err,
                message: "internal server error",
                error: err.message,
            });
        }
    },
}


module.exports = UserController;