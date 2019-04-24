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
require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);


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
    saveFriend(friendObj);
    return closestMatch(friendObj);

}

function saveFriend(friendObj) {
    let friendArr = getFriendsJSON();
    friendArr.push(friendObj);
    fs.writeFileSync(__dirname + '/app/data/friends.js', JSON.stringify(friendArr));
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

    // reduce score diffs to sum for each friend
    let diffScoreArr = diffScores.map((friendScore, i)  => {
        return {"score": friendScore.reduce((t,n) => t + n), "id" : i};
    });
    // console.log('diffScoreArr', diffScoreArr);

    diffScoreArr.pop();  // remove last item which is the current friend(yourself)
    let lowest = diffScoreArr.reduce((prev, curr) =>  {
        return prev.score < curr.score ? prev : curr;
    });

    return JSON.stringify(friendArr[lowest.id]);
}