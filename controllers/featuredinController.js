
var featuredinModel = require('../models/featuredinModel');

async function getAllFeaturedin(req, res) {
    try {
      featuredinModel.getAllFeaturedin(req.body, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows);
        }
    });
    } catch (error) {
      console.error('Error fetching featuredin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function addFeaturedin(req, res) {
    try {
      featuredinModel.addFeaturedin(req.body, function (err, rows) {
       
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
      console.error('Error fetching featuredin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getFeaturedinById(req, res) {
    try {
      featuredinModel.getFeaturedinById(req, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows[0]);
        }
    });
    } catch (error) {
      console.error('Error fetching featuredin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function updateFeaturedin(req, res) {
    try {
      featuredinModel.updateFeaturedin(req, function (err, rows) {
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
      console.error('Error fetching featuredin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function deleteFeaturedin(req, res) {
    try {
      featuredinModel.deleteFeaturedin(req, function (err, rows) {
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
      console.error('Error fetching featuredin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
 


module.exports = {
  getAllFeaturedin,
  addFeaturedin,
  getFeaturedinById,
  updateFeaturedin,
  deleteFeaturedin,
 
};
