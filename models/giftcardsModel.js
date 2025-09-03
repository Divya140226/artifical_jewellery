
const pool = require('./db');

// const { toTitleCase } = require('../lib/common-function/toTittleCase');


var giftcards = {
    getAllGiftcards: function (req, callback) {
        pool.query("SELECT * FROM gift_cards", function (err, result) {
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
   
    addGiftcards: function (req, callback) {
        pool.query("INSERT INTO gift_cards (code, amount, is_redeemed, expires_at) VALUES ($1, $2, $3, $4)", [req.code, req.amount, req.is_redeemed, req.expires_at ], function (err, result) {
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
    getGiftcardsById: function (req, callback) {
        
        pool.query("SELECT * FROM gift_cards  where id=$1",[req.params.id], function (err, result) {
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
    updateGiftcards: function (req, callback) {
        const { code, amount,is_redeemed,expires_at } = req.body;
        const{id}=req.params;
        pool.query("UPDATE gift_cards SET code=$1, amount=$2, is_redeemed=$3, expires_at=$4  WHERE id =$5", [code, amount, is_redeemed,expires_at, id], function (err, result) {
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
    deleteGiftcards: function (req, callback) {
        pool.query(
            `DELETE FROM gift_cards WHERE id=$1`,
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

module.exports = giftcards;