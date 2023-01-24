const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const app = express();
const _ = require('lodash');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const { json } = require('body-parser');
const { result } = require('lodash');
require('dotenv').config();

const dbconnection = mysql.createPool({
    host     : process.env.DB_HOST, 
    user     : process.env.DB_USER, 
    password : process.env.DB_PASSWORD, 
    database : process.env.DB_NAME
}).promise();

console.log(process.env.DB_HOST);

const server = app.listen(3000,()=> {
    console.log ('nodejs is running on port 3000!')
})

const connection = mysql.createConnection({
    host     : process.env.DB_HOST, 
    user     : process.env.DB_USER, 
    password : process.env.DB_PASSWORD, 
    database : process.env.DB_NAME
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  
  console.log(process.env.URL)


app.use(cors());
// SET OUR VIEWS AND VIEW ENGINE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'imgs')));
 // APPLY COOKIE SESSION MIDDLEWARE

app.use(cookieSession({
    name: 'session',
    keys: ['SP1', 'SP2'],
    maxAge:  24 * 1200 * 1200 * 1000
}));

// DECLARING CUSTOM MIDDLEWARE
const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('login-register');
    }
    next();
}
const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}
// END OF CUSTOM MIDDLEWARE
// ROOT PAGE
app.get('/', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('home',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('home')
});



app.get('/index', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('index',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('index')
});

app.get('/indexflash', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('indexflash',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('indexflash')
});
app.get('/indexbitkub', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('indexbitkub',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('indexbitkub')
});

app.get('/indexshipsabuy', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('indexshipsabuy',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('indexshipsabuy')
});
app.get('/indexquik', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('indexquik',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('indexquik')
});
app.get('/indexshirtHR', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('indexshirtHR',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('indexshirtHR')
});
app.get('/indexpoststation', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('indexpoststation',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('indexpoststation')
});

app.get('/rpa', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('rpa',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('rpa')
});
app.get('/rpaBitkub', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('rpaBitkub',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('rpaBitkub')
});
app.get('/rpaflash', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('rpaflash',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('rpaflash')
});
app.get('/rpashipsabuy', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('rpashipsabuy',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('rpashipsabuy')
});
app.get('/rpaquik', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('rpaquik',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('rpaquik')
});
app.get('/rpaShirtHR', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('rpaShirtHR',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('rpaShirtHR')
});
app.get('/rpapoststation', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('rpapoststation',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('rpapoststation')
});
app.get('/rparequisition', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('rparequisition',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('rparequisition')
});
app.get('/Requisition', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('Requisition',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('Requisition')
});
app.get('/HistorySetShop', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySetShop',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySetShop')
});
app.get('/HistorySetPlus', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySetPlus',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySetPlus')
});
app.get('/HistorySet3000', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySet3000',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySet3000')
});
app.get('/HistorySet4Shipsabuy', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySet4Shipsabuy',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySet4Shipsabuy')
});
app.get('/HistorySet3Shipsabuy', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySet3Shipsabuy',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySet3Shipsabuy')
});
app.get('/HistorySet2Shipsabuy', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySet2Shipsabuy',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySet2Shipsabuy')
});
app.get('/HistorySet1Shipsabuy', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySet1Shipsabuy',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySet1Shipsabuy')
});
app.get('/HistorySellPageShipsabuy', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySellPageShipsabuy',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySellPageShipsabuy')
});
app.get('/HistorySellPageFlash', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySellPageFlash',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySellPageFlash')
});
app.get('/HistorySellPageBitkub', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySellPageBitkub',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySellPageBitkub')
});
app.get('/HistorySellPageQuik', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySellPageQuik',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySellPageQuik')
});
app.get('/HistorySellPagePoststation', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySellPagePoststation',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySellPagePoststation')
});
app.get('/HistorySellPageShirtHR', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySellPageShirtHR',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySellPageShirtHR')
});
app.get('/HistorySellPage', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistorySellPage',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistorySellPage')
});
app.get('/HistoryBuyPageShipsabuy', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistoryBuyPageShipsabuy',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistoryBuyPageShipsabuy')
});
app.get('/HistoryBuyPageFlash', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistoryBuyPageFlash',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistoryBuyPageFlash')
});
app.get('/HistoryBuyPageBitkub', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistoryBuyPageBitkub',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistoryBuyPageBitkub')
});
app.get('/HistoryBuyPageQuik', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistoryBuyPageQuik',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistoryBuyPageQuik')
});
app.get('/HistoryBuyPagePoststation', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistoryBuyPagePoststation',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistoryBuyPagePoststation')
});
app.get('/HistoryBuyPageShirtHR', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistoryBuyPageShirtHR',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistoryBuyPageShirtHR')
});
app.get('/HistoryBuyPage', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('HistoryBuyPage',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('HistoryBuyPage')
});

