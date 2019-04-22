// server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app/public'));



// Routes
// =============================================================
// HTML ROUTES
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './app/public/home.html'));
});

app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, './app/public/survey.html'));
});


// API ROUTES
app.post('/api/saveSurvey', function (req, res) {
    // console.log('req', req.body);
    if (req.body) {
        let bestMatch = addFriend(req.body);
        console.log(bestMatch);
        return res.json(bestMatch);
    }
    // return 'hello';
});

app.post('/api/friends', function (req, res) {
   
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


function getFriendsJSON(){
    let friendList = fs.readFileSync(__dirname + '/app/data/friends.js', 'utf8');
    return JSON.parse(friendList);
}

function addFriend(friendFormObj){
    let scoresArr = [];
    for (let i = 1; i <= 10; i++){
        scoresArr.push(parseInt(friendFormObj['q' + i]));
    }
    let friendObj = {
        "name": friendFormObj.fullName,
        "photo": friendFormObj.photo,
        "scores": scoresArr
    }
    // saveFriend(friendObj);
    return closestMatch(friendObj);

}

function saveFriend(friendObj) {
    let friendArr = getFriendsJSON();
    friendArr.push(friendObj);
    // console.log(friendArr);
    fs.writeFileSync(__dirname + '/app/data/friends.js', JSON.stringify(friendArr));
    // , function(err){
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
}

function closestMatch(currentFriend){
    //get friends lst
    let friendArr = getFriendsJSON();
    
    // get diffs between current friend and friends list
    let diffScores = friendArr.map((friend, i) => {
        let newDiffArr = [];
        for (let i = 0; i < friend.scores.length; i++) {
            newDiffArr.push(Math.abs(friend.scores[i] - currentFriend.scores[i]));
        }
        return newDiffArr;
    });
    // console.log('diffScores', diffScores);

    // reduce score diffs to sum for each friend
    let diffScoreArr = diffScores.map((friendScore, i)  => {
        return {"score": friendScore.reduce((t,n) => t + n), "id" : i};
    });
    // console.log('diffScoreArr', diffScoreArr);

    diffScoreArr.pop();  // remove last item which is the current friend(yourself)
    let lowest = diffScoreArr.reduce((prev, curr) =>  {
        return prev.score < curr.score ? prev : curr;
    });

    // console.log('lowest', lowest);
    // console.log(friendArr[lowest.id]);
    return JSON.stringify(friendArr[lowest.id]);
}
/*


Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.

Example:

User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]

User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]

Total Difference: 2 + 1 + 2 = 5

Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on.
The closest match will be the user with the least amount of difference.
*/