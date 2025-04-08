const mongoose = require ('mongoose');

const connectDB = async() => {
    try {
        const db= await mongoose.connect(process.env.MONGODB_URI,
         {
            useNewurl: true,
            useUnifiedtopology: true,
         }   
        );
        console.log(`MongoDB Connected: ${db.connection.host}`);
    } catch (error){
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
};

module.exports= connectDB;