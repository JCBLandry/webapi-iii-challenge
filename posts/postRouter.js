const express = require('express');
const post = require('./postDb.js')
const router = express.Router();

router.get('/', (req, res) => {
    post.get(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
});

router.get('/:id', (req, res) => {
    post.getById(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch (error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error getting the messages for the hub',
      });
    });
});

router.delete('/:id', (req, res) => {
    post.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id
    post.update(id, req.body)
    .then(post => {
        res.status(200).json(post)
      })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;