import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITodo extends Document {
    task: string;
    completed: boolean;
}

const TodoSchema: Schema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

export const Todo: Model<ITodo> = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);
