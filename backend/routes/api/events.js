const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership,sequelize,EventImage,User,Venue,Attendance,Event } = require('../../db/models');
const { Op, where } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// need to alter preview image
router.get('/:eventId', async (req,res,next) => {

    let event = await Event.findByPk(req.params.eventId,{
        attributes: ['id', 'groupId', 'venueId', 'name','description', 'type','capacity','price', 'startDate','endDate'],
        include: [
            {
                model: EventImage,
                as: 'previewImage',
                attributes: ['url'],
                where: {
                    eventId:req.params.eventId
                },
            },
            {
                model: Group,
                attributes: ['id', 'name','private', 'city', 'state']
            },
            {
                model: Venue,
                attributes: ['id','address', 'city', 'state','lat','lng']

            }
        ],

        
        
    })

    if (!event) {
        const err = new Error('Event couldn\'t be found')
        err.status = 404
        return next(err)
    }

    event['previewImage'] = event['EventImages']
    delete event['previewImage']
    
    const eventJSON = event.toJSON()
    const number = await Attendance.findAll({
        where: {
            eventId:req.params.eventId,
            status: 'member'
        }
    })
    const numAttending = number.length
    eventJSON.numAttending = numAttending


   res.json(eventJSON) 
})

router.get('/',  async (req,res,next) => {
// query stuff


    let eventArray = await Event.findAll({
        attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate'],
        include: [
            {
                model: EventImage,
                as: 'previewImage',
                attributes: ['url'],
                where: {
                    preview:true
                },
                limit: 1
            },
            {
                model: Group,
                attributes: ['id', 'name', 'city', 'state']
            },
            {
                model: Venue,
                attributes: ['id', 'city', 'state']

            }
        ],

        
        
    })
    const events = []

    for (let event of eventArray){
        const eventJSON = event.toJSON()
        if (eventJSON.previewImage[0]) eventJSON.previewImage = eventJSON.previewImage[0].url
        let number = await Attendance.findAll({
            where: {
                eventId:event.id,
                status: { [Op.in]: ['member'] }
            }
        })
        let count = number.length
        eventJSON.numAttending = count
        events.push(eventJSON)


    }

   res.json(events) 
})







module.exports = router;