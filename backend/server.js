const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'blogprism_secret_key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';

// MongoDB connection
const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/blogging_platform";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
let postsCollection;
let usersCollection;
let categoriesCollection;

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    db = client.db("blogging_platform");
    postsCollection = db.collection("posts");
    usersCollection = db.collection("users");
    categoriesCollection = db.collection("categories");
    
    await initializeSampleData();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Initialize with sample data
async function initializeSampleData() {
  try {
    const userCount = await usersCollection.countDocuments();
    if (userCount === 0) {
      const saltRounds = 10;
      const adminPassword = await bcrypt.hash('admin123', saltRounds);
      const userPassword = await bcrypt.hash('user123', saltRounds);
      
      await usersCollection.insertMany([
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: adminPassword,
          isAdmin: true
        },
        {
          name: 'Regular User',
          email: 'user@example.com',
          password: userPassword,
          isAdmin: false
        }
      ]);
      console.log("Sample users inserted");
    }
    
    const categoryCount = await categoriesCollection.countDocuments();
    if (categoryCount === 0) {
      await categoriesCollection.insertMany([
        { name: 'Technology', slug: 'technology' },
        { name: 'Web Development', slug: 'web-development' },
        { name: 'React', slug: 'react' },
        { name: 'JavaScript', slug: 'javascript' },
        { name: 'Node.js', slug: 'nodejs' }
      ]);
      console.log("Sample categories inserted");
    }
    
    const postCount = await postsCollection.countDocuments();
    if (postCount === 0) {
      await postsCollection.insertMany([
        {
          title: 'The Future of Web Development: Trends to Watch in 2023',
          excerpt: 'Explore the latest trends and technologies that are shaping the future of web development in 2023 and beyond.',
          content: 'The web development landscape is constantly evolving, with new technologies and frameworks emerging regularly. In 2023, several key trends are shaping the future of how we build web applications. Progressive Web Apps (PWAs) continue to gain traction as they offer app-like experiences directly in the browser. With improved performance and offline capabilities, PWAs bridge the gap between web and native applications. Server-Side Rendering (SSR) and Static Site Generation (SSG) frameworks like Next.js and Nuxt.js have made these approaches more accessible.',
          createdAt: new Date('2023-01-15T00:00:00Z'),
          slug: 'future-of-web-development-2023',
          featuredImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
          author: {
            name: 'Alex Johnson',
            bio: 'Senior Frontend Developer with 8 years of experience in React and modern JavaScript frameworks.',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
          },
          categories: ['technology', 'web-development'],
          likes: 24
        },
        {
          title: 'Mastering React Hooks: A Complete Guide',
          excerpt: 'Learn how to use React Hooks effectively to build more efficient and maintainable React applications.',
          content: 'React Hooks have revolutionized how we write React components. They allow us to use state and other React features without writing a class component. The useState hook is the most fundamental hook in React. It allows you to add state to functional components. The useEffect hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.',
          createdAt: new Date('2023-02-20T00:00:00Z'),
          slug: 'mastering-react-hooks',
          featuredImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          author: {
            name: 'Sarah Williams',
            bio: 'React specialist and author of several popular React courses.',
            photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80'
          },
          categories: ['react', 'javascript'],
          likes: 18
        }
      ]);
      console.log("Sample posts inserted");
    }
  } catch (error) {
    console.error("Error initializing sample data:", error);
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: { ...userWithoutPassword, id: user._id } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      name,
      email,
      password: hashedPassword,
      isAdmin: false
    };
    
    const result = await usersCollection.insertOne(newUser);
    const userId = result.insertedId;
    
    const token = jwt.sign(
      { id: userId, email: newUser.email, isAdmin: newUser.isAdmin },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );
    
    const userResponse = { ...newUser, id: userId };
    delete userResponse.password;
    
    res.status(201).json({ token, user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Blog post routes
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await postsCollection.find({}).sort({ createdAt: -1 }).toArray();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/posts/:slug', async (req, res) => {
  try {
    const post = await postsCollection.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    const { title, excerpt, content, featuredImage, categories } = req.body;
    
    const newPost = {
      title,
      excerpt,
      content,
      featuredImage,
      categories,
      author: {
        name: req.user.name,
        bio: '',
        photo: ''
      },
      createdAt: new Date(),
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      likes: 0
    };
    
    const result = await postsCollection.insertOne(newPost);
    const insertedPost = await postsCollection.findOne({ _id: result.insertedId });
    
    res.status(201).json(insertedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/posts/:slug', authenticateToken, async (req, res) => {
  try {
    const { title, excerpt, content, featuredImage, categories } = req.body;
    
    const updatedPost = {
      $set: {
        title,
        excerpt,
        content,
        featuredImage,
        categories,
        updatedAt: new Date()
      }
    };
    
    const result = await postsCollection.updateOne(
      { slug: req.params.slug },
      updatedPost
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const post = await postsCollection.findOne({ slug: req.params.slug });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/posts/:slug', authenticateToken, async (req, res) => {
  try {
    const result = await postsCollection.deleteOne({ slug: req.params.slug });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Categories routes
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await categoriesCollection.find({}).toArray();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search route
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      const posts = await postsCollection.find({}).sort({ createdAt: -1 }).toArray();
      return res.json(posts);
    }
    
    const filteredPosts = await postsCollection.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { excerpt: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ]
    }).toArray();
    
    res.json(filteredPosts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like route
app.post('/api/posts/:slug/like', async (req, res) => {
  try {
    const post = await postsCollection.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const likes = (post.likes || 0) + 1;
    
    await postsCollection.updateOne(
      { slug: req.params.slug },
      { $set: { likes } }
    );
    
    res.json({ likes });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Connect to database and start server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});