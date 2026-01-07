import User from "../models/User.js";

import { sendEmail } from "../utils/sendEmail.js";
import { welcomeEmailTemplate } from "../emailTemplates/welcomeEmailTemplate.js";

export const CreateUser = async (req, res) => {
  console.log('=== NEW REQUEST RECEIVED ===');
  console.log('📨 Request body:', req.body);

  try {
    const { name, mobile, email } = req.body;

    // Validation
    if (!name || !mobile || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, mobile, and email',
      });
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered. Please use a different email.',
      });
    }

    // Create user
    const user = await User.create({
      name,
      mobile,
      email,
    });

    console.log('✅ User created:', user.email);

    // 🔔 SEND EMAIL (non-blocking)
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to Our Platform 🎉",
        html:welcomeEmailTemplate({ name, mobile }),
      });
      console.log('📧 Welcome email sent');
    } catch (emailError) {
      console.error('⚠️ Email failed but user created:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });

  } catch (error) {
    console.error('❌ ERROR:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map(err => err.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message: `Validation error: ${messages}`,
      });
    }

    res.status(400).json({
      success: false,
      message: error.message || 'Error creating user',
    });
  }
};


export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

