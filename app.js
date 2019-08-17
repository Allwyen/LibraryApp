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

app.get('/books',(req,res)=>{
    res.render('books',{book,title:'Books'});
});

app.get('/authors',(req,res)=>{
    res.render('authors',{author,title:'Authors'});
});

app.get('/authorsingle/:id',(req,res)=>{
    const x= req.params.id;
    res.render('authorsingle',{author:author[x]});
});

app.get('/booksingle/:id',(req,res)=>{

    const x= req.params.id;
    res.render('booksingle',{books:book[x]});
});


app.listen(process.env.PORT || 3456,()=>{
    console.log("Server running on port::3456...");
});


