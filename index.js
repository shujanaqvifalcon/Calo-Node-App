/**
 * calo Assessment
 * @author Shuja Naqvi
 */
const app = require('express')();
const port = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'dev';

// Middleware
require('./middleware/common')(app);

// API Routes
app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ` + port);
});
