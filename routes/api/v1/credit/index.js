var express = require('express');
var router = express.Router();
//const path = require('path');
//const Card = require('../../../../models/Card');
const luhn = require("luhn");


let data = [
  { id: 1, name: 'Praveen',  card_no: '123456789', card_limit: '40', createdOn: new Date() },
];

//Get All Cards

router.get('/', async function (req, res) {
  try {     
    
    if((data.length)>0){  
      const getCard =  res.status(200).json(data); 
      res.send({ "status": 1, "data": getCard, "message": "All Card Details." });
    }else{
      res.send({ "status": 0, "data": [], "message": "No record found" });
    }
  } catch (error) {
    res.send({ "status": 0, "data": [], "message": "Ooops! Something went wrong." });
  }
});

//Get Particular card details List (postId= cardno)

router.get('/:postId', async function (req, res) {
  try {     
      let found = data.find(function (item) {
        return item.id === parseInt(req.params.postId);     
    }); 
    //console.log(found);
    if(found){
      const getData = res.status(200).json(found);
      res.send({ "status": 1, "data": getData, "message": "Card Details." });
    }else{
      res.send({ "status": 0, "data": [], "message": "Card is not register." });
    }
  } catch (error) {
    res.send({ "status": 0, "data": [], "message": "Ooops! Something went wrong." });
  }
});


// Add  card

router.post('/add',  async (req, res, next) => {
  try {
    const poData = req.body;
    //console.log(req.body);
    req.checkBody("name", "Required").notEmpty();
    req.checkBody("card_no", "Required").notEmpty();
    req.checkBody("card_limit", "Required").notEmpty();
    
    var errors = req.validationErrors();
    if(errors){      
      res.send({ "status": 0, "data": [], "message": "Error! Enter required field."});   
    }else{
      const cardNo= req.body.card_no.length;
      //console.log(`Length-> ${cardNo}`);
      if(cardNo<=19){
        var is_valid = luhn.validate(req.body.card_no);
        if(is_valid){            
            let itemIds = data.map(item => item.id);   
            // create new id (basically +1 of last item object)
          let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;   
          let newItem = {
                    id: newId,              // generated in above step
                    name: req.body.name,
                    card_no: req.body.card_no, 
                    card_limit: req.body.card_limit, 
                    createdOn: new Date()     // new date object
                };
                // push new item object to data array of items
            const saveData =  data.push(newItem);
            if(saveData){
              res.send({ "status": 1, "data": poData, "message": "Success! Added Successfuly" });
            }else{
              res.send({ "status": 0, "data": [], "message": "Ooops! Something went wrong." }); 
            }
          }else{
            res.send({ "status": 0, "data": [], "message": "Error! Credit Card number is not valid, according to LUNH 10."});  
          }
        }else{
          res.send({ "status": 0, "data": [], "message": "Error! Credit Card number should be less than 19 digits."});  
        }
    }
  } catch (error) {
      console.error(error);
      res.send({ "status": 0, "data": [], "message": "Ooops! Something went wrong." });
  }
});


// charge http://localhost:3006/api/v1/card/charge/PK 

router.post('/charge/:postId',  async (req, res, next) => {
  try {
    const poData = req.body;
    //req.checkBody("name", "Required").notEmpty();
    //req.checkBody("card_no", "Required").notEmpty();
    req.checkBody("card_limit", "Required").notEmpty();
    var errors = req.validationErrors();
    if(errors){      
      res.send({ "status": 0, "data": [], "message": "Error! Enter required field."});   
    }else{
          
        let CardDetails = data.find(function (item) {       
          return item.name === (req.params.postId);
        }); 
     // console.log(CardDetails);     
      if(CardDetails) {        
          const cardNo = CardDetails.card_no;     
          const newLimit = parseInt(CardDetails.card_limit) + parseInt(req.body.card_limit);
          let updated = {
            id: CardDetails.id,
            name: CardDetails.name,
            card_no: CardDetails.card_no, 
            card_limit: newLimit,
            createdOn: new Date() 
          };
          // find index of CardDetails object from array of data
            let targetIndex = data.indexOf(CardDetails);      
        // replace object from data list with `updated` object
            var result = data.splice(targetIndex, 1, updated);
          if(result) {
            res.send({ "status": 1, "data": poData, "message": `Success! ${cardNo} card number and the remaining balance is ${newLimit}` });
          } else {
            res.send({ "status": 0, "data": [], "message": "Ooops! Something went wrong." });
          }
        }else {
          res.send({ "status": 0, "data": [], "message": "Name does not match." });
        }
    }
  } catch (error) {
      console.error(error);
      res.send({ "status": 0, "data": [], "message": "Ooops! Something went wrong." });
  }
});

// credit http://localhost:3006/api/v1/card/credit/PK

router.post('/credit/:postId',  async (req, res, next) => {
  try {
    const poData = req.body;   
    req.checkBody("card_limit", "Required").notEmpty();
    var errors = req.validationErrors();
    if(errors){      
      res.send({ "status": 0, "data": [], "message": "Error! Enter required field."});   
    }else{
        let CardDetails = data.find(function (item) {       
          return item.name === (req.params.postId);
        }); 
        if(CardDetails) {
          const cardNo = CardDetails.card_no;     
          const newLimit = (CardDetails.card_limit) - (req.body.card_limit);
         
          let updated = {
            id: CardDetails.id,
            name: CardDetails.name,
            card_no: CardDetails.card_no, 
            card_limit: newLimit,
            createdOn: new Date() 
          };
          // find index of CardDetails object from array of data
            let targetIndex = data.indexOf(CardDetails);      
        // replace object from data list with `updated` object
            var result = data.splice(targetIndex, 1, updated);         
          if(result) {
            res.send({ "status": 1, "data": poData, "message": `Success! ${cardNo} card number and the remaining balance is ${newLimit}` });
          } else {
            res.send({ "status": 0, "data": [], "message": "Ooops! Something went wrong." });
          }
        }else {
          res.send({ "status": 0, "data": [], "message": "Name does not match." });
        }
    }
  } catch (error) {
      console.error(error);
      res.send({ "status": 0, "data": [], "message": "Ooops! Something went wrong." });
  }
});

// delete
router.delete('/delete/:postId', async function(req, res){
  try{
    let found = data.find(function (item) {
      return item.id === parseInt(req.params.id);
  });
  if (found) {
    // if item found then find index at which the item is
    // stored in the `data` array
    let targetIndex = data.indexOf(found);

    // splice means delete item from `data` array using index
    data.splice(targetIndex, 1);
    res.send({ "status": 1, "data": deletData, "message": "Success! Deleted Successfully." });
  }
  
}catch (error) {
  console.error(error);
  res.send({ "status": 0, "data": [], "message": "Ooops! Something went wrong." });
}
})




module.exports = router;
