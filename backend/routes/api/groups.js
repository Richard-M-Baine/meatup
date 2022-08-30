const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership } = require('../../db/models');
const { Op, where } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


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

res.json(scaryarray)
})

module.exports = router;