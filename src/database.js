import mongoose from "mongoose";

(async () => {
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/simplejwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("Database is connected to", db.connection.name);
})();
