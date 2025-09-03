
var collectionsModel = require('../models/collectionsModel');

async function getAllCollections(req, res) {
    try {
      collectionsModel.getAllCollections(req.body, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows);
        }
    });
    } catch (error) {
      console.error('Error fetching collections:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function addCollections(req, res) {
    try {
      collectionsModel.addCollections(req.body, function (err, rows) {
       
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
      console.error('Error fetching collections:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getCollectionsById(req, res) {
    try {
      collectionsModel.getCollectionsById(req, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows[0]);
        }
    });
    } catch (error) {
      console.error('Error fetching collections:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function updateCollections(req, res) {
    try {
      collectionsModel.updateCollections(req, function (err, rows) {
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
      console.error('Error fetching collections:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function deleteCollections(req, res) {
    try {
      collectionsModel.deleteCollections(req, function (err, rows) {
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
      console.error('Error fetching collections:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
 


module.exports = {
  getAllCollections,
  addCollections,
  getCollectionsById,
  updateCollections,
  deleteCollections,
 
};
