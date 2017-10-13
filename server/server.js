require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      axios = require('axios'),
      cors = require('cors')
      controller = require('./controller'),
      twilio = require('twilio');

const app = express();
app.use(cors());
app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
        secure: false
    }
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
// if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'));
// }

massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db);
}).catch(err => console.log(err))

let usefulID = "";

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done){
    usefulID = profile.identities[0].user_id.toString()
    const db = app.get('db');
    db.get_user([profile.identities[0].user_id]).then(user => {
        
        if (user[0]){
            console.log('if user exists', user)
            
            done(null, user[0].id)
        } else {
            db.create_user([profile.displayName, profile.emails[0].value, profile.picture, profile.identities[0].user_id])
            .then(user => {
                console.log('new user', user)
                done(null, user[0].id)
            })
        }
    }); 
}))

passport.serializeUser(function(userID, done){
    console.log('serialize', userID)
    done(null, userID);
})

passport.deserializeUser(function(userID, done){
    console.log('deser', userID)
    app.get('db').current_user([userID]).then(user => {
        done(null, user[0])
    })
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: `${process.env.SERVERHOST}/#/home`,
    failureRedirect: '/auth'
}))

app.get('/auth/user', passport.authenticate("auth0"), (req, res, next) => {
    console.log(req.session)
    if (!req.user){
        return res.status(404).send('User not found');
    } else {
        return res.status(200).send(req.user);
    }
})



app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302, `https:${process.env.AUTH_DOMAIN}/v2/logout?returnTo=${process.env.SERVERHOST}`)
})

app.get('/api/search/:that', (req, res) => {
    console.log(req.params.that)
    axios.get(`https://api.yelp.com/v3/businesses/search?${req.params.that}`,{'headers': {'Authorization':process.env.ACCESS_TOKEN}})
    .then(response => {
        res.status(200).json(response.data)
    }).catch(err=>console.log("maybe here", err))
})

app.get('/api/business/:thing',(req, res) => {
    axios.get(`https://api.yelp.com/v3/businesses/${req.params.thing}`,{'headers': {'Authorization':process.env.ACCESS_TOKEN}})
    .then(response => {
        res.status(200).json(response.data)
    }).catch(err => console.log(err))
})

app.get('/api/reviews/:thang',(req, res) => {
    axios.get(`https://api.yelp.com/v3/businesses/${req.params.thang}/reviews`,{'headers': {'Authorization':process.env.ACCESS_TOKEN}})
    .then(response => {
        res.status(200).json(response.data)
    }).catch(err => console.log(err))
})

app.get('/api/foodsearch/:boom', (req, res) => {
    axios.get(`http://food2fork.com/api/search?key=6567b231491290ae92e3a731730b6723&q=${req.params.boom}`, {'headers': {'Access-Control-Allow-Origin': '*'}})
    .then( response => {
        res.status(200).json(response.data)
    })
})

app.get('/api/getrecipe/:bam', (req, res) => {
    axios.get(`http://food2fork.com/api/get?key=6567b231491290ae92e3a731730b6723&rId=${req.params.bam}`, {'headers': {'Access-Control-Allow-Origin': '*'}})
    .then( response => {
        res.status(200).json(response.data)
    })
})

var client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/api/sendingreds', (req, res) => {
    client.messages.create({
        to: req.body.number,
        from: '(563) 607-5800',
        body: req.body.ingredients
    });
})

app.post('/api/postfave',controller.postFave);
app.get('/api/getfaves',controller.getFaves);
app.get('/api/getfavesrec',controller.getFavesRec);
app.get('/api/getfavesres',controller.getFavesRes);
app.delete('/api/deletefave/:name',controller.deleteFave);
app.put('/api/editnote', controller.editNote);


const PORT = 3535;
app.listen(PORT, () => console.log('listening on port: ', PORT));
