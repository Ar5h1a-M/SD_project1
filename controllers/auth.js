const mysql = require("mysql");
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,  // localhost or ip of server
    user: process.env.DATABASE_USER,      // xamp uses these values 
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE  
});


function handleLogin(request, response, name, password){
    db.query('SELECT name FROM users WHERE name = ?', [name], async(error, results) => {
        if(error){
            console.log(error);
        }
        if(results.length ==0){// already and email that exists
            return response.render('login', {
                message: 'That Username does not exist'
            })
        };


        db.query('SELECT password FROM users WHERE name = ?', [name], (error, results) => {
            console.log(results[0].password);
            if(error){
                console.log(error);
            }
            bcrypt.compare(password, results[0].password, (error,result)=>{
                console.log(result);
                if(error){
                    console.log(error);
                }
                if(result){
                    console.log("matched")
                    return response.render('home', {
                        //message_sign :'User logged in'
                    });
                }else{
                    return response.render('login', {
                        message: 'Passwords do not match'
                   });
                }
                
            });
            
        });
    });
}

exports.sign_up = (request, response)=>{
    console.log(request.body);
    const{name, email, password, Confirmpassword}= request.body;
    /*const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const Confirmpassword = request.body.Confirmpassword;*/

    // positional parameters (?) to prevent sql injection --> prevnt register with same username twice
    db.query('SELECT name FROM users WHERE name = ?', [name], async(error, results) => {
        if(error){
            console.log(error);
        }
        if(results.length >0){// already username that exists
            return response.render('sign_up', {
                message: 'That Username is already exists'
            })
        }else if(password !== Confirmpassword){
            return response.render('sign_up', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8) // 8 = number of rounds of encryption;
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword},(error, results)=>{
            if(error){
                console.log(error);
            } else {
                console.log(results);
                handleLogin(request, response, name, password);
            };
        })
    });

};

exports.login = (request, response)=>{
    console.log(request.body);
    const name = request.body.name;
    const password = request.body.password;
    handleLogin(request, response, name, password);
    
}