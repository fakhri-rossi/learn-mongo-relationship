const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/relation_db')
    .then((result) => {
        console.log('connected to mongodb');

    }).catch((err) => {
        console.log(err);

    });


const userSchema = new mongoose.Schema({
    name: String,
    addresses: [{
        _id: false,
        street: String,
        city: String,
        country: String
    }]
});

const User = mongoose.model('User', userSchema);

// === One to Few ===
// one user has few addresses (stored in same document)
const makeUser = async() => {
    const user = new User({
        name: 'Rossi'
    });

    user.addresses.push({
        street: 'Jl. Pandanwangi',
        city: 'Bandung',
        country: 'Indonesia'
    });

    const res = await user.save();

    console.log(res);
};

// makeUser();

const addAddress = async (id) => {
    const user = await User.findById(id);

    user.addresses.push({
        street: "Jl Bintara 12A",
        city: 'Bekasi',
        country: 'Indonesia'
    });

    const res = await user.save();
    console.log(res);
};

// addAddress('6670359b2495cab2b8cf965d');
