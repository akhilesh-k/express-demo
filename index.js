const morgan=require('morgan');     //logging data
const Joi=require('joi');
const config=require('config');
const debug=require('debug')('app:startup');

const express=require('express');
const app=express();
const helmet=require('helmet');
const logger=require('./middleware/logger');
const authenticator=require('./middleware/authentication')
const courses=require('./routes/courses');
const courses=require('./routes/home');

app.set('view engine','pug');   //npm loads this internally
app.set('views','./views');     //default path


console.log(`NODE_ENV:${process.env.NODE_ENV}`);            //global object in node, gives env details
console.log(`app env:${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses',courses)                         // for any routes /api/courses use the router courses
app.use('/',home)

// configuration
console.log('Application Name: '+ config.get('name'));
console.log('Mail Server: '+ config.get('mail.host'));
//console.log('Mail password: '+ config.get('mail.password'));      //reads from env variable

if(app.get('env')==='development'){                         //morgan gets enabled in prod environment only
    app.use(morgan('tiny'));                                //to enable $export NODE_ENV=production in terminal
    console.log('Morgan Enabled: Debugger Initiated');                          //to enable $set NODE_ENV=production in powershell
}
 
debug('Connected to Database Debugger..');

app.use(logger);
app.use(authenticator);



//PORT 
const port=process.env.port || 3000;                //use process port or 3000
app.listen(port,()=>{
    console.log(`listening on port ${port}`);       //dynamically sets the port value in message
});
