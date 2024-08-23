require('dotenv').config();
const express = require('express');

const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const app = express();


app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

app.get('/', (req, res) => {
    return res.json("from Backend");
});

// app.get("/posts", (req, res) => {
//     db.query("SELECT * FROM Posts", (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
//  });

app.get("/posts", (req, res) => {
    const query = `
        SELECT Posts.*, GROUP_CONCAT(Images.Id) AS ImageIds
        FROM Posts
        LEFT JOIN Images ON Posts.Id = Images.PostId
        GROUP BY Posts.Id;
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database query failed');
        }
        
        // Omvandla resultatet så att ImageIds blir en array
        const postsWithImages = result.map(post => ({
            ...post,
            ImageIds: post.ImageIds ? post.ImageIds.split(',') : [] // Omvandla till array
        }));
        
        res.json(postsWithImages); // Skicka tillbaka resultaten som JSON
    });
});

// Hämta en specifik bild med dess ID
app.get("/images/:id", (req, res) => {
    const imageId = req.params.id;

    const query = "SELECT Data FROM Images WHERE Id = ?";
    db.query(query, [imageId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database query failed');
        }

        if (result.length === 0) {
            return res.status(404).send('Image not found');
        }

        const imageData = result[0].Data;
        const base64Image = Buffer.from(imageData).toString('base64');
        res.json({ image: `data:image/jpeg;base64,${base64Image}` }); // Justera MIME-typen om nödvändigt
    });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Fallback route for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});