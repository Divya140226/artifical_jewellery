
const pool = require('./db');

// const { toTitleCase } = require('../lib/common-function/toTittleCase');


var collections = {
    getAllCollections: function (req, callback) {
        pool.query("SELECT * FROM collections", function (err, result) {
            if (err) {
                response={
                    status:false,
                    message:"Error!! while fetching datas"
                }
         
                callback(err,response);
            }
               else {
               
                callback(null, result.rows);

            }

        });

    },
   
    addCollections: function (req, callback) {
  
      
        pool.query("INSERT INTO collections (name, description, img_collection) VALUES ($1, $2, $3)", [req.name, req.description, req.img_collection], function (err, result) {
        //    console.log(err,result );
            //    console.log(req,"req" );
            response={
                status:false,
                message:"Error!! while Inserting datas"
            }
            if (err) {
         
                callback(err, response);
            }
                else if(result.rowCount==0){
                callback("Error!!",response);

                }else {
                 
                callback(null, result);
            }

        });

    },
    getCollectionsById: function (req, callback) {
        
        pool.query("SELECT * FROM collections  where id=$1",[req.params.id], function (err, result) {
            response={
                status:false,
                message:"Error!! while fetching datas"
            }
            if (err) {
         
                callback(err, response);
            }
                else if(result.rowCount==0){
                callback("Error!!",response);

                } else {
               
                callback(null, result.rows);

           
            }

        });

    },
    updateCollections: function (req, callback) {
        const { name, description, img_collection } = req.body;
        const{id}=req.params;
        pool.query("UPDATE collections SET name=$1, description=$2, img_collection=$3  WHERE id =$4", [name,description, img_collection, id], function (err, result) {
            //console.log(err,"update");
            
            response={
                status:false,
                message:"Error!! while updating datas"
            }
            if (err) {
         
                callback(err,response);
            }
                else if(result.rowCount==0){
                callback("Error!!",response);

                } else {
               
                callback(null, result);
            }
        

        });

    },
    deleteCollections: function (req, callback) {
        pool.query(
            `DELETE FROM collections WHERE id=$1`,
            [req.params.id],
            function (err, result) {
                if (err) {
                    
                    callback(err, 'Error!! while Deleting datas');
                } else if (result.rowCount == 0) {
                    callback('Error!! while Deleting datas', 'Error!!');
                } else {
                    callback(null, result);
                }
            }
        );
    },
}

module.exports = collections;