
const pool = require('./db');

// const { toTitleCase } = require('../lib/common-function/toTittleCase');


var subscriptions = {
    getAllSubscriptions: function (req, callback) {
        pool.query("SELECT * FROM subscriptions", function (err, result) {
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
   
    addSubscriptions: function (req, callback) {
        pool.query("INSERT INTO subscriptions (email, is_active) VALUES ($1, $2)", [req.email, req.is_active], function (err, result) {
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
    getSubscriptionsById: function (req, callback) {
        
        pool.query("SELECT * FROM subscriptions  where id=$1",[req.params.id], function (err, result) {
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
    updateSubscriptions: function (req, callback) {
        const { email, is_active } = req.body;
        const{id}=req.params;
        pool.query("UPDATE subscriptions SET email=$1, is_active=$2 WHERE id =$3", [email, is_active, id], function (err, result) {
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
    deleteSubscriptions: function (req, callback) {
        pool.query(
            `DELETE FROM subscriptions WHERE id=$1`,
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

module.exports = subscriptions;