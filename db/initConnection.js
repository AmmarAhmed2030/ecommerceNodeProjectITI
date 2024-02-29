
import mongoose from 'mongoose';


const initConnection = async ()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {});
        return console.log("DB connected");
    } catch (err) {
        return console.log("error", err);
    }
}
export default initConnection;