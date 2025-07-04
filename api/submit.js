import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Use env variable for security
  ssl: {
    rejectUnauthorized: false
  }
});

// Custom parser for Vercel (raw Node.js)
export const config = {
  api: {
    bodyParser: true
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const {
      orgName,
      smedan,
      amount,
      discount,
      finalAmount,
      remarks,
      date,
      officerId,
      state,
      lga,
      postOffice
    } = req.body;

    // Validation (optional)
    if (!orgName || !amount || !date || !state || !lga || !postOffice) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Incoming Submission:', req.body); // 🔍 Logging for debug

    await pool.query(
      `INSERT INTO discount_entries (
        org_name,
        smedan,
        amount,
        discount,
        final_amount,
        remarks,
        date,
        officer_id,
        state,
        lga,
        post_office
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        orgName,
        smedan === 'Yes',
        parseFloat(amount),
        parseFloat(discount),
        parseFloat(finalAmount),
        remarks,
        date,
        officerId,
        state,
        lga,
        postOffice
      ]
    );

    res.status(200).json({ message: 'Success 🚀' });
  } catch (err) {
    console.error('Submission error:', err);
    res.status(500).json({ message: 'Server Error', details: err.message });
  }
}
// Close the pool when the server is shutting down
export const closePool = async () => {
  try {
    await pool.end();
    console.log('PostgreSQL pool closed');
  } catch (err) {
    console.error('Error closing PostgreSQL pool:', err);
  }
}       
// Ensure the pool is closed on process exit
if (process.env.NODE_ENV === 'production') {
  process.on('SIGINT', async () => {
    await closePool();
    process.exit(0);
  });
  process.on('SIGTERM', async () => {
    await closePool();
    process.exit(0);
  });
}   
// Export the pool for use in other modules
export { pool };
// This code handles the form submission for the Smedan application, connecting to a PostgreSQL database.
// It validates the input, inserts the data into the database, and handles errors gracefully.   
// The pool is configured to use an environment variable for the connection string, ensuring security.
// The code also includes a custom parser for Vercel and ensures the pool is closed on process exit.
// The handler function processes POST requests, validates the data, and performs the database insertion.   