const express = require("express");
const app = express();

app.all('/', (req, res, next) => {
    console.log("I run for all HTTP verbs");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    console.log("posting   ")
res.send("response to get request")
});

app.put('/', () => {
    res.send("response to put request")
});

app.delete('/', () => {
    res.send("response to put request") 
});

app.all('/secret', (req, res, next) => {

});

app.get('/hello', (req, res) => {
    res.send("Hello World");
    console.log("Hello World");
});

app.get('/users/:username', (req, res) => {
    const x = req.params.username; //samma som står i raden ovanför
    console.log({ x 
    });
    res.send('thanks for the username');
})

app.get('/users/:username/books/:bookname', (req, res) => {
    const x = req.params.username; //samma som står i raden ovanför
    const y = req.params.bookname;
    console.log({ x, y });
    res.send('thanks for the username');
})

app.get('multiple', (req, res, next) => {
    console.log('this is "multiple" #1');

    next();
}, (req, res) => {
    res.send("this is 'multiple' #2");
    console.log('this is "multiple" #2');
})

const middlewareFunction = (req, res, next) => {
    console.log('this is middleware');

    if(loggedIn){
        next();
    } else {
        res.sendStatus(403)
    }
    next();
}

app.get('/middle1', middlewareFunction, (req, res) => {
    res.send('middle1');
});
app.get('/middle2', middlewareFunction, (req, res) => {
    res.send('middle2');
});

app.route('/methods')
    .get((req, res) => {
        res.send('methods get')
    }).post((req, res) =>{
        res.send('methods post')
    })

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

module.exports = app;