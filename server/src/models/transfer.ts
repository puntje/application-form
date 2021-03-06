import * as mongoose from 'mongoose';


const TransferSchema = new mongoose.Schema({
  blockNumber: {
    type: Number
  },
  timeStamp: {
    type: Number
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  value: {
    type: Number
  }
});


TransferSchema.index({ from: 1 });
TransferSchema.index({ to: 1 });

const TransferEXRN = mongoose.model('TransferEXRN', TransferSchema);
const TransferEXRT = mongoose.model('TransferEXRT', TransferSchema);


module.exports = {
	TransferEXRN: TransferEXRN,
	TransferEXRT: TransferEXRT
};
