const express = require('express');
const app = express();

app.all('/', (req, res) => {
    res.send('TriBot V2 Is UP')
});

function Alive() {
    app.listen(3000, () => {
        console.log(`Connected to Server! | ✅`)
    });
};

module.exports = Alive;