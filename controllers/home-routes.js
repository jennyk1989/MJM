import { Router as router } from 'express';

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/assets/sample html/index.html'));
});
