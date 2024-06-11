import { ObjectId } from "mongodb";
import ApplicationHandler from "../../Error-Handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";

export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async addProduct(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationHandler("Something Went Wrong with dataBase", 500);
    }
  }

  async getProduct(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationHandler("Something Went Wrong with dataBase", 500);
    }
  }

  async getAllProducts() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return collection.find().toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationHandler("Something Went Wrong with dataBase", 500);
    }
  }

  async filterProducts(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      return collection.find(filterExpression).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationHandler("Something Went Wrong with dataBase", 500);
    }
  }

  async rateProducts(userID, productID, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      collection.updateOne(
        {
          _id: new ObjectId(productID),
        },
        {
          $push: { ratings: { userID: new ObjectId(userID), rating } },
        }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationHandler("Something Went Wrong with dataBase", 500);
    }
  }
}
