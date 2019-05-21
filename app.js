const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require("morgan");
const app = express();
const path = require('path');
const log = console.log;
const PORT = process.env.PORT || 4001;
var cors = require('cors');
const appRoute =  require('./Routes/postRoutes');
const userRoute =  require('./Routes/userDataRouter');
const projectRoute =  require('./Routes/projectRoutes');
const Connections =  require('./Routes/Connections');

mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://CreativeStellars:2fEfIQ62pDb5A6QJ@cluster0-6fpb5.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, {useMongoClient: true});
//jmRbNsYEVMf5WyAI password
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
//app.use(bodyParser=urlencoded({extended: true}));
var Router = express.Router();
//app.use(authentication)
app.use('/api',appRoute);
app.use('/api',userRoute);
app.use('/api',projectRoute);
app.use('/api',Connections);

//app Routes 
//appRoute.init(Router);

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('CLIENT/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(_dirname,'CLIENT','build','index.html'));
    });   
}
app.listen(PORT,()=>{
    log(`Server is starting at 4001: ${PORT}`);
});
