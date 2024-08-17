const express = require('express');
const dotenv = require('dotenv');
const { db } = require('./config/database.js'); // database.js dosyasından db fonksiyonunu import ediyoruz
const authRoutes = require('./routes/authRoutes.js');
const doctorRoutes = require('./routes/doctorRoutes.js');
const treatmentRoutes = require('./routes/treatmentRoutes.js'); 
const userRoutes = require('./routes/userRoutes.js');
const deviceRoutes = require('./routes/deviceRoutes.js');
const hospitalRoutes = require('./routes/hospitalRoutes.js');
const agentRoutes = require('./routes/agentRoutes'); 
const appointmentRoutes = require('./routes/appointmentRoutes.js');
const patientRoutes = require('./routes/patientRoutes.js'); 


dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/treatment', treatmentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/device',deviceRoutes);
app.use('/api/hospital',hospitalRoutes);
app.use('/api/agent',agentRoutes);
app.use('/api/appointment',appointmentRoutes);
app.use('/api/patient',patientRoutes);

const PORT = process.env.PORT || 5000;

// Uygulama başladığında veritabanı bağlantısını doğrula
db().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database', err);
  process.exit(1); // Veritabanı bağlantısı başarısız olursa, uygulamayı kapat
});

