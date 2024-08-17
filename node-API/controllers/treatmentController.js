const {pool} = require('../config/database.js');

const getTreatmentByPatient = async (req,res) => {

    const {patient_id} = req.params;
    try{
        const result = await pool.query('SELECT get_treatment_patient($1)', [patient_id]);
        res.status(200).json(result.rows[0].get_treatment_patient);
    }catch(err){
        console.error('Error in getTreatmentByPatient:', err.message);
        res.status(500).json({message: 'Internal server error'});
    }
};

const deleteTreatment = async (req, res) => {
    const { treatment_id } = req.params;
  
    try {
      const result = await pool.query('SELECT delete_treatment($1)', [treatment_id]);
      const message = result.rows[0].delete_treatment;
  
      if (message === 'Success') {
        res.status(200).json({ message: 'Treatment deleted successfully' });
      } else {
        res.status(400).json({ message: `Failed to delete treatment: ${message}` });
      }
    } catch (err) {
      console.error('Error deleting treatment:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const addTreatment = async (req, res) => {
    const { treatment_type, report_path, patient_id, device_id } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT add_treatment($1, $2, $3, $4)',
        [treatment_type, report_path, patient_id, device_id]
      );
      const success = result.rows[0].add_treatment;
  
      if (success) {
        res.status(200).json({ message: 'Treatment added successfully' });
      } else {
        res.status(400).json({ message: 'Failed to add treatment' });
      }
    } catch (err) {
      console.error('Error adding treatment:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  const updateTreatment = async (req, res) => {
    const { id, treatment_type, report_path, randevu_id, device_id } = req.body;
  
    try {
      await pool.query(
        'SELECT update_treatment($1, $2, $3, $4, $5)',
        [id, treatment_type, report_path, randevu_id, device_id]
      );
      res.status(200).json({ message: 'Treatment updated successfully' });
    } catch (err) {
      console.error('Error updating treatment:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
    getTreatmentByPatient,
    deleteTreatment,
    addTreatment,
    updateTreatment,
};