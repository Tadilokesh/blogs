require('dotenv').config();
const app = require('./api/server'); // Import the Vercel-compatible app

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
