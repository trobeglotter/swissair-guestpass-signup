const express = require('express');
const bodyParser = require('body-parser');
const qrcode = require('qrcode');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const { Pool } = require("pg")
const dotenv = require("dotenv")
dotenv.config()

// SET UP DATABASE LINK
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});
pool.connect();

// Pass Number Function
let passNumberFunction = function () {
    var result = '';
    var characters = 'A0Z19C7XD2W8ETF7GU3HS6IRJ5Q40KP5LO3M9MN9B826OPA1Q4BD3RF0ES2GTI9UH0VJW1XL4YN7Z';
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * 8));
    }
    return result;
}
let passNumber = passNumberFunction();
let timestamp = new Date();

// TESTING TO REMOVE DUPLICATE PASS NUMBERS 
// let passNumberFunction = function () {
//     var result = '';
//     var characters = 'A0Z19C7XD2W8ETF7GU3HS6IRJ5Q40KP5LO3M9MN9B826OPA1Q4BD3RF0ES2GTI9UH0VJW1XL4YN7Z';
//     for (var i = 0; i < 8; i++) {
//         result += characters.charAt(Math.floor(Math.random() * 8));
//     }
//     let firstTryPassNumber = pool.query('SELECT pass_number FROM lounge_guest', (err, results) => {
//         return results.rows;
//     })
//     if (result != firstTryPassNumber) {
//         return result;
//     } else {
//         passNumberFunction();
//     }
// }
// let passNumber = passNumberFunction();
// let timestamp = new Date();

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/guest_details_submit', (req, res) => {
    let surname = req.body.surname;
    let firstName = req.body.firstName;
    let email = req.body.email;
    let qrCodeNumber = [passNumber + " " + surname];
    pool.query(
        "INSERT INTO lounge_guest (pass_number, surname, first_name, email, timestamp, qr_code_number) VALUES ($1, $2, $3, $4, $5, $6) returning *",
        [passNumber, surname, firstName, email, timestamp, qrCodeNumber])

    let loungeGuest = [passNumber, surname, firstName, email];
    console.log(loungeGuest);
    qrcode.toDataURL(qrCodeNumber, (err, src) => {
        res.render('createPDF.ejs', { loungeGuest: loungeGuest, qrcodepass: src })
    });
    // res.status(201).send("data is sent");
});

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
})