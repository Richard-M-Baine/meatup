const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership,sequelize,EventImage,User,Venue,Attendance,Event } = require('../../db/models');
const { Op, where } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.delete('/:imageid', requireAuth, async (req,res,next) => {
    const eventImage = await eventImage.findByPk(req.params.imageid)

    if (!eventImage) {
        const err = new Error('Image couldn\'t be found')
        err.status = 404
        return next(err)
    }
    const event = await Event.findOne({
        where: {
            id: eventImage.eventId
        }
    })

    const group = await Group.findOne({
        where: {
            id:event.groupId
        }

    })

    const user = await User.findOne({
        where: {
            id:group.organizerId
        }
    })

    if (!user){
        await image.destroy()
        res.json({message: "Successfully deleted", statusCode: 200})

    }

    else {
        const err = new Error('Only the owner can delete an image')
        err.status = 403
        return next(err)
    }

} )






module.exports = router