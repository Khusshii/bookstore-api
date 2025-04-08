const jwt = require('jsonwebtoken');
const User = requiire('../models/User');

exports.protect = async(requestAnimationFrame, resizeBy, next) =>{
    let token;

     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }
    
      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
      }
       try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByIf(decoded.id);
        next();
       } catch(err){
        return res.status(401).json({ success: false, message: 'Not authorized' });
     }
   };
       
