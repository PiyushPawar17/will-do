import { useState, useRef } from 'react';

import Loader from '@components/Loader';
import TodoContainer from '@components/TodoContainer';

import { trpc } from '@utils';

import type { NextPage } from 'next';

const Home: NextPage = () => {
	const [title, setTitle] = useState('');
	const titleRef = useRef(title);

	const { data: todos, isLoading: isTodosLoading } = trpc.useQuery(['get-todos']);
	const { mutate: createTodo, isLoading } = trpc.useMutation(['create-todo']);

	const { invalidateQueries } = trpc.useContext();

	if (!todos || isTodosLoading) {
		return (
			<main className="bg-amber-50 min-h-screen p-4">
				<div className="text-center scale-150 pt-10">
					<Loader />
				</div>
			</main>
		);
	}

	const inProgressTodos = todos.todos.filter(todo => todo.status === 'in-progress');
	const pendingTodos = todos.todos.filter(todo => todo.status === 'pending');
	const doneTodos = todos.todos.filter(todo => todo.status === 'done');

	const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		titleRef.current = title;

		if (title.trim() === '') {
			alert('Task should not be empty');
			return;
		}

		createTodo(
			{ title },
			{
				onSuccess: () => {
					invalidateQueries(['get-todos']);
					setTitle('');
				}
			}
		);
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	return (
		<main className="bg-amber-50 min-h-screen p-4">
			<section className="max-w-[768px] mx-auto pt-10">
				<h1 className="text-center font-bold text-4xl">Will Do</h1>
				<p className="text-center mt-4">A todo list applicaiton built with tRPC</p>
				<form className="mt-8 flex gap-2" onSubmit={addTodo}>
					<input
						className="grow p-2 rounded focus:outline-none focus:outline-1 focus:outline-amber-400"
						name="title"
						onChange={handleOnChange}
						value={title}
					/>
					<button className="bg-amber-600 rounded px-4 text-white" type="submit">
						Add Todo
					</button>
				</form>
				{todos.todos.length === 0 ? (
					<p className="text-sm mt-4">No todos added yet</p>
				) : (
					<div className="mt-4 space-y-8">
						<TodoContainer todos={inProgressTodos} title="In Progress" />
						<TodoContainer
							todos={pendingTodos}
							title="Pending"
							isLoading={isLoading}
							titleRef={titleRef.current}
						/>
						<TodoContainer todos={doneTodos} title="Done" />
					</div>
				)}
			</section>
		</main>
	);
};

export default Home;
