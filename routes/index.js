/**
 * All api routes handles here
 * @author Shuja Naqvi
 */
const router = require('express').Router();

// Parent Routes
router.use('/jobs', require('./jobs')); // All the auth routes

// Export
module.exports = router;
