require('dotenv').config();
const express = require('express');

const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const uploads = multer({ dest: 'uploads/' });
const fs = require('fs');

const app = express();
app.use(cors());

app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

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

app.get("/posts/:id", (req, res) => {
    const Id = req.params.id;
    console.log(`Fetching post with ID: ${Id}`);
    
    const query = `
        SELECT Posts.*, Images.Data AS ImageData
        FROM Posts
        LEFT JOIN Images ON Posts.Id = Images.PostId
        WHERE Posts.Id = ?
    `;

    db.query(query, [Id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database query failed");
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        const post = results[0];
        post.Images = results.map(row => row.ImageData ? `data:image/jpeg;base64,${Buffer.from(row.ImageData).toString('base64')}` : null).filter(Boolean);
        // const post = results[0];
        // post.Images = post.ImageFilenames ? post.ImageFilenames.split(',') : []; // Omvandla till array
        // delete post.ImageFilenames; 

        res.json(post); // Skicka tillbaka inlägget
    });
});

app.post('/posts', upload.array('images', 5), (req, res) => {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
        return res.status(400).json({ message: 'Title, description, and price are required.' });
    }

    // Extrahera filnamnen från de uppladdade filerna
    const images = req.files.map(file => file.filename);

    const query = `INSERT INTO Posts (title, description, price) VALUES (?, ?, ?)`;

    db.query(query, [title, description, price], (err, results) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const postId = results.insertId;

        // Om det finns bilder att lagra
        if (images.length > 0) {
            const imageQuery = `INSERT INTO Images (PostId, Data) VALUES ?`;
            const imageValues = images.map(data => [postId, data]);

            db.query(imageQuery, [imageValues], (err) => {
                if (err) {
                    console.error('Error inserting images into the database:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                res.status(201).json({ id: postId, title, description, price, images });
            });
        } else {
            res.status(201).json({ id: postId, title, description, price, images: [] });
        }
    });
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, './build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

// Fallback route for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});