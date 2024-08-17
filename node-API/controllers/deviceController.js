const {pool} = require('../config/database.js');

const getDevicesByDoctor = async (req, res) => {
    const {doctor_user_id} = req.params;

    try{
        const result =await pool.query('SELECT get_devices_by_doctor($1)',[doctor_user_id]);
        res.status(200).json(result.rows[0].get_devices_by_doctor);
    }catch(err){
        console.error('error fetching devices by doctor',err.message);
        res.status(500).json({message:'error fetching devices by doctor'});
    }
};

const deleteDevice = async (req, res) => {
    const { device_id } = req.params;
  
    try {
      const result = await pool.query('SELECT delete_devices($1)', [device_id]);
      const message = result.rows[0].delete_devices;
  
      if (message === 'Success') {
        res.status(200).json({ message: 'Device deleted successfully' });
      } else {
        res.status(400).json({ message: `Failed to delete device: ${message}` });
      }
    } catch (err) {
      console.error('Error deleting device:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const addDevice = async (req, res) => {
    const { name, status, hospital_id } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT add_device($1, $2, $3)',
        [name, status, hospital_id]
      );
      const success = result.rows[0].add_device;
  
      if (success) {
        res.status(200).json({ message: 'Device added successfully' });
      } else {
        res.status(400).json({ message: 'Failed to add device' });
      }
    } catch (err) {
      console.error('Error adding device:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const updateDevice = async (req, res) => {
    const { id, name, status } = req.body;
  
    try {
      await pool.query(
        'SELECT update_device($1, $2, $3)',
        [id, name, status]
      );
      res.status(200).json({ message: 'Device updated successfully' });
    } catch (err) {
      console.error('Error updating device:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
    getDevicesByDoctor,
    deleteDevice,
    addDevice,
    updateDevice,
};