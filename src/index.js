import express, { static } from 'express';

const api = express();
api.use(static(__dirname + '/public'));

api.listen(3000, () => {
    console.log('API up and running!');
});

// api.get('/', (req, res) => {
//     console.log(req);
//     res.send('Hello World!');
// });