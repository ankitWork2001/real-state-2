import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  console.log('=== NEW REQUEST RECEIVED ===');
  console.log('📨 Request body:', req.body);
  console.log('📨 Request headers:', req.headers);
  
  try {
    const { name, mobile, email } = req.body;

    console.log('Step 1: Extracted data');
    console.log('  - name:', name);
    console.log('  - mobile:', mobile);
    console.log('  - email:', email);

    // Validation
    if (!name || !mobile || !email) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide name, mobile, and email',
      });
    }

    console.log('Step 2: All required fields present');

    // Check if user already exists with this email
    console.log('Step 3: Checking for duplicate email...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Duplicate email found:', email);
      return res.status(400).json({
        success: false,
        message: 'Email already registered. Please use a different email.',
      });
    }

    console.log('Step 4: Email is unique, creating user...');
    const user = await User.create({
      name,
      mobile,
      email,
    });

    console.log('✅ User created successfully');
    console.log('✅ User data:', user);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    console.error('❌ ERROR CAUGHT IN TRY-CATCH');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    // Handle specific MongoDB validation errors
    if (error.name === 'ValidationError') {
      console.log('Handling ValidationError');
      const messages = Object.values(error.errors)
        .map(err => err.message)
        .join(', ');
      console.log('Validation messages:', messages);
      return res.status(400).json({
        success: false,
        message: `Validation error: ${messages}`,
      });
    }

    console.log('Sending generic error response');
    res.status(400).json({
      success: false,
      message: error.message || 'Error creating user',
    });
  }
});

export default router;