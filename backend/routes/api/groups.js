const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership,sequelize,User,EventImage,Venue,Event,Attendance } = require('../../db/models');
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
router.get('/:groupId/events', async (req,res,next) => {
  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    const err = new Error('Group couldn\'t be found')
    err.status = 404
    return next(err)
}

//copy here
let eventArray = await Event.findAll({
  attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate','endDate'],
  where: {
    groupId:req.params.groupId
  },
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

router.get('/:groupId/members', requireAuth, async (req,res,next) => {
const group = await Group.findByPk(req.params.groupId)

if (!group) {
  const err = new Error('Group couldn\'t be found')
  err.status = 404
  return next(err)
}

if (group.organizerId === req.user.id){
  const Members = await User.findAll({
    attributes: ['id','firstName','lastName'],
    include: {
      model: Membership,
      attributes: ['status'],
      where: {
        groupId: req.params.groupId
      }
    }
  })
  res.json({Members})
}
else {
  const Members = await User.findAll({
    attributes: ['id','firstName','lastName'],
    include: {
      model: Membership,
      attributes: ['status'],
      where: {
        groupId: req.params.groupId,
        status: {
          [Op.not]: ['pending']
        }
      }
    },
    
  })

  res.json({ Members })
}



})


router.put('/:groupId/membership', requireAuth, async (req,res,next) => {
  const group = await Group.findByPk(req.params.groupId)

  const membership = await Membership.findOne({
    where: {
        groupId: req.params.groupId,
        userId: req.body.memberId
    },
})

const cohost = await Membership.findOne({
  where: {
      groupId: req.params.groupId,
      userId: req.user.id,
      status: 'co-host'
  },
})

if (!group) {
  const err = new Error('Group couldn\'t be found')
  err.status = 404
  return next(err)
}

if (!membership) {
  const err = new Error('Membership between the user and the group does not exits')
  err.status = 404
  return next(err)
}

if (req.body.status === 'pending') {
  const err = new Error('Cannot change a membership status to pending')
  err.status = 400
  return next(err)
}

if (req.body.status === 'co-host' && group.organizerId !== req.user.id) {
  const err = new Error('Current User must be the organizer to add a co-host')
  err.status = 403
  return next(err)
}

if (group.organizerId === req.user.id || cohost) {
  membership.status = req.body.status
  await membership.save()
  res.json({ id: membership.id, groupId: membership.groupId, memberId: membership.userId, status: membership.status })
} else {
  const err = new Error('Current User must be the organizer or a co-host to make someone a member')
  err.status = 403
  return next(err)
}



})

router.post('/:groupId/membership', requireAuth, async (req,res,next) => {
  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    const err = new Error('Group couldn\'t be found')
    err.status = 404
    return next(err)
}
const Membership = await Membership.findOne({
  where: {
    groupId:req.params.groupId,
    userId: req.user.id
  }
})

if (Membership){
  if (Membership.status === 'pending') {
    const err = new Error('Membership has already been requested')
    err.status = 400
    return next(err)
}
if (Membership.status === 'member' || Membership.status === 'co-host') {
    const err = new Error('User is already a member of the group')
    err.status = 400
    return next(err)
}

}

const createMember = await Membership.create({
  userId: req.user.id,
  groupId: Number(req.params.groupId),
  status: 'pending'
})

const returnObject = {groupId:createMember.userId,userId:createMember.userId,status:createMember.status}

res.json(returnObject)
})



// went by docs 
router.delete('/:groupId/membership', requireAuth, async (req,res,next) => {

  const group = await Group.findByPk(req.params.groupId)
  const membership = await Membership.findOne({
    where: {
      groupId: req.params.groupId,
      userId: req.body.memberId
    }
  })

  if (!group) {
    const err = new Error('Group couldn\'t be found')
    err.status = 404
    return next(err)
}
if (!membership) {
  const err = new Error('Membership between the user and the group does not exits')
  err.status = 404
  return next(err)
}

if (req.user.id !== group.organizerId && req.user.id !== req.body.memberId) {
  const err = new Error('Only the User or organizer may delete a Membership')
  err.status = 403
  return next(err)
}
await membership.destroy()
        res.json({
            message: "Successfully deleted membership from group"
        })




})

router.get('/:groupId/venues', async (req,res,next) => {

  const venue = await Venue.findAll({
    where: {
      groupId: req.params.groupId
    }
  })
  if (!venue.length) {
    const err = new Error('Group couldn\'t be found')
    err.status = 404
    res.json(err)
}
res.json(venue)
})

// add an image to group
router.post('/:groupId/images',requireAuth, async (req,res) =>{
  const {groupId} = req.params
  const findgroupId = await Group.findOne({where:{organizerId:req.user.id}})
  if(!findgroupId.length){
      res.json({
          "message": "Group couldn't be found",
          "statusCode": 404
        })
  }
  const{urll,previeww} = req.body

  const groupImage = await GroupImage.create(
  {groupId:groupId,
      url:urll,
      preview:previeww
  })
  return res.json({
      id:groupImage.id,
      url:groupImage.url,
      preview:groupImage.preview
  })
})


router.post('/:groupId/events', requireAuth, async (req,res) => {
  
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

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
                groupId: req.params.groupId,
                userId: req.user.id,
                status: 'co-host'
            },
        })

        if (group.organizerId === req.user.id || cohost) {
            const event = await Event.create({ groupId: Number(req.params.groupId), venueId, name, type, capacity, price, description, startDate, endDate })

            res.json({ id: event.id, groupId: event.groupId, venueId, name, type, capacity, price, description, startDate, endDate })
        } else {
            const err = new Error('Current User must be the organizer or a co-host to create an event')
            err.status = 403
            return next(err)
        }

    }
  




)

