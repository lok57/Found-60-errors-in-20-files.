import express from 'express';
import { db } from '../config/firebase.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest, productValidationRules } from '../middleware/validate.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Apply rate limiting to all routes
router.use(apiLimiter);

// Get all products with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    let query = db.collection('products');
    
    if (category) {
      query = query.where('category', '==', category);
    }
    
    const startAt = (page - 1) * limit;
    const productsSnapshot = await query.orderBy('createdAt', 'desc')
      .limit(parseInt(limit))
      .offset(startAt)
      .get();

    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      products,
      page: parseInt(page),
      limit: parseInt(limit),
      total: productsSnapshot.size
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const productDoc = await db.collection('products').doc(req.params.id).get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ id: productDoc.id, ...productDoc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product (protected route)
router.post('/', 
  authenticateToken,
  productValidationRules,
  validateRequest,
  async (req, res) => {
    try {
      const { name, price, description, category, image } = req.body;
      const newProduct = {
        name,
        price: parseFloat(price),
        description,
        category,
        image,
        createdAt: new Date(),
        createdBy: req.user.uid,
        updatedAt: new Date()
      };
      const docRef = await db.collection('products').add(newProduct);
      res.status(201).json({ id: docRef.id, ...newProduct });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
});

// Update product
router.put('/:id',
  authenticateToken,
  productValidationRules,
  validateRequest,
  async (req, res) => {
    try {
      const { name, price, description, category, image } = req.body;
      const productRef = db.collection('products').doc(req.params.id);
      
      const product = await productRef.get();
      if (!product.exists) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const updatedProduct = {
        name,
        price: parseFloat(price),
        description,
        category,
        image,
        updatedAt: new Date()
      };

      await productRef.update(updatedProduct);
      res.json({ id: req.params.id, ...updatedProduct });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete product
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const productRef = db.collection('products').doc(req.params.id);
    const product = await productRef.get();
    
    if (!product.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await productRef.delete();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;