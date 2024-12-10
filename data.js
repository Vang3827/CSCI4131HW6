// const mysql = require("mysql-await")

// var connPool = mysql.createPool({
//     connectionLimit: 5, // it's a shared resource, let's not go nuts.
//     host: "127.0.0.1",// this will work
//     user: "C4131F24U118",
//     database: "C4131F24U118",
//     password: "13974", // we really shouldn't be saving this here long-term -- and I probably shouldn't be sharing it with you...
//   });
  
//   async function createListing(name,listing){
//     //return new person Id
//     const result = await connPool.awaitQuery("Insert into autolist(name, description) values (?,?)", [name, listing])
//     console.log("Insert Result ->>>>",result)
//     return result.insertId
//   }

//   //createPerson called for David, Brother
//   createListing("David", "Brother")

//   // Get request here
//   // Put into function
//   connPool.awaitQuery("SELECT * from autolist", (err, res)=>{
//     return console.log(res)
//   })

  ////////////////////////////////////////////////////////////////////////////

// this package behaves just like the mysql one, but uses async await instead of
// callbacks.
const mysql = require(`mysql-await`); // npm install mysql-await
// first -- I want a connection pool: https://www.npmjs.com/package/mysql#pooling-connections
// this is used a bit differently, but I think it's just better -- especially if
//server is doing heavy work.
var connPool = mysql.createPool({
connectionLimit: 5, // it's a shared resource, let's not go nuts.
host: "127.0.0.1",// this will work
user: "C4131F24U118",
database: "C4131F24U118 ",
password: "13974", // we really shouldn't be saving this here long-term-- and I probably shouldn't be sharing it with you...
});
// later you can use connPool.awaitQuery(query, data) -- it will return a promisefor the query results.
async function addListing(data) {
// you CAN change the parameters for this function.
const { title, image, description, category, sale_date, end_time } = data;
    const result = await connPool.awaitQuery("Insert into Vehicle(name, interests) values (?,?)", [name, description])
    console.log("Insert Result ->>>>",result)
    return result.insertId
}
async function deleteListing(id) {
}
async function getListing(id) {
}
async function getGallery(query, category ) {
}
async function placeBid(data) {
// you CAN change the parameters for this function.
const { listing_id, bidder, amount, comment } = data;
}
async function getBids(listing_id) {
}
async function getHighestBid(listing_id) {
}
module.exports = {
addListing,
deleteListing,
getListing,
getGallery,
placeBid,
getBids,
getHighestBid
};

addListing();