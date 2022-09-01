const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership,sequelize,User,Venue } = require('../../db/models');
const { Op, where } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



//validation errors for venue
const validateVenue = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 2 })
        .withMessage('Abbreviation of the State is required'),
    check('lat')
        .exists()
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists()
        .isDecimal()
        .withMessage('Longitude is not valid'),
    handleValidationErrors
  ]
  //validation errors for group
  const validateGroup = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage('Type must be Online or In person'),
    check('private')
        .exists()
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 2 })
        .withMessage('State is required'),
    handleValidationErrors
  ]
  
router.put('/:venueId', requireAuth, validateVenue, async (req,res,next) => {
    let blah = await Venue.findByPk(req.params.venueId)

    if (!blah) {
        const err = new Error('Group couldn\'t be found')
        err.status = 404
        return next(err)
    }


    const group = await Group.findOne({
        where: {
            id:blah.groupId
        }
    })
    const organizer = await User.findOne({
        where:{
            id:group.organizerId,
        }
    })
    
            const cohost = await Membership.findOne({
                where: {
                    groupId: group.id,
                    userId: req.user.id,
                    status: 'co-host'
                },
            })
        
  

//     // start constraints making sure user is verified


    // if the signed in user is either organizer or cohost
    if (organizer || cohost){
        const {address,city,state,lat,lng} = req.body

        blah.set({
          address:address,
          city:city,
          state:state,
          lat:lat,
          lng:lng
  })
  await blah.save()
  res.json(blah)
  

    } else{
        const err = new Error('Current User must be the organizer or a co-host to edit a venue')
            err.status = 403
            return next(err)
    }



    
     




   
})







  module.exports = router;