const {pool} = require('../config/database.js');
const deleteAppointment = async (req, res) => {
    const {appointment_id} = req.params;

    try{
        const result = await pool.query('SELECT delete_appointment($1)', [appointment_id]);
        const message = result.rows[0].delete_appointment;

        if(message === 'Success'){
            res.status(200).json({message: 'Appointment deleted successfully'});
        }else{
            res.status(400).json({message: `Failed to delete appointment: ${message}`});
        }
    }catch(err){
        console.error('Error deleting appointment:', err.message);
        res.status(500).json({message: 'Server error'});
    }
};

const addAppointment = async (req, res) => {
    const { doctor_id, patient_id, agent_id, protocol_no } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT add_appointment($1, $2, $3, $4)',
        [doctor_id, patient_id, agent_id, protocol_no]
      );
      const success = result.rows[0].add_appointment;
  
      if (success) {
        res.status(200).json({ message: 'Appointment added successfully' });
      } else {
        res.status(400).json({ message: 'Failed to add appointment' });
      }
    } catch (err) {
      console.error('Error adding appointment:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const updateAppointment = async (req, res) => {
    const { id, protocol_no, doctor_id, agent_id, patient_id, hospital_id } = req.body;
  
    try {
      await pool.query(
        'SELECT update_appointment($1, $2, $3, $4, $5, $6)',
        [id, protocol_no, doctor_id, agent_id, patient_id, hospital_id]
      );
      res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (err) {
      console.error('Error updating appointment:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { 
    deleteAppointment,
    addAppointment,
    updateAppointment,
};
