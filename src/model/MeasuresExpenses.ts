import mongoose, { Schema, Document } from 'mongoose';

interface IMeasure extends Document {
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
  measure_value?: number;
  image_url?: string;
  has_confirmed?: boolean;
}

const measureSchema: Schema = new Schema({
  measure_uuid: { type: String, required: true, unique: true },
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, enum: ['WATER', 'GAS'], required: true },
  measure_value: { type: Number },
  image_url: { type: String },
  has_confirmed: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Measure = mongoose.model<IMeasure>('Measure', measureSchema);

export default Measure;