router.post('/:groupId/venues', requireAuth, async (req,res,next) => {
  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    const err = new Error('Group couldn\'t be found')
    err.status = 404
    return next(err)
}

const cohost = await Membership.findOne({
  where: {
      groupId: req.params.groupId,
      userId: req.user.id,
      status: 'co-host'
  },
})

const { address, city, state, lat, lng } = req.body

if (group.organizerId === req.user.id || cohost) {
  const newVenue = await Venue.create({ groupId: req.params.groupId, address, city, state, lat, lng })

  res.json({ id: newVenue.id, groupId: newVenue.groupId, address: newVenue.address, city: newVenue.city, state: newVenue.state, lat: newVenue.lat, lng: newVenue.lng })
} else {
  const err = new Error('Current User must be the organizer or a co-host to create a venue')
  err.status = 403
  return next(err)
}

})

// make an exciting group
router.post(
  '/',
  requireAuth,
  validateGroup,
  async (req, res, next) => {
 
      const { name, about, type, private, city, state } = req.body
      const newGroup = await Group.create({
          organizerId: req.user.id,
          name,
          about,
          type,
          private,
          city,
          state
      })

      res.json(newGroup)
  }
)


// groups joined by logged in user
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






res.json({'Groups':bossArray})

}
)


//get by groupid
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


  //update a group
router.put('/:groupId',requireAuth,async(req,res,next) => {
  const group = await Group.findByPk(req.params.groupId)

  //no group per stackoverflow
  if (!group) {
    const err = new Error('Group couldn\'t be found')
    err.status = 404
    return next(err)
}

// better way
if (group.organizerId !== req.user.id) {
  const err = new Error('You must be the owner to edit this group')
  err.status = 403
  return next(err)
}

const { name, about, type, private, city, state } = req.body

group.set({
  name: name,
  about: about,
  type: type,
  private: private,
  city: city,
  state: state
})



await group.save()


res.json(group)





})



router.delete('/:groupId',requireAuth,async(req,res,next) => {
  const group = await Group.findByPk(req.params.groupId)

     //Group cannot be found
     if (!group) {
      const err = new Error('Group couldn\'t be found')
      err.status = 404
      return next(err)
  }
  //Only the owner can delete the group
  if (group.organizerId !== req.user.id) {
      const err = new Error('You must be the owner to delete this group')
      err.status = 403
      return next(err)
  }
  // you served me well meetup group enjoy your retirement
  await group.destroy()

        res.status(200).json({ message: "Successfully deleted", statusCode: 200 })

})


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