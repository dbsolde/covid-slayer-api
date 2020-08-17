const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = require('../utils')

exports.get_user =  async (req,res) => {
    const id = req.params.userId
    await User
        .findById(id)
        .select('name email avatarImage')
        .exec()
        .then( result => {
            if(result) {
                res.status(200).json({
                    user: result
                })
            } else {
                res.status(404).json({
                    message: 'No user found.'
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.user_register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body // deconstruct req body

        // Find if email already exist
        await User
            .find({ email: email })
            .exec()
            .then( user => {
                if(user.length >= 1) {
                    // send conflict status
                    return res.status(409).json({
                        message: 'User already exists'
                    })
                } else {

                    // hash password first before inserting to db
                    bcrypt.hash(password, 10, (err, hash) => {
                        if(err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else {
                            const user = new User({
                                name: name,
                                email: email,
                                avatarImage: req.file.filename,
                                password: hash
                            });

                            // Let's save details
                            user.save()
                            
                            .then( result => {
                                res.status(201).json({
                                    message: 'Account succesfully created.'
                                })
                            })
                            .catch( err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                        }
                    })
                }
            })
        } catch(error) {
            res.status(500).json({
                error: err
            })
        }
}

exports.user_login = async (req, res, next) => {
    // deconstruct req body
    const {
        email,
        password,
    } = req.body

    // Find if user exists
    await User
        .findOne({ email: email })
        .exec()
        .then( user => {
            if(user.length < 1) {
                return res.status(401).json({
                    status: 401,
                    message: 'Invalid email address or password'
                })
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        return res.status(401).json({
                            message: 'Invalid email address or password'
                        })
                    }
                    if(result) {
                        // put values for jwt
                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        }
                        ,`${secretkey}`, // add jwt key
                        {
                            expiresIn: "1h" // token will expre within an hour
                        })
                        
                        return res.status(200).json({
                            message: 'Successfully login',
                            token: token,
                            userId: user._id
                        })
                    }
                    return res.status(401).json({
                        message: 'Invalid email address or password'
                    })
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
}