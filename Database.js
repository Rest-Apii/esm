import mongodb from "mongodb";

class Database {
  constructor() {
    this.db = {};
  }
  async connect(uri, opt = {
    db: "data"
  }) {
    let client = new mongodb.MongoClient(uri);
    await client.connect();
    this.db = client.db(opt.db);
    return this;
  }
  async get(data, collect = "any") {
    let collection = this.db.collection(collect);
    return collection.find(data).toArray();
  }
  async find(data, collect = "any") {
    let collection = this.db.collection(collect);
    return collection.findOne(data);
  }
  async add(data, collect = "any") {
    let collection = this.db.collection(collect);
    return collection.insertOne({
      ...data
      });
  }
  async set(key, value, collect = "any") {
    let collection = this.db.collection(collect);
    return collection.updateOne({
      ...key
    }, {
      $set: {
        ...value
      }
    });
  }
  async delete(data, collect = "any") {
    let collection = this.db.collection(collect);
    return collection.deleteOne(data);
  }
}

export default new Database();