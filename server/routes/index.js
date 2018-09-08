var express = require('express');
var router = express.Router();
var redis = require('redis')
var client = require('../middleware/redis')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    "Title" : "The Number Game API",
    "Version" : "1.0.0"
  });
});

router.post('/generate', function(req, res, next){
  var nums = [1,2,3,4,5,6,7,8,9]
  var ranNums = []
  var digits = 4
  var temp = 0
  
  while(digits--){
    temp = Math.floor(Math.random()*11)
    if(nums[temp]){
      ranNums.push(nums[temp])
      nums.splice(temp,1)
    }
    else
      digits++
  }
  var randNum = ranNums[0]*1000 + ranNums[1]*100 + ranNums[2]*10 + ranNums[3]
  console.log("NUmber is : "+randNum)

  var username = req.body.username.toString().toLowerCase();
  var timestamp = new Date().getTime()

  var userID = username + timestamp.toString();

  client.set(userID, randNum.toString(),redis.print)

  res.json({
    'userID' : userID,
  })
})

router.post('/validate', function(req, res, next){
  var userID = req.body.userID
  var guessNum = req.body.guessNum
  var randNum = 0

  client.get(userID, function(err, result){
    if(err){
      console.log(err.message)
      throw err
    }
    randNum = parseInt(result, 10)
    console.log("db num "+randNum)

    var c = 0
    var b = 0

    if(guessNum == randNum){
      client.DEL(userID)
      return res.json({
        b : 4,
        c : 0,
      })
    }

    var randNumArray = randNum.toString().split('').map(Number);
    var guessNumArray = guessNum.toString().split('').map(Number);


    console.log("randNum : " + randNumArray + "\n");
    console.log("guessNum : " + guessNumArray + "\n");
    
    guessNumArray.forEach(element => {
      if (randNumArray.includes(element))
        c++
    });

    for (var i = 0; i < guessNumArray.length; i++ ){
      if( randNumArray[i] == guessNumArray[i]){
        c--;
        b++;
      }
    }

    console.log(b + "b\n")
    console.log(c + "c\n")

    return res.json({
      "b" : b,
      "c" : c
    })    
  })

  
})

router.post('/getnum',function (req, res, next){
  var userID = req.body.userID;

  client.get(userID, function(err, result){
    if(err){
      console.log(err.message)
      res.json({
        "error" : err.message
      })
    }
    console.log(result)
    res.json({
      number : result
    })
  })
})

module.exports = router;
