var express = require('express');
var request = require('request');

var router = express.Router();

var Users = require('../../models/ca/CA_User');

// Synchronous query to fetch CA Score
router.get('/sync', function(req, res) {
    Users.find(function (err, allUsers) {
        if (err) return next(err);
        // console.log(allUsers, 'allUsers');
        if (allUsers.length > 0) {
            function loopThroughUsers(userIndex) {
                if (allUsers[userIndex].posts.length > 0) {
                    var totalLikes = 0;
                    var totalScore = 0;
                    var totalShares = 0;
                    function makeSynchronousRequest(postIndex) {
                        var options = {
                            method: 'GET',
                            uri: `https://graph.facebook.com/${allUsers[userIndex].fb_id}_${allUsers[userIndex].posts[postIndex]}?fields=likes.limit(0).summary(true)`,
                            qs: {
                                access_token: allUsers[userIndex].access_token
                            }
                        }
                        request(options, function(err, response, body){
                            if (err) {console.log(err, `Request Failed. User ID ${allUsers[userIndex].fb_id} & Post_ID ${allUsers[userIndex].posts[postIndex]}`)};
                            console.log(`https://graph.facebook.com/${allUsers[userIndex].fb_id}_${allUsers[userIndex].posts[postIndex]}?fields=likes.limit(0).summary(true)`, 'URL');
                            if(response && response.body && JSON.parse(response.body).likes){
                                var likes = JSON.parse(response.body).likes.summary.total_count;
                                console.log(likes, 'Likes')
                                var score;
                                if(likes > 4){
                                    if(likes > 50){
                                        score = 50 + (likes-50)*2 + 5;
                                    }else{
                                        score = 5 + likes;
                                    }
                                }else{
                                    score = 5 + likes/2;
                                }
                                totalLikes = totalLikes + likes;
                                totalScore = totalScore + score;
                                totalShares = totalShares + 1;
                            }
                            if(postIndex < allUsers[userIndex].posts.length - 1) {
                                makeSynchronousRequest(postIndex+1);
                            } else {
                                totalScore = totalScore + allUsers[userIndex].referrals*25;
                                var updateData = {
                                    score: totalScore,
                                    likes: totalLikes,
                                    shares: totalShares
                                }
                                console.log('Finding and Updating ID: ' + allUsers[userIndex].fb_id);
                                Users.update({fb_id: allUsers[userIndex].fb_id}, updateData, function(err) {
                                    if(err){
                                        console.log(err, 'Find and Update Failed');
                                        return false;
                                    }
                                    console.log('Successfully Updated ID: '+allUsers[userIndex].fb_id);
                                    return true
                                })
                                if (userIndex < allUsers.length - 1) {
                                    loopThroughUsers(userIndex + 1);
                                } else {
                                    res.json('done');
                                }
                            }
                        })
                    }
                    makeSynchronousRequest(0);
                } else {
                    if (userIndex < allUsers.length - 1) {
                        loopThroughUsers(userIndex + 1);
                    } else {
                        res.json('done');
                    }
                }
            }
            loopThroughUsers(0);
        } else {
            res.status(400).send({success: false, msg: 'No Users Found'});
        }
    });
});

// Asynchronous Query to Fetch CA Score
// Exponentially Faster
router.get('/async', function(req, res) {
    Users.find(function (err, allUsers) {
        if (err) return next(err);
        if (allUsers.length > 0) {
            var allUsersResponseCounter = 0;
            function updateAllUsersResponseCounter() {
                allUsersResponseCounter = allUsersResponseCounter + 1;
                if (allUsersResponseCounter === allUsers.length) {
                    res.json('done');
                }
            }
            allUsers.map(function(eachUser, userIndex) {
                if (eachUser.posts.length > 0) {
                    var totalLikes = 0;
                    var totalScore = 0;
                    var totalShares = 0;
                    var eachUserFacebookResponseCounter = 0;
                    function makeAsyncDBUpdate() {
                        totalScore = totalScore + eachUser.referrals*25;
                        var updateData = {
                            score: totalScore,
                            likes: totalLikes,
                            shares: totalShares
                        }
                        console.log('Finding and Updating ID: ' + eachUser.fb_id);
                        Users.update({fb_id: eachUser.fb_id}, updateData, function(err) {
                            if(err){
                                updateAllUsersResponseCounter();
                                console.log(err, 'Find and Update Failed');
                                return false;
                            } else {
                                console.log('Successfully Updated ID: '+eachUser.fb_id);
                                updateAllUsersResponseCounter();
                                return true
                            }
                        })
                        // updateAllUsersResponseCounter()
                    }
                    function updateEachUserFacebookResponseCounter() {
                        eachUserFacebookResponseCounter = eachUserFacebookResponseCounter + 1;
                        console.log('updateEachUserFacebookResponseCounter ' + userIndex, eachUserFacebookResponseCounter, eachUser.posts.length);
                        if (eachUserFacebookResponseCounter === eachUser.posts.length) {
                            makeAsyncDBUpdate();
                        }
                    }
                    eachUser.posts.map(function(post_id) {
                        var options = {
                            method: 'GET',
                            uri: `https://graph.facebook.com/${eachUser.fb_id}_${post_id}?fields=likes.limit(0).summary(true)`,
                            qs: {
                                access_token: eachUser.access_token
                            }
                        }
                        request(options, function(err, response, body) {
                            console.log(`https://graph.facebook.com/${eachUser.fb_id}_${post_id}?fields=likes.limit(0).summary(true)`, 'URL');
                            if (err) {
                                console.log(err, `Request Failed. User ID ${eachUser.fb_id} & Post_ID ${post_id}`);
                                updateEachUserFacebookResponseCounter();
                            } else if(response && response.body && JSON.parse(response.body).likes){
                                var likes = JSON.parse(response.body).likes.summary.total_count;
                                console.log(likes, 'Likes')
                                var score;
                                if(likes > 4){
                                    if(likes > 50){
                                        score = 50 + (likes-50)*2 + 5;
                                    }else{
                                        score = 5 + likes;
                                    }
                                }else{
                                    score = 5 + likes/2;
                                }
                                totalLikes = totalLikes + likes;
                                totalScore = totalScore + score;
                                totalShares = totalShares + 1;
                                updateEachUserFacebookResponseCounter()
                            } else {
                                updateEachUserFacebookResponseCounter();
                            }
                        })
                    })
                } else {
                    updateAllUsersResponseCounter();
                }
           })
        } else {
            res.status(400).send({success: false, msg: 'No Users Found'});
        }
    });
});

module.exports = router;