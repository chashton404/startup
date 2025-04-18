const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rollerskateClicker');
const usersCollection = db.collection('users');
const scoresCollection = db.collection('scores');
const highScoresCollection = db.collection('highScores');
const userSkatesCollection = db.collection('userSkates');
const userEquippedSkatesCollection = db.collection('userEquippedSkates');

//Test connection on to the Database
(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connect to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
})();

function getUser(userName) {
    return usersCollection.findOne({ userName: userName });
}

function getUserByToken(token) {
    return usersCollection.findOne({ token: token });
}

function getUserSkates(userName) {
    return userSkatesCollection.findOne({ userName: userName });
}

function getUserScore(userName) {
    return scoresCollection.findOne({ userName: userName});
}

function getHighScores() {
    return highScoresCollection.findOne({ _id: 'currentHighScores' });
}

function getUserEquippedSkate(userName) {
    return userEquippedSkatesCollection.findOne({ userName: userName });
}

async function createUser(userName, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const token = uuid.v4();

    const user = {
        userName,
        password: passwordHash,
        token
    };

    const score = {
        userName,
        clicks: 0
    };

    const skates = {
        userName,
        skates: []
    };

    const equippedSkate = {
        userName,
        skate: {
            skateName: null,
            topColor: null,
            stripeColor: null,
            baseColor: null,
            wheelColor: null,
            toeStopColor: null,
            skateStatus: 'not equipped'
        }
    };

    await usersCollection.insertOne(user);
    await scoresCollection.insertOne(score);
    await userSkatesCollection.insertOne(skates);
    await userEquippedSkatesCollection.insertOne(equippedSkate);

    return user;
}

async function addHighScore(highScore) {
    await highScoresCollection.insertOne(highScore);
}

async function addNewUserSkate(userName, skate) {
    await userSkatesCollection.updateOne(
        { userName: userName },
        { $push: { skates: skate } }
    );
}

async function updateUser(user){
    await usersCollection.updateOne({ userName: user.userName }, { $set: user });
}

async function updateUserSkates(userName, skates) {
    await usersCollection.updateOne({ userName: userName }, { $set: { skates: skates } });
}

async function updateHighScores(newHighScores) {
    await highScoresCollection.replaceOne({ _id: 'currentHighScores' },{ _id: 'currentHighScores', scores: newHighScores },{upsert: true});
}

async function equipUserSkate(userName, index) {
    const userSkatesDoc = await userSkatesCollection.findOne({ userName: userName });
    const skates = userSkatesDoc.skates;

    const newSkates = skates.map((skate, i) => ({
        ...skate,
        skateStatus: i === index ? 'equipped' : 'not equipped'
    }));

    const equippedSkate = newSkates[index];

    await userSkatesCollection.updateOne(
        { userName },
        { $set: { skates: newSkates } }
    );

    await userEquippedSkatesCollection.updateOne(
        { userName },
        { $set: { skate: equippedSkate } },
        { upsert: true }
    );

    return newSkates;
}


async function incrementScore(userName) {
    await scoresCollection.findOneAndUpdate({ userName: userName }, { $inc: { clicks: 1 } },{ returnDocument: 'after' });

    // Update the Highscores in the database
    const newHighScores = await scoresCollection.find({}).sort({ clicks: -1 }).limit(10).toArray();
  
    await updateHighScores(newHighScores);

    newScoreDoc = await getUserScore(userName);
    newScore = newScoreDoc.clicks;
  
    return newScore;
  }

module.exports = {
    getUser,
    getUserByToken,
    getUserSkates,
    getHighScores,
    getUserScore,
    getUserEquippedSkate,
    createUser,
    addHighScore,
    addNewUserSkate,
    updateUser,
    updateUserSkates,
    equipUserSkate,
    incrementScore
}