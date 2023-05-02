const { time } = require('../../models')

exports.postTimeTask = async(req, res) => {
    try {
        const {data} = {
            time: req.body.time
        }

        if(data.time === ''){
            res.send({
                status: 1,
                message: "Please insert Time form"
            })
        }else{
            res.send({
                status: 0,
                message: data
            })
        }
    } catch (error) {
        res.send({
            status: 1,
            message: error.message
        })
    }
}