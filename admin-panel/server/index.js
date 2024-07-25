const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connection = require("./database/db");
const { userRouter } = require("./routes/userRoutes");
const { adminRouter } = require("./routes/adminRoutes");
const { paymentRouter } = require("./routes/paymentRouter");
const path = require("path");


dotenv.config();

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error uncaughtException: ${err.message}`);
    process.exit(1);
});

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.raw({ type: 'application/octet-stream', limit: '50mb' }));


app.use('/api/users', userRouter);
app.use('/api/users', paymentRouter);
app.use('/api/admins', adminRouter)

app.use('/uploads', express.static('uploads'))

// deployment
__dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/out/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'out', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}


app.listen(port, () => { console.log(`Server On Running Port http://localhost:${port}`) });

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error unhandledRejection: ${err.message}`);
    app.close(() => {
        process.exit(1);
    });
});