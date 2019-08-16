const Express = require('express');

var app = new Express();

app.set('view engine','ejs'); 

app.use(Express.static(__dirname+"/public"));

nav= [
        {
            link:'/books',
            title:'Books'
        },
        {
            link:'/authors',
            title:'Authors'
        }
    ];

app.get('/',(req,res)=>{
    res.render('index',nav);
});

app.listen(process.env.PORT || 3456,()=>{
    console.log("Server running on port::3456...");
});