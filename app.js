const Express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Mongoose = require('mongoose');

var app = new Express();

app.set('view engine','ejs'); 

app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

Mongoose.connect("mongodb://localhost:27017/elibrary2db");
//Mongoose.connect("mongodb+srv://mongodb:mongodb@mycluster-ucvz5.mongodb.net/elibrarydb?retryWrites=true&w=majority");

const BookModel = Mongoose.model("book",{
    title:String,
    picture:String,
    author:String,
    publisher:String,
    DoP:String,
    distributer:String,
    price:String,
    desc:String
});

const AuthorModel = Mongoose.model("author",{
    name:String,
    picture:String,
    DoB:String,
    Place:String,
    Books:String
});


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

book=[{
    'title':'Buried thoughts',
    'picture':'/images/buried.jpg',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'02-08-2016',
    'distributer':'DC',
    'price':230,
    'desc':'A first thought from Joseph'
},{
    'title':'Deivathinde Charanmar',
    'picture':'/images/deivatinde.jpg',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':190,
    'desc':'A second thought from Joseph'
},{
    'title':'Wings Of Fire',
    'picture':'/images/wingsfire.jpg',
    'author':'APJ Abdul Kalam',
    'publisher':'DC Books',
    'DoP':'26-05-2010',
    'distributer':'DC',
    'price':150,
    'desc':'Initial days of my life by APJ'
},{
    'title':'The Subtle Art Of Not Giving a F**k',
    'picture':'/images/thesubtleart.jpg',
    'author':'Mark Manson',
    'publisher':'DC Books',
    'DoP':'13-02-2011',
    'distributer':'DC',
    'price':320,
    'desc':'Balancing life'
},{
    'title':'Rich Dad Poor Dad',
    'picture':'/images/richdad.jpg',
    'author':'Rober TK',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':290,
    'desc':'A financial knowledge'
}];

author=[{
    'name':'Joseph Annamkutty Jose',
    'picture':'/images/joseph.jpg',
    'DoB':'18 July 1988',
    'Place':'Kerala, India',
    'Books': ['Buried thoughts','Deivathinde Charanmar']
},{
    'name':'JK Rowling',
    'picture':'/images/rowling.jpg',
    'DoB':'31 July 1965',
    'Place':'Scotland',
    'Books': ['Harry Potter','the casual vacany','fantastic beasts']
},{
    'name':'APJ Abdul Kalam',
    'picture':'/images/kalam.jpg',
    'DoB':'15 October 1931',
    'Place':'Rameswaram, India',
    'Books': ['Ignited Minds','India 2020','The turning Point']
},{
    'name':'Robert T K',
    'picture':'/images/robert.jpeg',
    'DoB':'8 April 1947',
    'Place':'United States',
    'Books': ['Cashflow Quadrant','The Business School']
},{
    'name':'Mark Manson',
    'picture':'/images/manson.jpg',
    'DoB':'9 March 1984',
    'Place':'United States',
    'Books': ['The subtle art of Not Giving F**k','Everything is f**ked']
}];


app.get('/',(req,res)=>{
    res.render('index',{nav,title:'Library'});
});

app.get('/bookall',(req,res)=>{
    var result = BookModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIUrl = "http://localhost:3456/bookall";

app.get('/books',(req,res)=>{
    request(APIUrl,(error,response,body)=>{
        var book = JSON.parse(body);
        res.render('books',{book,title:'Books'});
    });
    
});

app.get('/authorall',(req,res)=>{
    var result = AuthorModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIUrl3 = "http://localhost:3456/authorall";

app.get('/authors',(req,res)=>{
    request(APIUrl3,(error,response,body)=>{
        var author = JSON.parse(body);
        res.render('authors',{author,title:'Authors'});
    });
    
});

app.get('/authorone',(req,res)=>{
    var item = req.query.q;
    var result = AuthorModel.findOne({_id:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIUrl4 = "http://localhost:3456/authorone";

app.get('/authorsingle/:id',(req,res)=>{
    const x= req.params.id;
    request(APIUrl4+"/?q="+x,(error,response,body)=>{
        var author = JSON.parse(body);
        //console.log(book);
        res.render('authorsingle',{author:author});
    });
});

app.get('/bookone',(req,res)=>{
    var item = req.query.q;
    var result = BookModel.findOne({_id:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIUrl2 = "http://localhost:3456/bookone";

app.get('/booksingle/:id',(req,res)=>{

    const x= req.params.id;
    request(APIUrl2+"/?q="+x,(error,response,body)=>{
        var book = JSON.parse(body);
        console.log(book);
        res.render('booksingle',{books:book});
    });
    
});

app.post('/addbookAPI',(req,res)=>{
    var book = new BookModel(req.body);
    //console.log(req.body);
    var result = book.save((error,data)=>{
        //console.log('Message 1');
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            //console.log('Message 2');
            res.send("<script>alert('Book Inserted')</script><script>window.location.href='/addbook'</script>");
        }
    });
});

app.post('/addauthorAPI',(req,res)=>{
    var author = new AuthorModel(req.body);
    //console.log(req.body);
    var result = author.save((error,data)=>{
        //console.log('Message 1');
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            //console.log('Message 2');
            res.send("<script>alert('Author Inserted')</script><script>window.location.href='/addauthor'</script>");
        }
    });
});

app.get('/addbook',(req,res)=>{
    res.render('addbook');
});

app.get('/addauthor',(req,res)=>{
    res.render('addauthor');
});

app.listen(process.env.PORT || 3456,()=>{
    console.log("Server running on port::3456...");
});


