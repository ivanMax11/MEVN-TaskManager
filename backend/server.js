const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.log('Error conectando a MongoDB:', error));

// Crear aplicación de Express
const app = express();

// Configuración de CORS
const corsOptions = {
    origin: ['https://mevn-taskmanager-1.onrender.com', 'http://localhost:8080'],  // Agrega localhost para desarrollo
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,  // Permite enviar cookies y credenciales
};
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');  
const taskRoutes = require('./routes/tasks'); 

// Usar las rutas
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Servir Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
