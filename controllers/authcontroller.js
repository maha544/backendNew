const UserModel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
    signup: async (request, response) => {
        try {
            let body = request.body;
            let obj = {
                firstName: body.firstName,
                lastName: body.lastName, 
                email: body.email,
                password: body.password
            };

            let existingUser = await UserModel.findOne({ email: obj.email });

            if (existingUser) {
                response.status(409).send({
                    isSuccessful: false,
                    data: null,
                    message: 'User with this email already exists',
                });
                return;
            } else {
                obj.password = await bcrypt.hash(obj.password, 10);

                let newUser = new UserModel(obj);
                newUser.save()
                    .then((result) => {
                        const token = jwt.sign(
                            { id: result._id, email: result.email },
                            process.env.SECURITY_KEY,
                            { expiresIn: '1h' } 
                        );

                        response.status(201).send({
                            isSuccessfull: true,
                            data: result,
                            token,  
                            message: "User Created Successfully"
                        });
                    })
                    .catch((error) => {
                        throw error;
                    });
            }

        } catch (error) {
            response.status(500).send({
                isSuccessful: false,
                data: null,
                message: "Internal server error",
            });
        }
    },

    login: async (request, response) => {
        try {
            let body = request.body;
            let existingUser = await UserModel.findOne({ email: body.email });

            if (!existingUser) {
                response.status(401).send({
                    isSuccessfull: false,
                    data: null,
                    message: 'Invalid credentials',
                });
                return;
            } else {
                const isCorrectPswd = await bcrypt.compare(body.password, existingUser.password);

                if (isCorrectPswd) {
                    const token = jwt.sign(
                        { id: existingUser._id, email: existingUser.email },
                        process.env.SECURITY_KEY,
                        { expiresIn: '1h' } 
                    );

                    response.status(200).send({
                        isSuccessfull: true,
                        data: existingUser,
                        token
                    });
                } else {
                    response.status(401).send({
                        isSuccessfull: false,
                        data: null,
                        message: 'Invalid password',
                    });
                }
            }

        } catch (error) {
            response.status(500).send({
                isSuccessful: false,
                data: null,
                message: 'Internal server error',
            });
        }
    },

    protected: async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({
                isSuccessfull: false,
                data: null,
                message: 'Token is missing',
            });
        }

        try {
            const loggedInUser = jwt.verify(token, process.env.SECURITY_KEY);
            req.user = loggedInUser; 
            next();
        } catch (error) {
            res.status(401).send({
                isSuccessful: false,
                data: null,
                message: 'Invalid token',
            });
        }
    }
};

module.exports = authController;
