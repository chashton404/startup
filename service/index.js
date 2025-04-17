const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const app = express();
const path = require('path');
const DB = require('./database.js');
const { liveLeaderboard } = require('./liveLeaderboard.js')

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 3000;

//lets create the arrays that we want to have on the backend
//eventually this will all be in a database

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    console.log('Creating user:', req.body.userName);
    if (await findUser('userName', req.body.userName)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.userName, req.body.password);
        setAuthCookie(res, user.token);
        res.send({ userName: user.userName });
    }
});
  
// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('userName', req.body.userName);

    if (user) {
        const passwordMatches = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatches) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            return res.send({ userName: user.userName });
        }
    }

    res.status(401).send({ msg: 'Unauthorized' });
});
  
// DeleteAuth logout a user
apiRouter.post('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
      // Update the user in the database
      await DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
};

//AddSkate used to add a recently designed skate to the user's skates
apiRouter.post('/addSkate', verifyAuth, async (req, res) => {
    const userName = req.body.userName;
    const skate = {
        skateName: req.body.newSkate.skateName,
        topColor: req.body.newSkate.topColor,
        stripeColor: req.body.newSkate.stripeColor,
        baseColor: req.body.newSkate.baseColor,
        wheelColor: req.body.newSkate.wheelColor,
        toeStopColor: req.body.newSkate.toeStopColor,
        skateStatus: req.body.newSkate.skateStatus
    }
    
    // Push the skate onto the user's skates database
    DB.addNewUserSkate(userName, skate);

    // Get the updated skates array from the database
    const userSkates = await DB.getUserSkates(userName);

    // If the user only has one skate, set it to equipped
    if (userSkates.skates.length === 1) {
        userSkates.skates[0].skateStatus = 'equipped';
        await DB.updateUserSkates(userName, userSkates);

        const skateToBeEquipped = userSkates.skates[0];
        await DB.equipUserSkate(userName, skateToBeEquipped);
    }  

    return res.status(200).send({ msg: 'Skate added successfully' });
})

// Function to Get the user's skates
apiRouter.get('/getSkates', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);

    if (!user) {
        return res.status(401).send({ msg: 'User not found' });
    }
    userName = user.userName;
    const userSkatesDoc = await DB.getUserSkates(userName);
    const userSkates = userSkatesDoc.skates

    res.send(userSkates);
});

// Function to Get the user's equipped skate
apiRouter.get('/getEquippedSkate', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userName = user.userName;

    if (!user) {
        return res.status(401).send({ msg: 'User not found' });
    }

    // Get the User's Equipped Skate from the database
    const userEquippedSkateDoc = await DB.getUserEquippedSkate(userName)
    const userEquippedSkate = userEquippedSkateDoc.skate;

    res.send(userEquippedSkate);
});

// Function to Equip a skate
apiRouter.post('/equipSkate', verifyAuth, async (req, res) => { 
    const user = await findUser('token', req.cookies[authCookieName]);
    const newSkates = await DB.equipUserSkate(user.userName, req.body.index);
    res.send({ msg: 'Skate equipped successfully', skates: newSkates });
});


//Function to Delete a skate
apiRouter.post('/deleteSkate', verifyAuth, async (req, res) => {
    //find the user's skates array
    const user = await findUser('token', req.cookies[authCookieName]);
    const userName = user.userName;
    const index = req.body.index;

    if (!user) {
        return res.status(401).send({ msg: 'User not found' });
    }

    const userSkatesDoc = await DB.getUserSkates(userName);
    const userSkates = userSkatesDoc.skates

    if (index < 0 || index >= userSkates.length) {
        return res.status(400).send({ msg: 'Invalid skate index' });
    }

    userSkates.splice(index, 1);

    // Update the user's skates in the database
    await DB.updateUserSkates(userName, userSkates);

    res.status(200).send({ msg: 'Skate deleted successfully', skates: userSkates });
})

// Function to Check if a User has Skates
apiRouter.get('/hasSkates', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userName = user.userName;
    if (!user) {
        return res.status(401).send({msg: 'unauthorized'});
    }
    // Find the user's skates array from the database
    const userSkatesDoc = await DB.getUserSkates(userName);
    const userSkates = userSkatesDoc.skates;

    // Check if the skates array has at least one skate
    const hasSkates = userSkates.length > 0;

    // Respond with the boolean value
    res.status(200).send({ hasSkates });
});

// Function to Get the high scores
apiRouter.get('/getHighScores', verifyAuth, async (req, res) => {
    const highScoresDoc = await DB.getHighScores();
    res.json(highScoresDoc?.scores || []);
});

// Function for when the user clicks the skate
apiRouter.post('/skateClicked', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userName = user.userName;
    if (!user) {
        return res.status(401).send({ msg: 'Unauthorized' });
    }

    const newScore = await DB.incrementScore(userName);
    highScoresDoc = await DB.getHighScores();
    highScores = highScoresDoc.scores;
    broadcastHighScores(highScores);

    res.status(200).send({userScore: newScore});
});

// Function to get the user's score
apiRouter.get('/getUserScore', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userName = user.userName
    if (!user) {
        return res.status(401).send({ msg: 'Unauthorized' });
    }

    const userDoc = await DB.getUserScore(userName);
    if (!userDoc) {
        return res.status(404).send({ msg: 'User score not found' });
    }
    
    res.status(200).send({userScore: userDoc.clicks});
});

// Function to print users
apiRouter.get('/users', async (req, res) => {
    res.send(users);
});

// Simple root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  
// Catch-all route
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

//PUT OTHER API CALLS HERE

// FUNCTIONS FOR THE API CALLS

//Function to find a user
async function findUser(field, value) {
    if (!value) {
        return null;
    }
    if (field === 'token') {
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

// Start listening on server
const httpService = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const { broadcastHighScores } = liveLeaderboard(httpService);