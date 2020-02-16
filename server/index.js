import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import path from 'path';
import http from 'http';


const app = express();
const port = process.env.PORT || 5000;
console.log(`Xcloud🔥 is running on port ${port}`);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// index route 
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../ui/index.html'));
}); 

// ap1/v1
app.use('/api/v1', routes);
app.listen(port);

// prevent server from sleeping);
setInterval(()=> {
    http.get("http://gidi-gas.herokuapp.com/");
}, 300000);

export default app;