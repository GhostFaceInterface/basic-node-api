const { pool } = require('../config/database.js');

const getUserRole = async (req, res) => {

    const {auth_id} = req.params;

    try {
        const result = await pool.query ('SELECT get_user_role($1)', [auth_id]);
        res.status(200).json(result.rows[0].get_user_role);
    }catch(err){
        console.error('error fetching user role',err.message); 
        res.status(500).json({message: 'error fetching user role'});
    }
}
const fetchUserDetails = async (req,res) => {
    const {user_type} = req.params;
    
    try{
        const result = await pool.query('SELECT * FROM fetch_user_details($1)', [user_type]);
        res.status(200).json(result.rows);
    }catch(err){
        console.error('error fetching user details', err.message);
        res.status(500).json({message: 'error fetching user details'});
    }
};


module.exports = {
    getUserRole,
    fetchUserDetails,
};