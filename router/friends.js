const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
    
    res.send(JSON.stringify(friends,null,4));
    
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    res.send(friends[email]);
});


// POST request: Add a new friend
router.post("/", function(req, res) {
    // Check if email is provided in the request body
    if (req.body.email) {
        // Create or update friend's details based on provided email
        friends[req.body.email] = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "DOB": req.body.DOB,
        };
    }
    // Send response indicating user addition
    res.send("The user" + (' ') + (req.body.firstName) + " has been added!");
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  let email = req.params.email;
  let friend = friends[email];
  if(friend){
    let DOB = req.body.DOB;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if(firstName){
        friend["firstName"] = firstName;
    }
    if(lastName){
        friend["lastName"] = lastName;
    }
    if(DOB){
        friend["DOB"] = DOB;
    }

    friends[email] = friend;
    res.send("The information for the user who has the email "+email+" has been udpated!");
  }else{
    res.send("The user doesn't exist in the system");
  }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  let email = req.params.email;
  if(friends[email]){
    delete friends[email];
    res.send("The user has been deleted.");
  }else{
    res.send("User could not be found or deleted");
  }

});

module.exports=router;
