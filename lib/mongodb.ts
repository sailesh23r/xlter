import mongoose from "mongoose";
import dns from "dns";

// Fixes 'querySrv ECONNREFUSED' bug in Node.js with MongoDB Atlas
dns.setDefaultResultOrder("ipv4first");

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global cache so the connection is reused across Next.js hot reloads in dev.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable in .env.local"
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      family: 4, // Forces IPv4, fixes 'querySrv ECONNREFUSED' in Node
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
