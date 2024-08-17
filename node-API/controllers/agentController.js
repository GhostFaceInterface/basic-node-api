const { pool } = require('../config/database');

const deleteAgent = async (req, res) => {
  const { agent_id } = req.params;

  try {
    const result = await pool.query('SELECT delete_agent($1)', [agent_id]);
    const message = result.rows[0].delete_agent;

    if (message === 'Success') {
      res.status(200).json({ message: 'Agent deleted successfully' });
    } else {
      res.status(400).json({ message: `Failed to delete agent: ${message}` });
    }
  } catch (err) {
    console.error('Error deleting agent:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const addAgent = async (req, res) => {
  const {
    name,
    surname,
    active,
    phone,
    email,
    price,
    bank,
    iban,
    tax_administration,
    tax_no
  } = req.body;

  try {
    const result = await pool.query(
      'SELECT add_agent($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [name, surname, active, phone, email, price, bank, iban, tax_administration, tax_no]
    );
    const success = result.rows[0].add_agent;

    if (success) {
      res.status(200).json({ message: 'Agent added successfully' });
    } else {
      res.status(400).json({ message: 'Failed to add agent' });
    }
  } catch (err) {
    console.error('Error adding agent:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateAgent = async (req, res) => {
  const {
    id,
    price,
    bank,
    iban,
    tax_administration,
    tax_no,
    name,
    surname,
    active,
    phone,
    email
  } = req.body;

  try {
    await pool.query(
      'SELECT update_agent($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [id, price, bank, iban, tax_administration, tax_no, name, surname, active, phone, email]
    );
    res.status(200).json({ message: 'Agent updated successfully' });
  } catch (err) {
    console.error('Error updating agent:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  deleteAgent,
  addAgent,
  updateAgent,
};
