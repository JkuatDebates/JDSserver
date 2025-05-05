const express=require('express');
const router= express.Router();
const eventsController=require('../../controllers/eventsController');

router.route('/')
    .get(eventsController.getEvents)
    .post(eventsController.newEvent)
    .put(eventsController.updateEvent);

router.route('/:id')
    .delete(eventsController.deleteEvent);
    
module.exports=router;