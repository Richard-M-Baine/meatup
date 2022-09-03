const express = require('express');

const { restoreUser, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, sequelize, GroupImage, Venue, Attendance, EventImage, Event } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");

const router = express.Router();



    router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const blah = await EventImage.findOne({
        where: {
            id: req.params.imageId
        }
    })

    console.log(blah)
    await blah.destroy()

    res.json({"message": "Successfully deleted",
    "statusCode": 200})
    })




module.exports = router;