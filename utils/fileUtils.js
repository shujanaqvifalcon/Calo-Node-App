/**
 * calo Assessment
 * @author Shuja Naqvi
 */

const fs = require('fs');
const path = './jobs.json';

const loadJobsFromFile = () => {
  if (fs.existsSync(path)) {
    const fileData = fs.readFileSync(path);
    return JSON.parse(fileData) || [];
  }
  return [];
};

/**
 * Save jobs to the JSON file.
 * @param {Array} jobs - Array of jobs to save to file.
 */
const saveJobsToFile = (jobs) => {
  fs.writeFileSync(path, JSON.stringify(jobs, null, 2));
};

module.exports = {
  loadJobsFromFile,
  saveJobsToFile
};
