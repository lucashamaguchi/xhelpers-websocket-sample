import * as mongoose from 'mongoose';

export interface ITodo extends mongoose.Document {
  task: string;
  created_at: Date;
  description: string,
  done: boolean,
}

const schema = new mongoose.Schema({
  task: { type: String , required: true},
  description: { type: String , required: true},
  created_at: { type: Date, required: false, default: new Date() },
  done: { type: Boolean, required: false, default: false },
});

schema.set('toJSON', { virtuals: true });

export default mongoose.models.Todo || mongoose.model<ITodo>('Todo', schema, 'todo');
