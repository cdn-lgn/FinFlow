import mongoose from "mongoose";

const panCardSchema = new mongoose.Schema({}, { strict: false });

export const PanCard = mongoose.model('PanCard', panCardSchema, 'pan_card');
