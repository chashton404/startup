const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

const PORT = 3000;

//lets create the arrays that we want to have on the backend
//eventually this will all be in a database
let users = [];
let scores = [];
let highScores = [];
let userSkates = [];
let userEquippedSkates = [];

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
    console.log('Creating user:', req.body.username);
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});
  
// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});
  
// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
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
    const user = await findUser('token', req.cookies[authCookieName]);

    const userSkatesIndex = userSkates.findIndex((userSkate) => userSkate.username === user.username);
    if (userSkatesIndex === -1) {
        return res.status(404).send({ msg: 'User not found' });
    }

    const skate = {
        skateName: req.body.skateName,
        topColor: req.body.topColor,
        stripeColor: req.body.stripeColor,
        baseColor: req.body.baseColor,
        wheelColor: req.body.wheelColor,
        toeStopColor: req.body.toeStopColor,
        skateStatus: req.body.skateStatus
    }
    
    userSkates[userSkatesIndex].skates.push(skate);

    // If the user has only one skate then that should be the equipped skate
    if (userSkates[userSkatesIndex].skates.length === 1) {
        userSkates[userSkatesIndex].skates[0].skateStatus = 'equipped';
        userEquippedSkates[userSkatesIndex].skate = userSkates[userSkatesIndex].skates[0];
        userEquippedSkates[userSkatesIndex].skate.skateStatus = 'equipped';
    }

    return res.status(200).send({ msg: 'Skate added successfully' });
})

// Function to Get the user's skates
apiRouter.get('/getSkates', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userSkatesIndex = userSkates.findIndex((userSkate) => userSkate.username === user.username);
    if (userSkatesIndex === -1) {
        return res.status(404).send({ msg: 'User not found' });
    }
    res.send(userSkates[userSkatesIndex].skates);
});

// Function to Get the user's equipped skate
apiRouter.get('/getEquippedSkate', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userEquippedSkatesIndex = userEquippedSkates.findIndex((userSkate) => userSkate.username === user.username);
    if (userEquippedSkatesIndex === -1) {
        return res.status(404).send({ msg: 'User not found' });
    }
    res.send(userEquippedSkates[userEquippedSkatesIndex].skate);
});

// Function to Equip a skate
apiRouter.post('/equipSkate', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userSkatesIndex = userSkates.findIndex((userSkate) => userSkate.username === user.username);
    if (userSkatesIndex === -1) {
        return res.status(404).send({ msg: 'User not found' });
    }

    const index = req.body.index;

    const userSkateData = userSkates[userSkatesIndex].skates;
    const newSkates = userSkateData.map((skate, i) => {
        if (i === index) {
            return {...skate, skateStatus: 'equipped'};
        } else {
            return {...skate, skateStatus: 'not equipped'};
        }
    });

    userSkates[userSkatesIndex].skates = newSkates;
    const equippedSkate = userSkates[userSkatesIndex].skates[index];
    userEquippedSkates[userSkatesIndex].skate = equippedSkate;
    res.send({ msg: 'Skate equipped successfully', skates: newSkates})
    
})

//Function to Delete a skate
apiRouter.post('/deleteSkate', verifyAuth, async (req, res) => {
    //find the user's skates array
    const user = await findUser('token', req.cookies[authCookieName]);
    const userSkatesIndex = userSkates.findIndex((userSkate) => userSkate.username === user.username);
    if (userSkatesIndex === -1) {
        return res.status(404).send({msg: 'User not found'});
    }

    const skatesArray = userSkates[userSkatesIndex].skates;

    const { index } = req.body;
    if (index < 0 || index >= skatesArray.length) {
        return res.status(400).send({ msg: 'Invalid skate index' });
    }

    skatesArray.splice(index, 1);

    res.status(200).send({ msg: 'Skate deleted successfully', skates: skatesArray });
})

// Function to Check if a User has Skates
apiRouter.get('/hasSkates', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (!user) {
        return res.status(401).send({msd: unauthorized});
    }
    // Find the user's skates array
    const userSkatesEntry = userSkates.find((entry) => entry.username === user.username);
    if (!userSkatesEntry) {
        return res.status(404).send({ msg: 'User skates not found' });
    }

    // Check if the skates array has at least one skate
    const hasSkates = userSkatesEntry.skates.length > 0;

    // Respond with the boolean value
    res.status(200).send({ hasSkates });
});

// Function to Get the high scores
apiRouter.get('/getHighScores', verifyAuth, async (req, res) => {
    res.json(highScores);
});

// Function to for when the user clicks the skate
apiRouter.post('/skateClicked', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (!user) {
        return res.status(401).send({ msg: 'Unauthorized' });
    }
    const userIndex = scores.findIndex((score) => score.username === user.username);
    if (userIndex === -1) {
        return res.status(404).send({ msg: 'User not found' });
    }
    scores[userIndex].clicks += 1;

    // Update the high scores
    scores.sort((a, b) => b.clicks - a.clicks);
    highScores = scores.slice(0, 10);

    res.status(200).send({
        userScore: scores[userIndex].clicks,
        highScores,
    });
});

// Function to get the user's score
apiRouter.get('/getUserScore', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (!user) {
        return res.status(401).send({ msg: 'Unauthorized' });
    }
    const userIndex = scores.findIndex((score) => score.username === user.username);
    if (userIndex === -1) {
        return res.status(404).send({ msg: 'User not found' });
    }
    res.status(200).send(scores[userIndex].clicks);
});

// Function to print users
apiRouter.get('/users', async (req, res) => {
    res.send(users);
});

// Simple root route
app.get('/', (req, res) => {
    res.json({ msg: 'Rollerskate Service' });
});
  
// Catch-all route
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

//PUT OTHER API CALLS HERE

// FUNCTIONS FOR THE API CALLS

//Function to create a new user
async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4()
    }
    users.push(user);

    const score = {
        username: username,
        clicks: 0
    }
    scores.push(score);

    const skates = {
        username: username,
        skates: []
    }
    userSkates.push(skates);

    const equippedSkate = {
        username: username,
        skate: {
            skateName: 'null',
            topColor: 'null',
            stripeColor: 'null',
            baseColor: 'null',
            wheelColor: 'null',
            toeStopColor: 'null',
            skateStatus: 'not equipped'
        }     
    }
    userEquippedSkates.push(equippedSkate)

    return user;
}

//Function to find a user
async function findUser(key, value) {
    if (!value) {
        return null;
    }
    return users.find ((user) => user[key] === value);
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});