app.get('/ReqReport', ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('ReqReport',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('ReqReport')
});

app.get('/FormStock',ifNotLoggedin, (req,res,next) => {
    // dbconnection.execute("SELECT `name`, `level` FROM `users` WHERE `id`=?",[req.session.userID])
    // .then(([rows]) => {
    //     res.render('FormStock',{
    //         name:rows[0].name,
    //         level:rows[0].level
    //     });
    // });
    res.render('FormStock')
});

// END OF ROOT PAGE
// REGISTER PAGE
app.post('/register', ifLoggedin, 
// post data validation(using express-validator)
[
    body('user_email','Invalid email address!').isEmail().custom((value) => {
        return dbconnection.execute('SELECT `email` FROM `users` WHERE `email`=?', [value])
        .then(([rows]) => {
            if(rows.length > 0){
                return Promise.reject('This E-mail already in use!');
            }
            return true;
        });
    }),
    body('user_name','Username is Empty!').trim().not().isEmpty(),
    body('user_pass','The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),
],// end of post data validation
(req,res,next) => {

    const validation_result = validationResult(req);
    const {user_name, user_pass, user_email} = req.body;
    // IF validation_result HAS NO ERROR
    if(validation_result.isEmpty()){
        // password encryption (using bcryptjs)
        bcrypt.hash(user_pass, 12).then((hash_pass) => {
            // INSERTING USER INTO DATABASE
            dbconnection.execute("INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",[user_name,user_email, hash_pass])
            .then(result => {
                res.send(`your account has been created successfully, Now you can <a href="/">Login</a>`);
            }).catch(err => {
                // THROW INSERTING USER ERROR'S
                if (err) throw err;
            });
        })
        .catch(err => {
            // THROW HASING ERROR'S
            if (err) throw err;
        })
    }
    else{
        // COLLECT ALL THE VALIDATION ERRORS
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH VALIDATION ERRORS
        res.render('login-register',{
            register_error:allErrors,
            old_data:req.body
        });
    }
});// END OF REGISTER PAGE


// LOGIN PAGE
app.post('/', ifLoggedin, [
    body('user_email').custom((value) => {
        return dbconnection.execute('SELECT email FROM users WHERE email=?', [value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;
                
            }
            return Promise.reject('Invalid Email Address!');
            
        });
    }),
    body('user_pass','Password is empty!').trim().not().isEmpty(),
], (req, res) => {
    const validation_result = validationResult(req);
    const {user_pass, user_email} = req.body;
    if(validation_result.isEmpty()){
        
        dbconnection.execute("SELECT * FROM `users` WHERE `email`=?",[user_email])
        .then(([rows]) => {
            bcrypt.compare(user_pass, rows[0].password).then(compare_result => {
                if(compare_result === true){
                    req.session.isLoggedIn = true;
                    req.session.userID = rows[0].id;
                    req.session.user_name = rows[0].name;
                    req.session.userImg = rows[0].img;
                    req.session.userLevel = rows[0].level;

                    console.log(req.session.userID)
                    console.log(req.session.user_name)
                    console.log(req.session.userImg)
                    console.log(req.session.userLevel)
                    

                    res.redirect('/');
                }
                else{
                    res.render('login-register',{
                        login_errors:['Invalid Password!']
                    });
                }
            })
            .catch(err => {
                if (err) throw err;
            });


        }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
        res.render('login-register',{
            login_errors:allErrors
        });
    }
});
// END OF LOGIN PAGE

// LOGOUT
app.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});


