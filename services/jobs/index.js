/**
 * calo Assessment
 * @author Shuja Naqvi
 */
const { loadJobsFromFile, saveJobsToFile } = require('../../utils/fileUtils');
const axios = require('axios');

let jobs = loadJobsFromFile();
/**
 * Create JOB
 * @param {object} req
 * @param {object} res
 */

// Create a job with delayed execution
exports.createJob = async (req, res) => {
  try {
    // Create a new job with pending status
    const jobId = `job-${Date.now()}`;
    const job = {
      id: jobId,
      status: 'Pending',
      title: req.body.title,
      salary: req.body.salaryExpectation,
      experience: req.body.experience
    };

    jobs.push(job);
    saveJobsToFile(jobs);

    console.log(
      `Shuja Job has been created :D ${jobId}, status: ${job.status}`
    );

    const delay = Math.floor(Math.random() * 11) * 5000; // Random delay between 5 and 60 seconds
    console.log(`Job ${jobId} will resolve in: ${delay / 1000} seconds`);

    setTimeout(async () => {
      try {
        console.log(`Shuja Job ${jobId} is being processed...`);

        const response = await axios.get(
          'https://api.unsplash.com//photos/random',
          {
            params: { query: 'food' },
            headers: {
              Authorization: `Client-ID iLm2FZu-Q7SjRG8rNwGJN2EIq6Y5PEOPB6b6zJz9JH0`
            }
          }
        );
        job.result = response.data.urls.regular;
        job.status = 'Resolved';
        saveJobsToFile(jobs);
        console.log(`Job resolved: ${jobId}, result: ${job.result}`);
      } catch (err) {
        job.status = 'Failed';
        saveJobsToFile(jobs);
        console.error(`Job failed: ${jobId}, error: ${err.message}`);
      }
    }, delay);

    // Respond with job ID immediately after job creation
    res.status(201).json({ success: true, jobId });
  } catch (err) {
    // General error handling
    console.error('Error creating job:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Get all JOBS
 * @param {object} req
 * @param {object} res}
 */
exports.getAllJobs = (req, res) => {
  try {
    // Return the list of all jobs
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Get JOB by ID
 * @param {object} req
 * @param {object} res
 */
exports.getJobById = (req, res) => {
  try {
    // Find job by ID
    const job = jobs.find((j) => j.id === req.params.jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Return the job with its status or result
    res.json({ success: true, job });
  } catch (err) {
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
