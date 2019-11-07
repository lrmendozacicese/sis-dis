const mongoose = require('mongoose');

const URI = process.env.MONGOOSE_URI
    ? process.env.MONGOOSE_URI
    : 'mongodb+srv://lrmendoza:mendoza26@lab-sis-dist-8xh0p.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database is connected');
});