//get ImgUsers
app.get('/getImg',(req, res) => {
    try{
        connection.query('SELECT `img`,`name`,`level` FROM `users` WHERE `img`=?', [req.session.userImg],
        (err, data, fil) => {
            if(data) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get NameUsers
app.get('/getname',(req, res) => {
    try{
        connection.query('SELECT `name` FROM `users` WHERE `id`=?', [req.session.userID],
        (err, data, fil) => {
            if(data) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                    
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//get NameLevel
app.get('/getLevel',(req, res) => {
    try{
        connection.query('SELECT `level` FROM `users` WHERE `id`=?', [req.session.userID],
        (err, data, fil) => {
            if(data) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

/////////////////

//create
app.post('/api/createstock', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            connection.query('insert into tbl_stock (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//create shipsabuy
app.post('/api/createstockshipsabuy', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            connection.query('insert into tbl_stock_shipsabuy (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//create flash
app.post('/api/createstockflash', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            connection.query('insert into tbl_stock_flash (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//create bitkub
app.post('/api/createstockbitkub', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            connection.query('insert into tbl_stock_bitkub (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//create requisition
app.post('/api/createrequisition', (req, res)=>{
    var Date = _.get(req, ['body', 'Date']);
    var productnames = _.get(req, ['body', 'productnames']);
    var total = _.get(req, ['body', 'total']);
    var detail = _.get(req, ['body', 'detail']);
    var acc = [req.session.user_name];

    console.log('productnames', productnames)
    console.log('total', total)
    console.log('detail', detail)
    console.log('acc', acc)
    console.log('Date', Date)

    try {
        if(Date && productnames && total && detail){
            connection.query('insert into requisition (Date,productnames, total, detail, acc) values (?,?,?,?,?)',
            [ Date,productnames,total,detail,acc],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//create reqreport
app.post('/api/createreqreport', (req, res)=>{
    var productnames = _.get(req, ['body', 'productnames']);
    var total = _.get(req, ['body', 'total']);
    var detail = _.get(req, ['body', 'detail']);
    var acc = [req.session.user_name];

    console.log('productnames', productnames)
    console.log('total', total)
    console.log('detail', detail)
    console.log('acc', acc)

    try {
        if(productnames && total && detail && acc){
            connection.query('insert into reqreport (productnames, total, detail, acc) values (?,?,?,?)',
            [ productnames,total,detail,acc],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//create quik
app.post('/api/createstockquik', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            connection.query('insert into tbl_stock_quik (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//create shirthr
app.post('/api/createstockshirthr', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            connection.query('insert into tbl_stock_shirthr (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//create poststation
app.post('/api/createstockpoststation', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            connection.query('insert into tbl_stock_poststation (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get shippop
app.get('/api/getallstock',(req, res) => {
    try{
        connection.query('select * from tbl_stock', [],
        (err, data, fil) => {
            if(data && data[0] && data) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get shipsabuy
app.get('/api/getallstockshipsabuy',(req, res) => {
    try{
        connection.query('select * from tbl_stock_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get flash
app.get('/api/getallstockflash',(req, res) => {
    try{
        connection.query('select * from tbl_stock_flash', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get bitkub
app.get('/api/getallstockbitkub',(req, res) => {
    try{
        connection.query('select * from tbl_stock_bitkub', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get Requisition
app.get('/api/getrequisition',(req, res) => {
    try{
        connection.query('select * from requisition', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//get reqreport
app.get('/api/getreqreport',(req, res) => {
    try{
        connection.query('select * from reqreport', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//get quik
app.get('/api/getquik',(req, res) => {
    try{
        connection.query('select * from tbl_stock_quik', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//get shirthr
app.get('/api/getshirthr',(req, res) => {
    try{
        connection.query('select * from tbl_stock_shirthr', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get poststation
app.get('/api/getpoststation',(req, res) => {
    try{
        connection.query('select * from tbl_stock_poststation', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

// //get shirts
// app.get('/api/getshirts',(req, res) => {
//     try{
//         connection.query("select * from tbl_stock WHERE name LIKE '%เสื้อ%';", [],
//         (err, data, fil) => {
//             if(data && data[0] && data) {

//                 return res.status(200).json({
//                     resCode: 200,
//                     ResMessag: 'success',
//                     Result: data
//                 })
//             }
//             else {
//                     console.log('ERR 0! : not found data')
//                     return res.status(200).json({
//                         resCode: 400,
//                         ResMessag: 'bad: not found data',
//                         Log: 1
//                     })
//             }
//         })
//     }
//     catch(error) {
//         console.log('ERR 0! :', error)
//         return res.status(200).json({
//             resCode: 400,
//             ResMessag: 'bad',
//             Log: 0
//         })
//     }
// })
// //get vinil
// app.get('/api/getvinil',(req, res) => {
//     try{
//         connection.query("select * from tbl_stock WHERE name LIKE '%ไวนิล%';", [],
//         (err, data, fil) => {
//             if(data && data[0] && data) {

//                 return res.status(200).json({
//                     resCode: 200,
//                     ResMessag: 'success',
//                     Result: data
//                 })
//             }
//             else {
//                     console.log('ERR 0! : not found data')
//                     return res.status(200).json({
//                         resCode: 400,
//                         ResMessag: 'bad: not found data',
//                         Log: 1
//                     })
//             }
//         })
//     }
//     catch(error) {
//         console.log('ERR 0! :', error)
//         return res.status(200).json({
//             resCode: 400,
//             ResMessag: 'bad',
//             Log: 0
//         })
//     }
// })


//getsetproduct
app.get('/api/getsetquantity',(req, res) => {
    try{
        connection.query('select * from tbl_set_quantity', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsetproduct_shipsabuy
app.get('/api/getsetquantityshipsabuy',(req, res) => {
    try{
        connection.query('select * from tbl_set_quantity_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getbuyhistoryproduct
app.get('/api/getbuyhistory',(req, res) => {
    try{
        connection.query('select * from tbl_buy_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getbuyhistoryproduct shipsabuy
app.get('/api/getbuyhistoryshipsabuy',(req, res) => {
    try{
        connection.query('select * from tbl_buy_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getbuyhistoryproduct flash
app.get('/api/getbuyhistoryflash',(req, res) => {
    try{
        connection.query('select * from tbl_buy_history_flash', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getbuyhistoryproduct bitkub
app.get('/api/getbuyhistorybitkub',(req, res) => {
    try{
        connection.query('select * from tbl_buy_history_bitkub', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getbuyhistoryproduct quik
app.get('/api/getbuyhistoryquik',(req, res) => {
    try{
        connection.query('select * from tbl_buy_history_quik', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getbuyhistoryproduct shirthr
app.get('/api/getbuyhistoryshirthr',(req, res) => {
    try{
        connection.query('select * from tbl_buy_history_shirthr', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getbuyhistoryproduct poststation
app.get('/api/getbuyhistorypoststation',(req, res) => {
    try{
        connection.query('select * from tbl_buy_history_poststation', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getsellhistoryproduct
app.get('/api/getsellhistory',(req, res) => {
    try{
        connection.query('select * from tbl_sell_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getsellhistoryproduct shipsabuy
app.get('/api/getsellhistoryshipsabuy',(req, res) => {
    try{
        connection.query('select * from tbl_sell_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellhistoryproduct flash
app.get('/api/getsellhistoryflash',(req, res) => {
    try{
        connection.query('select * from tbl_sell_history_flash', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellhistoryproduct bitkub
app.get('/api/getsellhistorybitkub',(req, res) => {
    try{
        connection.query('select * from tbl_sell_history_bitkub', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellhistoryproduct quik
app.get('/api/getsellhistoryquik',(req, res) => {
    try{
        connection.query('select * from tbl_sell_history_quik', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellhistoryproduct shirthr
app.get('/api/getsellhistoryshirthr',(req, res) => {
    try{
        connection.query('select * from tbl_sell_history_shirthr', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getsellhistoryproduct poststation
app.get('/api/getsellhistorypoststation',(req, res) => {
    try{
        connection.query('select * from tbl_sell_history_poststation', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getsellset1 historyproduct
app.get('/api/getset1history',(req, res) => {
    try{
        connection.query('select * from tbl_set1_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getsellset3000 historyproduct
app.get('/api/getset3000history',(req, res) => {
    try{
        connection.query('select * from tbl_sell_set3000_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getsellset2 historyproduct
app.get('/api/getset2history',(req, res) => {
    try{
        connection.query('select * from tbl_set2_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset15000 historyproduct
app.get('/api/getset15000history',(req, res) => {
    try{
        connection.query('select * from tbl_sell_set15000_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset3 historyproduct
app.get('/api/getset3history',(req, res) => {
    try{
        connection.query('select * from tbl_set3_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset89000 historyproduct
app.get('/api/getset89000history',(req, res) => {
    try{
        connection.query('select * from tbl_sell_set89000_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset1 historyproduct shipsabuy
app.get('/api/getset1historyshipsabuy',(req, res) => {
    try{
        connection.query('select * from tbl_set1_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset2 historyproduct shipsabuy
app.get('/api/getset2historyshipsabuy',(req, res) => {
    try{
        connection.query('select * from tbl_set2_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset3 historyproduct shipsabuy
app.get('/api/getset3historyshipsabuy',(req, res) => {
    try{
        connection.query('select * from tbl_set3_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset4 historyproduct shipsabuy
app.get('/api/getset4historyshipsabuy',(req, res) => {
    try{
        connection.query('select * from tbl_set4_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

// //get by id
// app.get('/api/getallstockbyid',(req, res) => {
//     var stockid = _.get(req, ['body', 'id']);

//     try{
//         if(stockid){
//             connection.query('select * from tbl_stock where id = ?', [
//                 stockid
//             ],
//             (err, data, fil) => {
//                 if(data && data[0]) {
    
//                     for (let i = 0; i < data.length; i++) {
//                         delete data[i].id
                        
//                     }
    
//                     return res.status(200).json({
//                         resCode: 200,
//                         ResMessag: 'success',
//                         Result: data
//                     })
//                 }
//                 else {
    
//                         console.log('ERR 1! : not found data')
//                         return res.status(200).json({
//                             resCode: 400,
//                             ResMessag: 'bad: not found data',
//                             Log: 1
//                         })
//                 }
//             })
//         }
//         else{
//             console.log('ERR 2! : Invalid data')
//             return res.status(200).json({
//                 resCode: 400,
//                 ResMessag: 'bad: Invalid data',
//                 Log: 2
//             })
//         }
        

//     }
//     catch(error) {
//         console.log('ERR 0! :', error)
//         return res.status(200).json({
//             resCode: 400,
//             ResMessag: 'bad',
//             Log: 0
//         })

//     }
// })

//Update shippop
app.put('/api/updatestock', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity) {
            connection.query('update tbl_stock set name = ?, quantity = ? where id = ? ', [
                name, quantity, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update edit shippop
app.put('/api/updatestockedit', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);
    var img = _.get(req, ['body', 'img']);

    try{
        if(id && name && quantity && img) {
            connection.query('update tbl_stock set name = ?, quantity = ?, img = ? where id = ? ', [
                name, quantity,img, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update shipsabuy
app.put('/api/updatestockshipsabuy', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity) {
            connection.query('update tbl_stock_shipsabuy set name = ?, quantity = ? where id = ? ', [
                name, quantity, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
}) 
//Update edit shipsabuy
app.put('/api/updatestockshipsabuyedit', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);
    var img = _.get(req, ['body', 'img']);

    try{
        if(id && name && quantity) {
            connection.query('update tbl_stock_shipsabuy set name = ?, quantity = ?, img = ? where id = ? ', [
                name, quantity,img, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update flash
app.put('/api/updatestockflash', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity) {
            connection.query('update tbl_stock_flash set name = ?, quantity = ? where id = ? ', [
                name, quantity, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update bitkub
app.put('/api/updatestockbitkub', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity ) {
            connection.query('update tbl_stock_bitkub set name = ?, quantity = ? where id = ? ', [
                name, quantity, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update Requisition
app.put('/api/updateRequisition', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var status = _.get(req, ['body', 'status']);
    var Level = [req.session.userLevel];
    var need = 'Admin'
    try{
        if(Level == need) {
            connection.query('update requisition set status = ? where id = ? ', [
                status , parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//Update quik
app.put('/api/updatestockquik', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity) {
            connection.query('update tbl_stock_quik set name = ?, quantity = ? where id = ? ', [
                name, quantity, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update edit quik
app.put('/api/updatestockquikedit', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);
    var img = _.get(req, ['body', 'img']);

    try{
        if(id && name && quantity) {
            connection.query('update tbl_stock_quik set name = ?, quantity = ?, img = ? where id = ? ', [
                name, quantity,img , parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update shirthr
app.put('/api/updatestockshirthr', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity) {
            connection.query('update tbl_stock_shirthr set name = ?, quantity = ? where id = ? ', [
                name, quantity, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update edit shirthr
app.put('/api/updatestockshirthredit', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);
    var img = _.get(req, ['body', 'img']);

    try{
        if(id && name && quantity) {
            connection.query('update tbl_stock_shirthr set name = ?, quantity = ?, img = ? where id = ? ', [
                name, quantity,img , parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//Update poststation
app.put('/api/updatestockpoststation', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity ) {
            connection.query('update tbl_stock_poststation set name = ?, quantity = ? where id = ? ', [
                name, quantity,  parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update poststation edit
app.put('/api/updatestockpoststationedit', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);
    var img = _.get(req, ['body', 'img']);

    try{
        if(id && name && quantity && img) {
            connection.query('update tbl_stock_poststation set name = ?, quantity = ?, img = ? where id = ? ', [
                name, quantity,img,  parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert buy
app.post('/api/insertstock', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer_name = _.get(req, ['body', 'customer_name']);
    var acc = [req.session.user_name];


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    console.log('customer_name', customer_name)
    console.log('acc', acc)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_buy_history (Date, stockname, quantity, invoid_no,customer_name, acc) values (?,?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,customer_name,acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert buy shipsabuy
app.post('/api/insertstockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_buy_history_shipsabuy (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert buy flash
app.post('/api/insertstockflash', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_buy_history_flash (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert buy bitkub
app.post('/api/insertstockbitkub', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_buy_history_bitkub (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert buy Quik
app.post('/api/insertstockquik', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer_name = _.get(req, ['body', 'customer_name']);
    var acc = [req.session.user_name];


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    console.log('customer_name', customer_name)
    console.log('acc', acc)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_buy_history_quik (Date, stockname, quantity, invoid_no,customer_name, acc) values (?,?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,customer_name,acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert buy shirthr
app.post('/api/insertstockshirthr', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer_name = _.get(req, ['body', 'customer_name']);
    var acc = [req.session.user_name];


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    console.log('customer_name', customer_name)
    console.log('acc', acc)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_buy_history_shirthr (Date, stockname, quantity, invoid_no,customer_name, acc) values (?,?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,customer_name,acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert buy poststation
app.post('/api/insertstockpoststation', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer_name = _.get(req, ['body', 'customer_name']);
    var acc = [req.session.user_name];


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    console.log('customer_name', customer_name)
    console.log('acc', acc)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_buy_history_poststation (Date, stockname, quantity, invoid_no,customer_name, acc) values (?,?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,customer_name,acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})


//insert sell
app.post('/api/insertsellstock', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer_name = _.get(req, ['body', 'customer_name']);
    var shop = _.get(req, ['body', 'shop']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_sell_history (Date, stockname, quantity, invoid_no,customer_name,shop, acc) values (?,?,?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,customer_name,shop,acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert sell shipsabuy
app.post('/api/insertsellstockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_sell_history_shipsabuy (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert sell flash
app.post('/api/insertsellstockflash', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_sell_history_flash (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert sell bitkub
app.post('/api/insertsellstockbitkub', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    var acc = [req.session.user_name];

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_sell_history_bitkub (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert sell quik
app.post('/api/insertsellstockquik', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer_name = _.get(req, ['body', 'customer_name']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    console.log('customer_name', customer_name)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_sell_history_quik (Date, stockname, quantity, invoid_no,customer_name, acc) values (?,?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,customer_name, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert sell shirthr
app.post('/api/insertsellstockshirthr', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer_name = _.get(req, ['body', 'customer_name']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    console.log('customer_name', customer_name)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_sell_history_shirthr (Date, stockname, quantity, invoid_no,customer_name, acc) values (?,?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,customer_name, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert sell poststation
app.post('/api/insertsellstockpoststation', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer_name = _.get(req, ['body', 'customer_name']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    console.log('customer_name', customer_name)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_sell_history_poststation (Date, stockname, quantity, invoid_no,customer_name, acc) values (?,?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,customer_name, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})



//insert set1
app.post('/api/insertset1stock', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_set1_history (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insertSell3000
app.post('/api/insertSell3000', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var package = _.get(req, ['body', 'package']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer = _.get(req, ['body', 'customer']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('package', package)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    console.log('customer', customer)

    try{
        if( Date &&  package && quantity ) {
            connection.query('insert into tbl_sell_set3000_history (Date, package, quantity, invoid_no, acc, customer) values (?,?,?,?,?,?) ', [
                Date, package, quantity, invoid_no, acc, customer
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert set2
app.post('/api/insertset2stock', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_set2_history (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insertSell15,000
app.post('/api/insertSell15000', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var package = _.get(req, ['body', 'package']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer = _.get(req, ['body', 'customer']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('package', package)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    console.log('customer', customer)

    try{
        if( Date &&  package && quantity ) {
            connection.query('insert into tbl_sell_set15000_history (Date, package, quantity, invoid_no, acc, customer) values (?,?,?,?,?,?) ', [
                Date, package, quantity, invoid_no, acc, customer
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert set3
app.post('/api/insertset3stock', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_set3_history (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insertSell89000
app.post('/api/insertSell89000', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var package = _.get(req, ['body', 'package']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var customer = _.get(req, ['body', 'customer']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('package', package)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)
    console.log('customer', customer)

    try{
        if( Date &&  package && quantity ) {
            connection.query('insert into tbl_sell_set89000_history (Date, package, quantity, invoid_no, acc, customer) values (?,?,?,?,?,?) ', [
                Date, package, quantity, invoid_no, acc, customer
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})


//insert set1 shipsabuy
app.post('/api/insertset1stockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_set1_history_shipsabuy (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert set2 shipsabuy
app.post('/api/insertset2stockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_set2_history_shipsabuy (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})


//insert set3 shipsabuy
app.post('/api/insertset3stockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_set3_history_shipsabuy (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no, acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert set4 shipsabuy
app.post('/api/insertset4stockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);
    var acc = [req.session.user_name];

    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            connection.query('insert into tbl_set4_history_shipsabuy (Date, stockname, quantity, invoid_no, acc) values (?,?,?,?,?) ', [
                Date, stockname, quantity, invoid_no,acc
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})





//delete
app.delete('/api/deletestock',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            connection.query ('delete from tbl_stock where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})

//delete shipsabuy
app.delete('/api/deletestockshipsabuy',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            connection.query ('delete from tbl_stock_shipsabuy where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})
//delete flash
app.delete('/api/deletestockflash',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            connection.query ('delete from tbl_stock_flash where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})
//delete bitkub
app.delete('/api/deletestockbitkub',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            connection.query ('delete from tbl_stock_bitkub where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})

//delete requisition
app.delete('/api/deletestockrequisition',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    var Level = [req.session.userLevel];
    var need = 'Admin' 

    console.log("Level",Level)
    try {
        if(Level == need ) {
            connection.query ('delete from requisition where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})

//delete quik
app.delete('/api/deletestockquik',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            connection.query ('delete from tbl_stock_quik where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})
//delete shirthr
app.delete('/api/deletestockshirthr',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            connection.query ('delete from tbl_stock_shirthr where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})

//delete poststation
app.delete('/api/deletestockpoststation',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            connection.query ('delete from tbl_stock_poststation where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})


// app.listen(3000, () => console.log("Server is Running..."));

// END OF LOGOUT

app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});
module.exports = app;