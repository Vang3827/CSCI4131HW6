const mysql = require("mysql-await")

var connPool = mysql.createPool({
    connectionLimit: 5, // it's a shared resource, let's not go nuts.
    host: "127.0.0.1",// this will work
    user: "C4131F24U118",
    database: "C4131F24U118",
    password: "13974", // we really shouldn't be saving this here long-term -- and I probably shouldn't be sharing it with you...
  });
  
  async function createPerson(name,description){
    //return new person Id
    const result = await connPool.awaitQuery("Insert into Person(name, interests) values (?,?)", [name, description])
    console.log("Insert Result ->>>>",result)
    return result.insertId
  }

  createPerson("David", "Brother")