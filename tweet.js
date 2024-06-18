const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/relation_db')
    .then((result) => {
        console.log("Connected to mongodb");

    }).catch((err) => {
        console.log(err);

    });

const userSchema = new mongoose.Schema({
    username: String,
    age: Number
});

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweet = async() => {
    const user = await User.findById('6670fadbcc5c18dbfe4a5330');

    const tweet = new Tweet({
        text: 'Laperrr',
        likes: 2
    });

    tweet.user = user;
    console.log(user);
    console.log(tweet);
    // user.save();
    tweet.save();
};

// makeTweet();

const showTweet = async(id) => {
    const tweet = await Tweet.findById(id).populate('user');
    console.log(tweet);
};

showTweet('6670fadbcc5c18dbfe4a5331');