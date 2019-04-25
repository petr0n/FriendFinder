module.exports = function(app,getFriendsJSON) {
    // API ROUTES
    app.post('/api/saveSurvey', function (req, res) {
        if (req.body) {
            let bestMatch = addFriend(req.body);
            // console.log(bestMatch);
            return res.json(bestMatch);
        }
    });

    app.get('/api/allFriends', function (req, res) {
        return res.json(getFriendsJSON());
    });
}

