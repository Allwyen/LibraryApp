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
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'02-08-2016',
    'distributer':'DC',
    'price':230,
    'desc':'A first thought from Joseph'
},{
    'title':'Deivathinde Charanmar',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':190,
    'desc':'A second thought from Joseph'
},{
    'title':'Harry Potter',
    'author':'JK Rowling',
    'publisher':'HP Books',
    'DoP':'15-10-1998',
    'distributer':'HP',
    'price':550,
    'desc':'First book from JK Rowling'
},{
    'title':'Wings Of Fire',
    'author':'APJ Abdul Kalam',
    'publisher':'DC Books',
    'DoP':'26-05-2010',
    'distributer':'DC',
    'price':150,
    'desc':'Initial days of my life by APJ'
},{
    'title':'The Subtle Art Of Not Giving a F**k',
    'author':'Mark Manson',
    'publisher':'DC Books',
    'DoP':'13-02-2011',
    'distributer':'DC',
    'price':320,
    'desc':'Balancing life'
},{
    'title':'Rich Dad Poor Dad',
    'author':'Rober TK',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':290,
    'desc':'A financial knowledge'
},{
    'title':'Balyakalasaghi',
    'author':'Vaikkom M Bhasheer',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':230,
    'desc':'A good thought'
},{
    'title':'Buried thoughts',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':230,
    'desc':'A second thought from Joseph'
},{
    'title':'Buried thoughts',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':230,
    'desc':'A second thought from Joseph'
},{
    'title':'Buried thoughts',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':230,
    'desc':'A second thought from Joseph'
}];


app.get('/',(req,res)=>{
    res.render('index',{nav,title:'Library'});
});

app.get('/books',(req,res)=>{
    res.render('books',{book,title:'Books'});
});

app.get('/booksingle/:id',(req,res)=>{

    const x= req.params.id;
    res.render('single',{books:book[x]});
});

app.listen(process.env.PORT || 3456,()=>{
    console.log("Server running on port::3456...");
});


