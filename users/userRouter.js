const express = require('express')
const user = require('./userDb.js')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
    user.insert(req.body)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json({
                error:
                    "could not create user"
            });
        });
});

router.post('/:id/posts', [validateUser, validateUserId], (req, res) => {
        user.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    "saving error"
            });
        });
});

router.get('/', (req, res) => {
    user.get(req.query)
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

router.get('/:id', validateUserId, (req, res) => {
    user.getById(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch (error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'user error',
      });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
    user.getUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                message: "post error"
            });
        });
});

router.delete('/:id', validateUserId, (req, res) => {
    user.remove(req.params.id)
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
        message: 'Error removing this user',
      });
    });
});

router.put('/:id', [validateUser, validateUserId], (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    user.update(id, changes)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Error updating user"
        });
      });
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    user.findById(id)
    .then(hub =>{
  if (hub){
    next();
  } else {
    res.status(404).json({message: 'id error'});
  }
    })
    .catch(error =>{
      console.log(error);
      res.status(500).json({
        message: 'no user id'
      })
    })
};

function validateUser(req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
        next();
      } else {
        next({ message: "Invalid User" });
      }
};

function validatePost(req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
        next();
      } else {
        next({ message: "No body found" });
      }
};

module.exports = router;
