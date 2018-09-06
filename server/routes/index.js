var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    "Title" : "The Number Game API",
    "Version" : "1.0.0"
  });
});

router.get('/generate', function(req, res, next){
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

  res.json({
    Number : randNum
  })
})

router.post('/validate', function(req, res, next){
  var randNum = req.body.randNum
  var guessNum = req.body.guessNum

  var c = 0
  var b = 0

  if(guessNum == randNum)
    res.json({
      b : 4,
      c : 0,
    })

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

  res.json({
    "b" : b,
    "c" : c
  })
})

module.exports = router;
