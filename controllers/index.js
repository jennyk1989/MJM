
//rally to server
const router = require('express').Router();

const apiRoutes = require('./api');
//const homeRoutes = require('./home-routes.js');
//const dashboardRoutes = require('./dashboard-routes.js');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;