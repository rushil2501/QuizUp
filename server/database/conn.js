import mongoose from "mongoose";

export default async function connect(){
    await mongoose.connect('mongodb+srv://admin:admin123@quiz.2nbaf6w.mongodb.net/')
    console.log("Database Connected")
}