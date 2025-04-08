const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res)=>{
    try{
        const {email, password } = req.body;
        const user = await User.create({
            email, password
        });
        const token = user.getToken();
        res.status(201).json({ success: true, token });
       } catch (error) {
    
       if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
      }
      res.status(400).json({ success: false, message : error.message});
      }
      });

      router.post('/login', async (req, res)=>{
        try{
            const {email, password } = req.body;
           if(!email || !password){
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
             }
             const user = await User.findOne({ email }).select('+password');
             
             if (!user){
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
             }
             const isMatch = await user.matchPassword(password);
    
             if (!isMatch) {
               return res.status(401).json({ success: false, message: 'Invalid credentials' });
             }

             const token = user.getToken();
    
             res.status(200).json({ success: true, token });
             } catch (error) {
             res.status(500).json({ success: false, message: 'Server error' });
             }
             });
             module.exports = router;