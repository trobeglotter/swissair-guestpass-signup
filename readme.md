11 January 2023
Set up node server
https://www.youtube.com/watch?v=SccSCuHhOw0&t

express can take http methods

copied the html and css files from phase 1 of project

Added view engine. Install npm package for ejs

Home page is set. 

Could not figure out how to link animation.js to server.js or index.ejs so I pasted the animation script in script tags.

12 January 2023
gifco
https://stackoverflow.com/questions/56152633/not-able-to-call-functions-from-another-js-file
You want to export as an object with your function as a property.

https://stackoverflow.com/questions/74824065/i-need-help-for-connect-js-functions-with-ejs-file
EJS does not provide a DOM. Output from EJS is generated using <%= and similar.

The document object is only (that's a slight simplification) available in JS running in an HTML document in the browser.

To use that code you would need to include it in a < script> element output from the EJS into an HTML document and run in a browser.

12 January 2023
- Downloaded and reviewed Postgresql

TABLE NAME
sw_lounge_guest 

USER GENERATED PDF DATA
 - fname
 - lname
 - email

 UNIQUE AUTOMATED PDF DATA:
 - Auto generated pass number - WRITE A FUNCTION FOR THIS
 - function to make qr code number data - WRITE A FUNCTION FOR THIS WITH NPM

 STANDARD AUTOMATED PDF DATA:
 - Swiss Air Logo
 - message to guest (update to include features of lounge)
 - cost of pass 120 euro
 - booking fee 7 euro
 - swissair website
 - legal terms

13 January 2023
 - Set up template literals for final PDF
sw_lounge_guest - SCHEMA C1 - PASSNUMBER - pass_number - passNumber
sw_lounge_guest - SCHEMA C2 - SURNAME - surname - surname
sw_lounge_guest - SCHEMA C3 - FIRST NAME - first - firstName
sw_lounge_guest - SCHEMA C4 - EMAIL - email - email
sw_lounge_guest - SCHEMA C6 - QR CODE NUMBER - qr_code_number - qrCodeNumber


// Constructor function
// C2 - surname
// C3 - lastName
// C4 - email



SCHEMA C1 - PASSNUMBER - section 1, header
SCHEMA C2 - FIRST NAME - section 1, greeting && section 2, table
SCHEMA C3 - LAST NAME - section 1, greeting && section 2, table
SCHEMA C4 - EMAIL - section 2, table
SCHEMA C6 - QR CODE NUMBER - section 2, table


14
Add NPM
PRACTICE PDF NPM - plug template literal function into the canvas/pdf npm
--How to set up the output file? How will html work with node/ejs?
--Html will be generated in a js function, but that will spit out into a pdf directly.
--As of now we can direct download the pdf but the gmail api step will be added in between as a transfer point of the data.
--I'll need to make a schema for the email send data. Gmail api mentioned a csv file?
---It should be able to tap into the SCHEMA C4 and pull the email from there...

CANVAS AND JSPDF
https://www.npmjs.com/package/html2pdf.js/v/0.9.0

Version 10 of html2pdf has bugs. Ended up using a cdn:
https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js


15 January 2023
DATABASE - sw_lounge_guest

TABLE - lounge_guest
SCHEMA C1 - PASSNUMBER - pass_number - passNumber
SCHEMA C2 - SURNAME - surname - surname
SCHEMA C3 - FIRST NAME - first - firstName
SCHEMA C4 - EMAIL - email - email
SCHEMA C5 - TIMESTAMP - timestamp - timestamp

TABLE - guest_pass

SCHEMA C1 - PASSNUMBER - pass_number - passNumber
SCHEMA C6 - QR CODE NUMBER - qr_code_number - qrCodeNumber


// Constructor function
// C2 - surname
// C3 - lastName
// C4 - email

               List of relations
 Schema |     Name     | Type  |     Owner     
--------+--------------+-------+---------------
 public | guest_pass   | table | suzannecurtis
 public | lounge_guest | table | suzannecurtis
(2 rows)

sw_lounge_guest=# TABLE guest_pass;
 pass_number | qr_code_number 
-------------+----------------
(0 rows)

sw_lounge_guest=# TABLE lounge_guest;
 pass_number | surname | first_name | email 
-------------+---------+------------+-------
(0 rows)


15 January 2023
added crypto random string but the module wouldn't sync with server or app file?
https://www.npmjs.com/package/crypto-random-string
added pg npm 
https://www.npmjs.com/package/pg
downloaded pgAdmin
made a github repo
added .env file - using postgres requires all the procedures for backend security
added new db admin swissair-admin 

is node-postgres the same? the client call looks the same
https://www.npmjs.com/package/node-postgres




16 January 2023
connected postgres to server
set up node files as common js

17 January 2023
able to view the rows and access the db from the connectDb and connect to pool
pool variable isn't accessible for later post request so set an empty variable to start (is this proper formating?)

// const connectDb = async () => {
//     try {
//         const pool = new Pool({
//             user: process.env.PGUSER,
//             host: process.env.PGHOST,
//             database: process.env.PGDATABASE,
//             password: process.env.PGPASSWORD,
//             port: process.env.PGPORT,
//         });

//         await pool.connect();

//         const res = await pool.query
//             ('SELECT * FROM lounge_guest');
//         // this lists just the pass number and surname
//         // ('SELECT pass_number, surname FROM lounge_guest');
//         console.log(res.rows);
//         await pool.end();
//     } catch (error) {
//         console.log(error)
//     }
// }

// connectDb();

Could not access pool with async function. Switched to a regular function for sake of scope.

18 January 2023
Moved the createPDF html file to createPDF ejs
The data populates with variables but the variables are just dummies for now.
The variables are set in an array so they cast into the esj file using the index numbers.
Able to add script tag with type text directly to ejs file to modify.
Was able to add styling but can't apply flexbox?
Added the qr code npm--generated the number but don't know how to convert to image.
Post from form data is connected.
Added body-parser npm and updated urlencoded

19 January 2023
https://davidshimjs.github.io/qrcodejs/
Sorted out image and text for qr code (json stringify).
JS object is converted into a json and the text can be read by console log. Is that the appropriate format for qr scanner technology?

Store the tex that the qr code repreasents in the db and generate it on the fly as needed.

Setting up a new file because the modules weren't connected correctly.
QR code test is up and running. 
Reorg'd the wireframing.

The issue was I put the variables inside the get request rather than the post request. Lost a day of coding over a small error not paying attention.
All the "C" variables push to postgres but when I try to put duplicated joined records into the qr code column I get an error: malformed array literal. 
The qr code db record will be the pass number and last name in a js object, so it can be ready to stringify in the createPDF file. The record will perma be stored as an object and converted to qr code only for the purpose of making the code image.

20 January 2023
Issue with the passNumber generator is it will repeat a number and the code breaks.
Set up new createPDF html file to test out append and append child to see which works with html2pdf. Flexbox and all style applied correctly. Set up span tags to see how to append the postgres data inline with no disruption to the flexbox styling.
At times the pass number creates a duplicate twice in a row and the app crashes.

21 January 2023
Set up createpdf html with three js files:
autofill pdf js which holds the functionality to fill the postgres data into the form.
min js which is the machine for making the qr code.
create pdf js which outputs the file through the cdn functions to screen shot from canvas then make an actual pdf.
Made a function with parameters that will connect the database query inside of the server.
Made testArea js file for testing things in a designated area.
Expanded the legal text section to fill the pdf 


22 January 2023
Malformed array literal solved: Needed brackets around multiple variable inputs into postgres so that it can be 'parsed' or processed properly. I searched for array literal and saw it just means it has brackets around it. 
Deleted the second table - guest_pass.

23 January 2023 
Researched the hell out of require / import / export and sorted it out in V1. 
Exported the function to the server but node is a server and can't read the DOM.
The variables need to be exported out of the server and into autofillpdfjs then the html form can populate and the script will call on createpdfjs.

25 January 2023
Went with an ejs file for the pass. Used spans and tables to format the information in row format.

NEXT
 - How to make a pdf from the ejs file?
https://www.npmjs.com/package/pdf-creator-node

buffers to convert string to base 64
https://stackoverflow.com/questions/6182315/how-can-i-do-base64-encoding-in-node-js




--Find a better method for generating the passNumber as you don't want it crashing for a potential hiring manager.
--how to return to the load screen after inputting user details but also make the plane fly across the screen?

HOW TO PUSH PDF TO EMAIL?

USER EMAIL PUT INTO PROGRAM THAT SENDS THE PDF - WRITE A FUNCTION FOR THIS
 - IS THERE SOMETHING IN GMAIL TO SET THIS UP? (CUZANNESURTIS@G)
 - MAIL CHIMP?
 https://developers.google.com/gmail/api/guides/sending
 https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send
 https://developers.google.com/gmail/api/quickstart/js



