import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.DBURL)
    .then(() => {
      console.log("Database Is Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
