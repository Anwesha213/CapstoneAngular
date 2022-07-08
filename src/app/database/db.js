const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const db = require('./connection');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// Connection
db.connect(err => {
    if (err) { console.log('err'); }
    console.log('database Connected....');
})

// Get all data of Products table
app.get('/Products', (req, res) => {
    let qr = `Select * from public."Products"`
    db
        .query({
            text: qr
        })
        .then(result => {
            var data1 = []; 
            for (var i = 0; i < result.rows.length; i++) {
                data1.push({
                    productId: result.rows[i].productId,
                    productName: result.rows[i].productName,
                    productPrice: result.rows[i].productPrice,
                    productCategories: result.rows[i].productCategories,
                    productDescription: result.rows[i].productDescription,
                    productImage: result.rows[i].productImage
                });
            }
            res.send(
                data1
            );
        })
        .catch(err => console.log(err, 'errs'));
});

app.listen(3000, () => {
    console.log('Server Running');
})




//Get all data of eProducts table
// app.get('/eProducts', (req, res) => {
//     let qr = `Select * from public."eProducts"`
//     db
//         .query({
//             text: qr
//         })
//         .then(result => {
//             var data1 = []; 
//             for (var i = 0; i < result.rows.length; i++) {
//                 data1.push({
//                     eproductId: result.rows[i].eproductId,
//                     eproductName: result.rows[i].eproductName,
//                     eproductPrice: result.rows[i].eproductPrice,
//                     eproductCategories: result.rows[i].eproductCategories,
//                     eproductDescription: result.rows[i].eproductDescription,
//                     eproductImage: result.rows[i].eproductImage
//                 });
//             }
//             res.send(
//                 data1
//             );
//         })
//         .catch(err => console.log(err, 'errs'));
// });
