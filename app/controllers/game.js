const Game = require('../model/game')
const jwt = require('jsonwebtoken')
const secretkey = require('../utils')

exports.save_history = async (req,res) => {
    const {
        status,
        time,
        player,
        opponent
    } = req.body
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${secretkey}`);
    const game = new Game({
        userId: decodedToken.userId,
        status: status,
        time: time,
        player: player,
        opponent: opponent
    });

    await game.save()  
    .then( result => {
        res.status(201).json({
            message: 'History saved'
        })
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.get_histories = async (req,res) => {

    const perPage = Number(req.params.perPage)
    const page = Number(req.params.page)
    
    // Refactor this :/
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${secretkey}`);

    await Game
        .find({userId: decodedToken.userId })
        .select('status time player opponent')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort({$natural: -1})
        .exec( (err,games) => {
            Game.count().exec( (err,count) => {
                if(err) {
                    res.status(500).json({
                        error: err
                    })
                }
                res.status(200).json({
                    histories: games,
                    currentPage: page,
                    pages: Math.ceil(count / perPage),
                    rowCount: count,
                    pageSize: perPage
                })
            })
        })
}
