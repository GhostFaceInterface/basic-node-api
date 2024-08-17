const{ pool } = require('../config/database.js');
const fetchDoctorDetails = async (req, res) =>{

    try{
        const result = await pool.query('SELECT fetch_doctor_details()');
        res.status(200).json(result.rows[0].fetch_doctor_details);
        console.log(req.user);
    }catch(err){
        console.error('Error in fetchDoctorDetails:', err.message);
        res.status(500).json({message: 'Internal server error'});
    }
};

const deleteDoctor = async (req, res) => {
    const { doctor_id } = req.params;
  
    try {
      const result = await pool.query('SELECT delete_doctor($1)', [doctor_id]);
      const message = result.rows[0].delete_doctor;
  
      if (message === 'Success') {
        res.status(200).json({ message: 'Doctor deleted successfully' });
      } else {
        res.status(400).json({ message: `Failed to delete doctor: ${message}` });
      }
    } catch (err) {
      console.error('Error deleting doctor:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const addDoctor = async (req, res) => {
    const { name, surname, active, phone, email, device_id, hospital_id } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT add_doctor($1, $2, $3, $4, $5, $6, $7)',
        [name, surname, active, phone, email, device_id, hospital_id]
      );
      const success = result.rows[0].add_doctor;
  
      if (success) {
        res.status(200).json({ message: 'Doctor added successfully' });
      } else {
        res.status(400).json({ message: 'Failed to add doctor' });
      }
    } catch (err) {
      console.error('Error adding doctor:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const updateDoctor = async (req, res) => {
    const { id, device_id, name, surname, active, phone, email } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT update_doctor($1, $2, $3, $4, $5, $6, $7)',
        [id, device_id, name, surname, active, phone, email]
      );
      const success = result.rows[0].update_doctor;
  
      if (success) {
        res.status(200).json({ message: 'Doctor updated successfully' });
      } else {
        res.status(400).json({ message: 'No changes made to the doctor record' });
      }
    } catch (err) {
      console.error('Error updating doctor:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };


module.exports = {
    fetchDoctorDetails,
    deleteDoctor,
    addDoctor,
    updateDoctor,
    
};