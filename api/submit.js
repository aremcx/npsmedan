import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_QhTuE4n8Oavg@ep-solitary-thunder-a8l5v697-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    orgName, smedan, amount, discount, finalAmount,
    remarks, date, officerId, state, lga, postOffice
  } = req.body;

  try {
    await pool.query(`
      INSERT INTO discount_entries (
        org_name, smedan, amount, discount, final_amount,
        remarks, date, officer_id, state, lga, post_office
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

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ message: 'Submission Failed' });
  }
}
