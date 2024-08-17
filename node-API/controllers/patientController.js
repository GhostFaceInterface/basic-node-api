const { pool } = require('../config/database');

const deletePatient = async (req, res) => {
  const { patient_id } = req.params;

  try {
    const result = await pool.query('SELECT delete_patient($1)', [patient_id]);
    const message = result.rows[0].delete_patient;

    if (message === 'Success') {
      res.status(200).json({ message: 'Patient deleted successfully' });
    } else {
      res.status(400).json({ message: `Failed to delete patient: ${message}` });
    }
  } catch (err) {
    console.error('Error deleting patient:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


const addPatient = async (req, res) => {
  const { name, surname, active, phone, email, doctor_id, hospital_id } = req.body;

  try {
    const result = await pool.query(
      'SELECT add_patient($1, $2, $3, $4, $5, $6, $7)',
      [name, surname, active, phone, email, doctor_id, hospital_id]
    );
    const message = result.rows[0].add_patient;

    if (message === 'Başarıyla eklendi.') {
      res.status(200).json({ message: 'Patient added successfully' });
    } else {
      res.status(400).json({ message: `Failed to add patient: ${message}` });
    }
  } catch (err) {
    console.error('Error adding patient:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePatient = async (req, res) => {
  const { id, doctor_id, name, surname, active, phone, email } = req.body;

  try {
    await pool.query(
      'SELECT update_patient($1, $2, $3, $4, $5, $6, $7)',
      [id, doctor_id, name, surname, active, phone, email]
    );
    res.status(200).json({ message: 'Patient updated successfully' });
  } catch (err) {
    console.error('Error updating patient:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  deletePatient,
  addPatient,
  updatePatient,
};
