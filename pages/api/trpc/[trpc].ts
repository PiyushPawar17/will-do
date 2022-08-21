import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

import { dbConnect } from '@utils';
import { Todo } from '@models';

export const appRouter = trpc
	.router()
	.query('get-todos', {
		async resolve() {
			await dbConnect();

			const todos = await Todo.find({});

			return { todos };
		}
	})
	.mutation('create-todo', {
		input: z.object({
			title: z.string().trim().nonempty()
		}),
		async resolve({ input }) {
			await dbConnect();

			const newTodo = await new Todo({
				title: input.title
			}).save();

			return {
				todo: newTodo
			};
		}
	})
	.mutation('update-todo', {
		input: z.object({
			id: z.string(),
			title: z.string().trim().nonempty().optional(),
			status: z.enum(['pending', 'in-progress', 'done']).optional()
		}),
		async resolve({ input }) {
			await dbConnect();

			const { id, status, title } = input;

			const todo = await Todo.findById(id);

			if (!todo) {
				throw new trpc.TRPCError({
					code: 'NOT_FOUND',
					message: 'Todo not found'
				});
			}

			if (title) {
				todo.title = title;
			}

			if (status) {
				todo.status = status;
			}

			const updatedTodo = await todo.save();

			return {
				todo: updatedTodo
			};
		}
	})
	.mutation('delete-todo', {
		input: z.object({
			id: z.string()
		}),
		async resolve({ input }) {
			await dbConnect();

			const deletedTodo = await Todo.deleteOne({ _id: input.id });

			return {
				todo: deletedTodo
			};
		}
	});

// Export type definition of API
export type AppRouter = typeof appRouter;

// Export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => null
});
