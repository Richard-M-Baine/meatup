const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership,sequelize,EventImage,User,Venue,Attendance,Event } = require('../../db/models');
const { Op, where } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// need to alter preview image // test when you have a chance
const validateEvent = [
    check('venueId')
        .custom(
            async (val, { req }) => {
                const venue = await Venue.findByPk(val)
                if (venue) return true
                else return false
            }
        )
        .withMessage('Venue doesnt exist'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Name must have at least 5 characters'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['In Person', 'Online'])
        .withMessage('Type must be Online or In Person'),
    check('capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity must be an integer'),
    check('price')
        .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
        .withMessage('Price is invalid'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('startDate')
        .isAfter()
        .withMessage('Start date must be in the future'),
    check('endDate')
        .custom(
            (val, { req }) => {
                return (Date.parse(val) - Date.parse(req.body.startDate)) >= 0
            }
        )
        .withMessage('End date must be after the start date'),
    handleValidationErrors
]





router.post('/:eventId/images',requireAuth,async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }
        const group = await Group.findOne({
            where:{
                id: event.groupId
            }

        })
        
        const attendance = await Attendance.findOne({ where: { eventId: req.params.eventId, userId: req.user.id, status: 'member' } })

        if (group.organizerId === req.user.id || attendance) {
            const newImage = await EventImage.create({ eventId: Number(req.params.eventId), url: req.body.url, preview: false})
            res.json({ id: newImage.id, url: newImage.url, preview:false })
        } else {
            const err = new Error('User must be either the organizer or an attendee to upload images')
            err.status = 403
            return next(err)
        }
    }
)

router.post('/:eventId/attendees', requireAuth, async (req,res,next) => {
    const event = await Event.findByPk(req.params.eventId)

    if (!event) {
        const err = new Error('Event couldn\'t be found')
        err.status = 404
        return next(err)
    }
    const Attendance = await Attendance.findOne({ 
        where: {
         eventId: req.params.eventId,
          userId: req.user.id, 
        } })

        if (Attendance) {
            if (Attendance.status === 'pending') {
                const err = new Error('Attendance has already been requested')
                err.status = 400
                return next(err)
            }
            if (Attendance.status === 'member' || Attendance.status === 'waitlist') {
                const err = new Error('User is already an attendee of this event')
                err.status = 400
                return next(err)
            }
        }
        const participant = await Attendee.create({
            eventId: Number(req.params.eventId),
            userId: req.user.id,
            status: 'pending'
        })
const returnObject = {
    eventId:participant.eventId,
    userId: req.user.id,
    status: 'pending'
}
res.json(returnObject)

})

router.put('/:eventId/attendees', requireAuth, async (req,res,next) => {

    const event = await Event.findByPk(req.params.eventId)

    if (!event) {
        const err = new Error('Event couldn\'t be found')
        err.status = 404
        return next(err)
    }

    const group = await Group.findOne({
        where: {id:event.groupId}
    })

    const cohost = await Member.findOne({
        where: {
            groupId: group.id,
            memberId: req.user.id,
            status: 'co-host'
        },
    })

    const attendance = await Attendance.findOne({
        where: {
            eventId: req.params.eventId,
            userId: req.body.userId,
        }
    })

    if (!attendance) {
        const err = new Error('Attendance between the user and the event does not exist')
        err.status = 404
        return next(err)
    }

    if (req.body.status === 'pending') {
        const err = new Error('Cannot change an attendance status to pending')
        err.status = 400
        return next(err)
    }

    
    if (group.organizerId === req.user.id || cohost) {
        attendance.status = req.body.status
        await attendance.save()
        res.json({ id: attendance.id, eventId: attendance.eventId, userId: attendance.userId, status: attendance.status })
    } else {
        const err = new Error('Current User must be the organizer or a co-host to update an attendance')
        err.status = 403
        return next(err)
    }


})

router.get('/:eventId/attendees',async (req,res,next) => {

    const theEvent = await Event.findByPk(req.params.eventId)

    if (!theEvent){
        const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
    }
 const group = await Event.findOne({
    where: {
        id:theEvent.groupId
    }
 })
 const cohost = await Member.findOne({
    where: {
        groupId: group.id,
        memberId: req.user.id,
        status: 'co-host'
    }
})

if (group.organizerId === req.user.id || cohost) {
    const Attendees = await User.findAll({
        include: {
            model: Attendee,
            as: 'Attendance',
            attributes: ['status'],
            where: {
                eventId: req.params.eventId
            }
        }
    })
    res.json({ Attendees })
}

else {

    const Attendees = await User.findAll({
        include: {
            model: Attendee,
            as: 'Attendance',
            attributes: ['status'],
            where: {
                eventId: req.params.eventId,
                status: {
                    [Op.not]: 'pending'
                }
            }
        }
    })
    res.json({ Attendees })
}



})

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

router.delete('/:eventId', requireAuth, async (req,res,next) => {
    const event = await Event.findByPk(req.params.eventId)

    if (!event) {
        const err = new Error('Event couldn\'t be found')
        err.status = 404
        return next(err)
    }

    const group = Group.findOne({
        where: {
            id:event.groupId
        }
    })

    const cohost = await Membership.findOne({
        where: {
            groupId: group.id,
            userId: req.user.id,
            status: 'co-host'
        },
    })
    if (group.organizerId === req.user.id || cohost) {
        await event.destroy()
        res.json({ message: 'Successfully deleted' })
    } else {
        const err = new Error('Current User must be the organizer or a co-host to delete an event')
        err.status = 403
        return next(err)
    }


})

router.put('/:eventId',requireAuth,validateEvent, async (req, res, next) => {
        const event = await Event.findByPk(
            req.params.eventId,
            {
                attributes: ['id', 'groupId', 'venueId', 'name', 'type',
                    'capacity', 'price', 'description', 'startDate', 'endDate']
            }
        )

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

        const group = Group.findOne({
            where: {
                id:event.groupId
            }
        })

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        if (venueId) {
            const venue = await Venue.findByPk(venueId)

            if (!venue) {
                const err = new Error('Venue couldn\'t be found')
                err.status = 404
                return next(err)
            }
        }
        const cohost = await Membership.findOne({
            where: {
                groupId: group.id,
                userId: req.user.id,
                status: 'co-host'
            },
        })

        if (group.organizerId === req.user.id || cohost) {
            await event.set({ venueId, name, type, capacity, price, description, startDate, endDate })
            await event.save()
            res.json({ id: event.id, groupId: group.id, venueId, name, type, capacity, price, description, startDate, endDate })
        } else {
            const err = new Error('Current User must be the organizer or a co-host to edits an event')
            err.status = 403
            return next(err)
        }
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