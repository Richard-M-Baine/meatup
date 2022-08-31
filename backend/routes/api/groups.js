const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership,sequelize,User,Venue } = require('../../db/models');
const { Op, where } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();





router.get(
  '/:groupId',
  async (req, res, next) => {
      const group = await Group.findByPk(req.params.groupId)

      if (!group) {
        const err = new Error('Group couldn\'t be found')
        err.status = 404
        return next(err)
    }

      const numMembers = await Membership.findAll({
        where: {
          groupId:req.params.groupId
        }
      })
      number = numMembers.length
      
      const groupImages = await GroupImage.findAll({
        attributes:['id','url','preview'],
        where: {
          groupId:req.params.groupId
        }
      })

      let {id:value1,organizerId:value2,name:value3,about:value4,type:value5,private:value6,city:value7,
        state:value8,createdAt:value9,updatedAt:value10,previewImage:value11} = group


      const organizer = await User.findOne({
        attributes: ['id','firstName','lastName'],
        where: {
          id: value2
        }
      })
      const venues = await Venue.findAll({
       where: {
        groupId:req.params.groupId
       }
      
      })


     



let object = {id:value1,organizerId:value2,name:value3,about:value4,type:value5,private:value6,city:value7,state:value8,createdAt:value9,updatedAt:value10,
  "numMembers":number,groupImages,organizer,venues}


res.json(object)


  })




router.get('/current',requireAuth,async (req, res, next) => {
      const groupBoss = await Group.findAll({
        where: {
          organizerId: req.user.id
        },
        include: [
          {
            model: GroupImage, // good except numberOf
            as: 'previewImage',
            attributes: ['url'],
            limit: 1
          },
        ],
      })
      bossArray = []
      const groupSoldaten = await Group.findAll({
        include: [
          {
            model: GroupImage, // worse comes to worse do object destructure in am
            as: 'previewImage',
            attributes: ['url'],
            limit: 1
          },
          {
            model: Membership,
            attributes: [],
            where: {
              userId: req.user.id
            }
          }
        ]
      })

      const members = await Membership.findAll()


      for (let i = 0; i < groupBoss.length; i ++){
        let group = groupBoss[i]
        let {id:value1,organizerId:value2,name:value3,about:value4,type:value5,private:value6,city:value7,state:value8,createdAt:value9,updatedAt:value10,previewImage:value11} = group
        let count = 0
        for (let i = 0; i < members.length; i ++){
            let member = members[i]
            if (member.groupId === value1){count = count + 1}
        }
        let numMembers = 'numMembers'
        let object = {id:value1,organizerId:value2,name:value3,about:value4,type:value5,private:value6,city:value7,state:value8,createdAt:value9,updatedAt:value10,numMembers:count,previewImage:value11}
        bossArray.push(object)

 
    }






    res.json({'Groups':groupSoldaten})
    
}
)


router.get('/', async (req,res,next) => {
let returnobject = {}
    const groups = await Group.findAll({
        include: [
            {
                model: GroupImage,
                as: 'previewImage',
                attributes: ['url'],
                limit: 1            
            },
           
        ],
    })
const members = await Membership.findAll()
   
let scaryarray = []

for (let i = 0; i < groups.length; i ++){
let group = groups[i]
let {id:value1,organizerId:value2,name:value3,about:value4,type:value5,private:value6,city:value7,state:value8,createdAt:value9,updatedAt:value10,previewImage:value11} = group
let count = 0
for (let i = 0; i < members.length; i ++){
    let member = members[i]
    if (member.groupId === value1){count = count + 1}
}
let numMembers = 'numMembers'
let object = {id:value1,organizerId:value2,name:value3,about:value4,type:value5,private:value6,city:value7,state:value8,createdAt:value9,updatedAt:value10,numMembers:count,previewImage:value11}
scaryarray.push(object)
}  

res.json({'Groups':scaryarray})
})

module.exports = router;