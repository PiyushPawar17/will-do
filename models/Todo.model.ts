import mongoose, { Document, model, Model, Schema } from 'mongoose';

export interface ITodo extends Document {
	title: string;
	status: 'pending' | 'in-progress' | 'done';
}

const TodoSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		status: {
			type: String,
			enum: ['pending', 'in-progress', 'done'],
			default: 'pending'
		}
	},
	{ timestamps: true }
);

export const Todo: Model<ITodo> = mongoose.models.Todo || model('Todo', TodoSchema);
