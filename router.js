let express = require('express');
let router = express.Router();

let db = [];

// First record is as follows
// Each item has four attributes: id, name, quantity, price
let rec = {
    id: 100,
    name: "Lenovo Thinkpad",
    quantity: 21,
    price: 45
};

//Insert the first record to the db
db.push(rec);

// add a new item to the warehouse through the URL.
// E.g: http://localhost:8080/newItem/Tv/20/1500
// Object {id:348, name:’TV’, quantity:20, price:1500} should be saved in the DB
router.get("/newItem/:name/:quantity/:price", function(req,res){
    let theId = getNewRandomId();
    let obj = {id:theId, name:req.params.name, quantity:parseInt(req.params.quantity), price:parseInt(req.params.price)};
    console.log(obj);
    db.push(obj);
    console.log(db);
    res.send('Thank You!!!');
});

// List all items
// The output should have five columns: id, name, quantity, price, and cost (quantity * price)
// HINT: use function generateList as a reference
// URL: http://localhost:8080/listAllItems

router.get("/listAllItems", function(req,res){
    let st="";
    for(let i=0;i<db.length;i++){
        st+=(i) + " - " + db[i].id + " | " +  db[i].name + " | " +  db[i].quantity + " | " +  db[i].price + " | " +  db[i].quantity*db[i].price +  "<br>";
    }
    res.send(st);
});


// delete an item
// URL: http://localhost:8080/deleteItem/938, where 938 is the id of the item that should be deleted

router.get("/deleteItem/:deleteId", function(req,res){
    
    let found = false
    for(let i=0; i<db.length && !found; i++){
        if(db[i].id === parseInt(req.params.deleteId)){
            //db = 
            db.splice(i,1);
            found = true;
        }
    }

    let msg = "";
    if(found){
        msg = "We deleted your number";
    } else {
        msg = "sorry we can't find";
    }
    res.send(msg);
});

// get warehouse value:
// URL: http://localhost:8080/totalValue
// where the warehouse value is equal to ∑n0item.quantity∗item.price for all n items in the array DB
router.get("/totalValue", function(req,res){
    let msg = "";
    let count = 0;

    db.forEach((element, index, array) => {
        count = count + element.quantity*element.price;
        console.log(count);
        console.log(index);
    });

    // for(let i=0; i<db.length; i++){
    //     count = count + db[i].quantity*db[i].price
    //     console.log(count);    
    // }
    
    msg = "The total Value of the Warehouse is $" + count;
    res.send(msg);
});

function getNewRandomId(){
    let id;
    id = Math.round(Math.random()*1000);
    return id;
};

console.log("Hi")

moudle.exports = router;

