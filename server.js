const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res, next)=>{
    let now = new Date().getUTCDate().toLocaleString();
    let log = `${now} : ${req.method} ${req.path} \n`;
    fs.appendFileSync('server.log',log , (err)=>{
        if(err){
            console.log(err);
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>new Date().getFullYear());
hbs.registerHelper('yell',(text)=>{ 
    return text.toUpperCase();
});

app.get("/", (req, res) => {
    res.render('home.hbs',{
        title:'This is home page',
        section:'This is a realy long section about home page'
    });
});

app.get("/about", (req, res) => {
    // res.send('it"s all about the base');
    res.render('about.hbs',{
        title:'This is about page',
        section:'This is a section'
    });
});
app.get("/project", (req, res) => {
    res.render('project.hbs',{
        title:'This is the projects page',
        section:'Project one \nProject Two'
    });
});


app.get("/bad", (req, res) => {
    res.statusCode = 500;
    res.send("<h1>Opppppps</h1>");
});


app.listen(port, () => {console.log(`Server is on port ${port}`);});