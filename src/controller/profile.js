const { profile, user } = require('../../models')

exports.getProfiles = async(req, res) => {
    try {
        const data = await profile.findAll({
            include: [
                {
                    model: user,
                    as: "users",
                    attributes: {
                        exclude: ['updatedAt', 'createdAt'],
                    }
                }
            ]
        })

        res.send({
            status: "Success",
            data
        })
    } catch (error) {
        res.send({
            status: "Failed",
            message: error.message
        })
    }
}

exports.updateProfile = async(req, res) => {
    try {
        const id = req.params.profile
        
        const profileData ={
            email: req.body.email,
            gender: req.body.gender,
            address: req.body.address,
            image: req.body.image,
            phone: req.body.phone,
        }

        await profile.update(profileData, {
            where: {
                userId: id
            }
        })

        const data = await profile.findOne({
            where: {
                userId: id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId']
            },
            include: [
                {
                    model: user,
                    as: 'users',
                    attributes: {
                        exclude: ['updatedAt', 'createdAt', 'password']
                    }
                }
            ]
        })

        res.send({
            status: "Success",
            data
        })
    } catch (error) {
        res.send({
            status: "Failed",
            message: error.message
        })
    }
}