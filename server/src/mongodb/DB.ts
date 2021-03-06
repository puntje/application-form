import * as mongoose from 'mongoose';
import { MongoError } from 'mongodb';

export class DB {

  private connectionString;

  public constructor() {
    this.connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/exrn';

    (<any>mongoose).Promise = global.Promise;
    mongoose.connection.on('connected', () => {
      console.log('Connected to mongodb');
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from mongodb');
    });
  }

  public connect(): Promise<mongoose.Connection> {
    return new Promise((resolve, reject) => {
      mongoose.connect(this.connectionString, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (error: MongoError) => {
        if (error) {
          console.log('Error while connecting to mongodb');
          console.log(' -> ' + error.message);
          reject();
          // TODO: if the initial connect fails, no reconnect seems to occur
        } else {
          resolve(mongoose.connection);
        }
      });
    });
  }
}
