'use strict';


// Third party
const express = require('express');
const router = express.Router(); 

// Models
const Message = require('../models/message');
const Subscriber = require('../models/subscriber');
const Bug = require('../models/bug');
const Project = require('../models/project');

// my files
const logger = require('../winston');
const auth = require('../controllers/authentication/auth');

router.use('/', auth.isLoggedIn);

/**
 * Projects
 *  - create
 *  - update
 *  - delete
 */
router
  .route('/project')
  .post();

router
  .route('/project/:id')
  .get()  
  .put()
  .delete((req, res) => {
    const { id } = req.params;

    console.log(`Request received to delete item ${id}`);

    const response = {
      message: '',
      type: '',
      data: undefined
    };

    Project.findOneAndRemove({ _id: id }, {passRawResult: true}, (err, result, raw) => {
      if (err) {
        logger('error', err);
        response.message = 'Error deleting item from database';
        response.type = 'Error'

        res.status(500).json(response);
      } else { 
        logger('info', `Successfully deleted ${id} from database`)
        
        response.message = `Successfully deleted ${id} from database`;
        response.type = 'success';
        response.data = result;
        
        res.status(200).json(response);
      }
    });
  });

/**
 * Bugs
 *  - update
 *  - delete
 */
router
  .route('/bug/:id')
  .put()
  .delete();

/**
 * Messages
 *  - update
 *  - delete
 */
router
  .route('/message/:id')
  .put()
  .delete();

 /**
 * Subscribers
 *  - update
 *  - delete
 */
router
  .route('/subscribe/:id')
  .put()
  .delete();

module.exports = router;