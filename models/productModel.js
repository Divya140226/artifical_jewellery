
const pool = require('./db');

// const { toTitleCase } = require('../lib/common-function/toTittleCase');


var product = {
    getAllProduct: function (req, callback) {
        pool.query("SELECT * FROM products ", function (err, result) {
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
    getCategoriesProduct: function (req, callback) {
        pool.query("SELECT p.*,  c.name as cat_name, co.name as collection_name FROM products p LEFT JOIN categories c ON c.id = p.category_id LEFT JOIN collections co ON co.id = p.collection_id WHERE p.category_id =  $1 ",[req.params.category_id], function (err, result) {
            console.log(err);
            
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
   
    addProduct: function (req, callback) {
  
      
        pool.query("INSERT INTO products (name,description,price,stock,image_url,category_id,collection_id,material,weight) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [req.name,req.description,req.price,req.stock,req.image_url,req.category_id,req.collection_id,req.material,req.weight], function (err, result) {
            // console.log(err,result );
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
    getProductById: function (req, callback) {
        
        pool.query("SELECT * FROM products  where id=$1",[req.params.id], function (err, result) {
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
    updateProduct: function (req, callback) {
        const {name,description,price,stock,image_url,category_id,collection_id,material,weight} = req.body;
        const{id}=req.params;
        pool.query("UPDATE products SET name=$1,description=$2,price=$3,  stock =$4, image_url=$5, category_id=$6, collection_id=$7, material=$8,weight=$9 WHERE id =$10", [name,description,price,stock,image_url,category_id,collection_id,material,weight, id], function (err, result) {
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
    
   	deleteProduct: function (req, callback) {
		pool.query(
			`DELETE FROM products WHERE id=$1`,
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
   searchProductByName: function (req, callback) {
    const searchTerm = req.name || ''; // FIXED: no req.query here

    pool.query(`
        SELECT p.*, 
           c.name AS category_name, 
           c.description AS category_description, 
           b.name AS collection_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN collections b ON p.collection_id = b.id
    WHERE LOWER(p.name) LIKE LOWER($1)
       OR LOWER(c.name) LIKE LOWER($1)
       OR LOWER(b.name) LIKE LOWER($1)
    `, [`%${searchTerm}%`], function (err, result) {
        if (err) {
            console.log(err);
            return callback(err, {
                status: false,
                message: 'Error while searching product'
            });
        }

        callback(null, {
            status: true,
            message: 'Products retrieved successfully',
            data: result.rows
        });
    });
},

 filterProduct: function (req, callback) {
    console.log("kjhjdf");
    
  const {
    category,
    collection,

    product,
    minPrice,
    maxPrice
  } = req.query;

  pool.query(`
    SELECT p.*, 
           c.name AS category_name, 
           c.description AS category_description, 
           b.name AS collection_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN collections b ON p.collection_id = b.id
    WHERE
      ($1::text IS NULL OR LOWER(c.name) LIKE LOWER('%' || $1 || '%')) AND
      ($2::text IS NULL OR LOWER(b.name) LIKE LOWER('%' || $2 || '%')) AND
      ($3::text IS NULL OR LOWER(p.name) LIKE LOWER('%' || $3 || '%')) AND
      ($4::numeric IS NULL OR p.price >= $4) AND
      ($5::numeric IS NULL OR p.price <= $5)
    ORDER BY p.id DESC
  `, [
    category || null,
    collection || null,
    product || null,
    minPrice || null,
    maxPrice || null
  ], function (err, result) {
    if (err) {
      console.log(err);
      return callback(err, {
        status: false,
        message: 'Error while searching product'
      });
    }

    return callback(null, {
      status: true,
      message: 'Fliter Products successfully',
      data: result.rows
    });
  });
}

}

module.exports = product;