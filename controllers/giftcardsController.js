
var giftcardsModel = require('../models/giftcardsModel');

async function getAllGiftcards(req, res) {
    try {
      giftcardsModel.getAllGiftcards(req.body, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows);
        }
    });
    } catch (error) {
      console.error('Error fetching giftcards:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function addGiftcards(req, res) {
    try {
      giftcardsModel.addGiftcards(req.body, function (err, rows) {
       
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
      console.error('Error fetching giftcards:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getGiftcardsById(req, res) {
    try {
      giftcardsModel.getGiftcardsById(req, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows[0]);
        }
    });
    } catch (error) {
      console.error('Error fetching giftcards:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function updateGiftcards(req, res) {
    try {
      giftcardsModel.updateGiftcards(req, function (err, rows) {
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
      console.error('Error fetching giftcards:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function deleteGiftcards(req, res) {
    try {
      giftcardsModel.deleteGiftcards(req, function (err, rows) {
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
      console.error('Error fetching giftcards:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
 


module.exports = {
  getAllGiftcards,
  addGiftcards,
  getGiftcardsById,
  updateGiftcards,
  deleteGiftcards,
 
};
