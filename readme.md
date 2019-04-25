# FriendFinder by PA

This is a simple friend finder app build with Node and Express. Fill out our hightly scientific survey and this app will match you with your "perfect" match!

## Home 
Shows all the friends. This is pulled in from a local file in the form of a JSON object and uses a for loop to create elements for each tile.

## Survey
The survey is a simple HTML form that is processed using jQuery ajax. It uses Bootstrap for validation, a modal and layout.

Once the user submits the form, the data is processed on the back end and a JSON response is sent back to the page and is match is made. 


____



## Technical
App uses:
* Express
* Node fs & path
* Body Parser

Front End uses:
* jQuery
* Bootstrap 4