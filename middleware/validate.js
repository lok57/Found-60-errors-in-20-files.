import { body, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const productValidationRules = [
  body('name').notEmpty().trim().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('description').notEmpty().trim().withMessage('Description is required'),
  body('category').notEmpty().trim().withMessage('Category is required'),
  body('image').isURL().withMessage('Valid image URL is required')
];

export const orderValidationRules = [
  body('items').isArray().notEmpty().withMessage('Order items are required'),
  body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
  body('totalAmount').isNumeric().withMessage('Total amount must be a number')
];

export const userValidationRules = [
  body('displayName').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('phoneNumber').optional().matches(/^\+?[\d\s-]+$/).withMessage('Invalid phone number'),
  body('address').optional().notEmpty().withMessage('Address cannot be empty if provided')
];