
var subscriptionsModel = require('../models/subscriptionsModel');

async function getAllSubscriptions(req, res) {
    try {
      subscriptionsModel.getAllSubscriptions(req.body, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows);
        }
    });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function addSubscriptions(req, res) {
    try {
      subscriptionsModel.addSubscriptions(req.body, function (err, rows) {
       
console.log(err);

        if (err) {
          res.status(500).send({
            message: rows,
          });      
        } 
        else{    
          res.status(200).send({
            status: true,
            message: 'Created Successfully',
          });
        }
    });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getSubscriptionsById(req, res) {
    try {
      subscriptionsModel.getSubscriptionsById(req, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows[0]);
        }
    });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function updateSubscriptions(req, res) {
    try {
      subscriptionsModel.updateSubscriptions(req, function (err, rows) {
        if (err) {
          res.status(500).send({
            message: rows,
          });      
        } 
        else{    
          res.status(200).send({
            status: true,
            message: 'Updated Successfully',
          });
        }
    });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function deleteSubscriptions(req, res) {
    try {
      subscriptionsModel.deleteSubscriptions(req, function (err, rows) {
        if (err) {
          res.status(500).send({
            message: rows,
          });      
        } 
        else{    
          res.status(200).send({
            status: true,
            message: 'Deleted Successfully',
          });
        }
    });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
 


module.exports = {
  getAllSubscriptions,
  addSubscriptions,
  getSubscriptionsById,
  updateSubscriptions,
  deleteSubscriptions,
 
};
