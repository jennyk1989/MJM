const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const taskRoutes = require('./task-routes');


router.use('/categories', categoryRoutes);
router.use('/task', taskRoutes);
