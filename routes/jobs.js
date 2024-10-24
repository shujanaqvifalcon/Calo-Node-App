/**
 * Job  routes
 * @author Shuja Naqvi
 */
const router = require('express').Router();
const { createJob, getAllJobs, getJobById } = require('../services/jobs');
const {
  validateJobCreation,
  isValidated
} = require('../middleware/validators');
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Post Job
 * @method get get all Jobs
 */

// Create - Post Job
router.post('/', validateJobCreation, isValidated, createJob);
// Read
router.get('/', getAllJobs); // Get all jobs at once
router.get('/:id', getJobById); // Get one job by it's id

// Export
module.exports = router;
