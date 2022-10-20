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
      .isIn(['Online', 'In Person'])
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


router.put('/:groupId/membership', requireAuth, async(req, res, next) => {
  const { groupId } = req.params
  const { memberId, status } = req.body;
  const { user } = req;

   let currentUser = user.toSafeObject();
   let currentUserId = currentUser.id;

  

  let membership = await Membership.findOne({where: { [Op.and]: [ {userId: memberId}, {groupId} ] } })

  let group = await Group.findByPk(groupId)
 
  let checkUser = await User.findByPk(currentUserId)
  let currentUserMembership = await Membership.findOne({where: { [Op.and]: [ {userId: currentUserId}, {groupId} ] } })

  

  if(status === "pending"){
      res.status = 400;
      return res.json({
          message: "Validation Error",
          statusCode: 400,
          errors: {
              status: "Cannot change a membership status to pending"
          }
      })
  }

  if(!group){
      res.status = 400;
      return res.json({
          message: "Group couldn't be found",
          statusCode: 404,
      })
  }

  

  if(!checkUser){
      res.status = 404;
      return res.json({
          message: "Validation Error",
          statusCode: 400,
          errors: {
              memberId: "User couldn't be found"
          }
      })
  }

  if(!membership){
      res.status = 404;
      return res.json({
          message: "Membership between the user and the group does not exist",
          statusCode: 404
      })
  }
  
 
  if(currentUserMembership.id === group.organizerId){
      membership.update({status})
      return res.json({
          id: membership.id,
          groupId: membership.groupId,
          memberId: membership.userId,
          status: membership.status
      })
  } else if ( currentUserMembership.status === 'co-host'){
      membership.update(status)
      return res.json({
          id: membership.id,
          groupId: membership.groupId,
          memberId: membership.userId,
          status: membership.status
      })
  } else {
      res.status = 400;
      return res.json({
          message: "User must have correct permissions",
          statusCode: 400
      })
  }
})
  


router.post('/:groupId/membership', requireAuth, async (req,res,next) => {
  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    const err = new Error('Group couldn\'t be found')
    err.status = 404
    return next(err)
}
const membership = await Membership.findOne({
  where: {
    groupId:req.params.groupId,
    userId: req.user.id
  }
})

if (membership){
  if (membership.status === 'pending') {
    const err = new Error('Membership has already been requested')
    err.status = 400
    return next(err)
}
if (membership.status === 'member' || membership.status === 'co-host') {
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



// went by docs. geekforgeeks actually responded! 
router.delete('/:groupId/membership', requireAuth, async(req, res, next) => {
  const { groupId } = req.params;
  const { memberId } = req.body;

  let checkGroup = await Group.findByPk(groupId)
  if(!checkGroup){
      res.status = 404;
      return res.json({
          message: "Group couldn't be found",
          statusCode: 404
      })
  }

  let checkUser = await User.findByPk(memberId)
  if(!checkUser){
      res.status = 404;
      return res.json({
          message: "Validation Error",
          statusCode: 404,
          errors: {
              memberId: "User couldn't be found"
          }
      })
  }

  let member = await Membership.findOne({where: { [Op.and]: [ { userId: memberId }, { groupId } ] }}) 
  if(member){
      await member.destroy();
      return res.json({
          message: "Successfully deleted membership from group"
      })
  } else {
       res.status = 400;
  return res.json({
      message: "Membership does not exist for this User",
      statusCode: 404,
  })
  }
 
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
router.post('/:groupId/images',requireAuth, async (req,res,next) =>{
  const {groupId} = req.params

  const{url,preview} = req.body

  const group = await Group.findByPk(req.params.groupId)


if (group){
 if (group.organizerId === req.user.id) {
  const groupImage = await GroupImage.create(
    {groupId,
        url:url,
        preview:preview
    })
  return res.json({
      id:groupImage.id,
      url:groupImage.url,
      preview:groupImage.preview
  })

}
}
else {

  res.json({
    "message": "Group couldn't be found",
    "statusCode": 404
  })
}
})


router.post('/:groupId/events', requireAuth, async (req,res) => {
  
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {

          res.json(
            {
              "message": "Group couldn't be found",
              "statusCode": 404
            }

          ) 
        }

        const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

        if (venueId) {
            const venue = await Venue.findByPk(venueId)

            if (!venue) {
                res.json({
                  "message": "Event couldn't be found",
                  "statusCode": 404
                })
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

// better way

if (group){
  if (group.organizerId !== req.user.id) {
    const err = new Error('You must be the owner to edit this group')
    err.status = 403
    return next(err)
  }
const { name, about, type, city, state, private } = req.body



group.set({
  name: name,
  about: about,
  type: type,
  city: city,
  state: state,
  private: private
})

await group.save()


res.json(group)
}
else{
  // ie group does not exist
  //no group per stackoverflow

    const err = new Error('Group couldn\'t be found')
    err.status = 404
    return next(err)


}





})


router.delete('/:groupId', async(req, res, next) => {
  
  const { groupId } = req.params;

  let group = await Group.findByPk(groupId)
 

  if(group){
      await group.destroy()

      res.json({
          message: "Successfully deleted",
          statusCode: 200
      })
  } else {
      res.status = 404
      res.json({
          message: "Group couldn't be found",
          statusCode: 404
      })
  }
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