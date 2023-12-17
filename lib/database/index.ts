import mongosse from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any ).mongosse || {conn: null , promise: null};

export const connectToDatabase = async () => {
    if(cached.conn) return cached.conn;

    if(!MONGODB_URI) throw new Error("MONGODB_URL is missing")

    cached.promise = cached.promise || mongosse.connect(MONGODB_URI , {
        dbName: 'evently',
        bufferCommands:false,
    })

    cached.conn = await cached.promise;

    return cached.conn;
}

