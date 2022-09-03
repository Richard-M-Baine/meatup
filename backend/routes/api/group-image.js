const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership,sequelize,EventImage,User,Venue,Attendance,Event } = require('../../db/models');
const { Op, where } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.delete('/:imageid', requireAuth, async (req,res,next) => {
    const groupImage = await GroupImage.findByPk(req.params.imageid)

    if (!groupImage) {
        res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
       
       
    }
    const group = await Group.findOne({
        where: {
            id: groupImage.groupId
        }
    })

    const user = await User.findOne({
        where: {
            id:group.organizerId
        }
    })

    if (user.id === group.organizerId){
        await groupImage.destroy()
        res.json({message: "Successfully deleted", statusCode: 200})

    }

    else {
        const err = new Error('Only the owner can delete an image')
        err.status = 403
        return next(err)
    }

} )






module.exports = router