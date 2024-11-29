const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db/config.js');
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;


app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tickets/image', require('./routes/tickets'))
app.use('/api/projects', require('./routes/project'));
app.use('/api/tickets', require('./routes/tickets'))
app.use('/api/expenses', require('./routes/expenses'))
app.use('/api/notifications', require('./routes/notifications'))


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

const startServer = async () => {
    try {
        await initializeDatabase();
        
        app.listen(PORT, () => {
            console.log(`
🚀 Servidor corriendo en http://localhost:${PORT}
📁 API endpoints disponibles en http://localhost:${PORT}/api
            `);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();