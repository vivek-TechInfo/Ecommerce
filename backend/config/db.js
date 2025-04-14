const mongoose =  require("mongoose")


const connectDB = async()=>{
    await mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('Mongodb is connect bro 😎');
    }).catch((error)=>{
        console.log(`No Bro Mongodb is not connect 😥 ${error}`);
    })
}


module.exports =  connectDB