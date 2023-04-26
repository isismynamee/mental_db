const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {user, profile} = require('../../models')

exports.regist = async(req, res) => {

    const schemajoi = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        userName: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
    })

    const {error} =  schemajoi.validate(req.body)

    if(error)
    return res.status(404).send({
        error:{
            message: error.message
        }
    })
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const createdUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: hashedPass
        }
        const newUserRegist = await user.create(createdUser)

        const newProfileR = {
            userId: newUserRegist.id,
            image: req.body.image,
            email: req.body.email,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone
        }
        
        const profileRegist = await profile.create(newProfileR)

        res.status(200).send({
            status: 0,
            data: {newUserRegist, profileRegist}
        })
        
    } catch (error) {
        res.send({
            status: 1,
            message: (error.message)
        })
    }
}

exports.login = async(req, res) => {
    const schemajoi = Joi.object({
      userName: Joi.string().min(4).required(),
      password: Joi.string().min(6).required(),
    });
    
    const { error } = schemajoi.validate(req.body);
    
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
  
    try {
      const data = await user.findOne({
        where: {
          userName: req.body.userName,
        },
        include: [
            {
                model: profile,
                as: "users",
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'userId', 'id']
                }
            }
        ],
      });
      
      const valid = await bcrypt.compare(req.body.password, data.password);
  
      if (!valid) {
        return res.status(400).send({
          status: 1,
          message: (error.message)
        });
      }
  
      const token = jwt.sign({ id: data.id }, process.env.PRIVATE_KEY);

      res.status(200).send({
        status: 0,
        data: {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            userName: data.userName,
            users: data.users
        },
        token
      });
    } catch (error) {
      res.status(500).send({
        status: 1,
        message: error.message,
      });
    }
}

exports.auth = async(req, res) => {
    try {
      const id = req.user.id;

      const dataUser = await user.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });

      if (!dataUser) {
        return res.status(404).send({
          status: 1,
        });
      }

      res.send({
        status: 0,
        data: {
          user: {
            id: dataUser.id,
            userName: dataUser.userName,
          },
        },
      });
    } catch (error) {
      res.status({
        status: 1,
        message: error.message,
      });
    }
}