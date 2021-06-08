const express = require('express');
const app = express();

app.all('/', (req, res) => {
    res.redirect('https://discord.gg/zCQQ9Y7hNW')
});

function Alive() {
    app.listen(3000, () => {
        console.log(`Connected to Server! | ✅`)
    });
};

module.exports = Alive;