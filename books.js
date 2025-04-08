const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', async(requestAnimationFrame, res)=>{
    try{
        let query ={};

        if (req.query.author) query.author = req.query.author;
    if (req.query.category) query.category = req.query.category;
    if (req.query.rating) query.rating = parseInt(req.query.rating);
    if (req.query.title) {
        query.title = { $regex: req.query.title, $options: 'i' };
      }
       const page = pareseInt(req.query.page) || 1;
       const limit = pareseInt(req.query.limit) || 10;
       const skip = (page - 1) * limit;

        let sort ={};
        if(req.query.sort){
         if(req.query.sort == 'price') sort.price = 1;
         if(req.query.sort == '-price') sort.price = -1;
         if(req.query.sort == 'rating') sort.price = 1;
         if(req.query.sort == '-rating') sort.price = -1;
          }

          const book = await Book.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit);
          res.status(200).json({ success: true, count: books.length, data: books });
        } catch (error) {
          res.status(500).json({ success: false, message: 'Error' });
        }
       });
        
       router.get('/:id', async (req, res) => {
        try {
          const book = await Book.findById(req.params.id);
         if(!book){
            return res.status(404).json({ success: false, message:'Book not found'});
         }
         res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error' });
  } 
  });

  router.post('/', async(req, res)=>{
    try{
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
     
router.put('/:id', async (req,res)=>{
    try{
        let book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
          }
          
          book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
          });
        
          res.status(200).json({ success: true, data: book });
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
        });
        router.delete('/:id', async (req, res) => {
            try {
              const book = await Book.findById(req.params.id);
              
              if (!book) {
                return res.status(404).json({ success: false, message: 'Book not found' });
        }
        await book.deleteOne();
    
        res.status(200).json({ success: true, data: {} });
        } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
        }
        });
         module.export = router;


