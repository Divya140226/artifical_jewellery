
const pool = require('./db');

// const { toTitleCase } = require('../lib/common-function/toTittleCase');


var featuredin = {
    getAllFeaturedin: function (req, callback) {
        pool.query("SELECT * FROM featured_in", function (err, result) {
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
   
    addFeaturedin: function (req, callback) {
        pool.query("INSERT INTO featured_in (name, logo_url, link) VALUES ($1, $2, $3)", [req.name, req.logo_url, req.link], function (err, result) {
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
    getFeaturedinById: function (req, callback) {
        
        pool.query("SELECT * FROM featured_in  where id=$1",[req.params.id], function (err, result) {
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
    updateFeaturedin: function (req, callback) {
        const { name, logo_url,link } = req.body;
        const{id}=req.params;
        pool.query("UPDATE featured_in SET name=$1, logo_url=$2, link=$3  WHERE id =$4", [name, logo_url, link, id], function (err, result) {
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
    deleteFeaturedin: function (req, callback) {
        pool.query(
            `DELETE FROM featured_in WHERE id=$1`,
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

module.exports = featuredin;