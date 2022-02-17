const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/', function(req, res){
   res.redirect('/homepage');
});

module.exports = router;