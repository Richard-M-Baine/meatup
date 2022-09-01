const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership,sequelize,EventImage,User,Venue,Attendance,Event } = require('../../db/models');
const { Op, where } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();




router.get('/',  async (req,res,next) => {

// starting with queryschisse
let {page, size, name, type, startDate} = req.query

if (page){
    if (page < 0) page = 1
    else if (page > 10) page = 10
    else page = Number(page)
} else {page = 1}

if (size){
    if (size < 0){size = 1}
    else if (size > 20){size = 20}
    else size = Number(size)
}else {size = 20}

let pagification = {limit: size, offset: size * page}

let queries = { where: {} }

        if (name) queries.where.name = { [Op.substring]: name }
        if (type) queries.where.type = type
        if (startDate && !isNaN(Date.parse(startDate))) queries.where.startDate = startDate

const events = await Event.findAll({
    attributes: ['id','groupId','venueId','name','type','startDate'],
   
})

let returnObject = []

for (let i = 0; i < events.length; i ++){
    let event = events[i]
    let array = []
    let previewImage = await EventImage.findOne({
        attributes: ['url'],
        where: {
            eventId:event.id,
            preview: true
        }
    })
    let attendence = await Attendance.findAll({
        where: {
            eventId: event.id,
            status: {
                [Op.not]: 'pending'
            }
        }
    })
    //attendence.length is all that is needed
    let group = await Group.findOne({
        attributes: ['id','name','city','state'],
        where: {
            id:event.groupId
        }
    })

    let venue = await Venue.findOne({
        attributes: ['id','city','state'],
        where: {
            id:event.venueId
        }
    })
    returnObject.push(venue)
    
    
}

res.json(returnObject)

})







module.exports = router;