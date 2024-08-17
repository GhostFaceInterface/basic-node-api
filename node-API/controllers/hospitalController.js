const {pool} = require('../config/database.js');


const getHospitalDevices = async (req, res) => {

    const {hospital_id} = req.params;

    try{
        const result = await pool.query('SELECT get_hospital_devices($1)', [hospital_id]);
        res.status(200).json(result.rows[0].get_hospital_devices);
    }catch(err){
        console.error('error fetching hospital devices', err.message);
        res.status(500).json({message: 'error fetching hospital devices'});
        }
};

const getHospitalDoctors = async (req, res) => {

    const {hospital_id} = req.params;
    try{
        const result = await pool.query('SELECT get_hospital_doctors($1)', [hospital_id]);
        res.status(200).json(result.rows[0].get_hospital_doctors);
}catch(err){
    console.error('error fetching hospital doctors', err.message);
    res.status(500).json({message: 'error fetching hospital doctors'});
    }
};

const getPatientByHospitalId = async (req, res) => {
    const {hospital_id} = req.params;
    try{
        const result = await pool.query('SELECT * FROM  get_patient_by_hospital_id($1)', [hospital_id]);
        res.status(200).json(result.rows);
    }catch(err){
        console.error('error fetching patient by hospital id', err.message);
        res.status(500).json({message: 'error fetching patient by hospital id'});
    }
};

const deleteHospital = async (req, res) => {
    const { hospital_id } = req.params;
  
    try {
      const result = await pool.query('SELECT delete_hospital($1)', [hospital_id]);
      const message = result.rows[0].delete_hospital;
  
      if (message === 'Success') {
        res.status(200).json({ message: 'Hospital deleted successfully' });
      } else {
        res.status(400).json({ message: `Failed to delete hospital: ${message}` });
      }
    } catch (err) {
      console.error('Error deleting hospital:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const addHospital = async (req, res) => {
    const { hospital_name, hospital_type } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT add_hospital($1, $2)',
        [hospital_name, hospital_type]
      );
      const success = result.rows[0].add_hospital;
  
      if (success) {
        res.status(200).json({ message: 'Hospital added successfully' });
      } else {
        res.status(400).json({ message: 'Failed to add hospital' });
      }
    } catch (err) {
      console.error('Error adding hospital:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const updateHospital = async (req, res) => {
    const { id, hospital_name, hospital_type } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT update_hospital($1, $2, $3)',
        [id, hospital_name, hospital_type]
      );
      const success = result.rows[0].update_hospital;
  
      if (success) {
        res.status(200).json({ message: 'Hospital updated successfully' });
      } else {
        res.status(400).json({ message: 'No changes made to the hospital record' });
      }
    } catch (err) {
      console.error('Error updating hospital:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };


module.exports = {
    getHospitalDevices,
    getHospitalDoctors,
    getPatientByHospitalId,
    deleteHospital,
    addHospital,
    updateHospital,
};