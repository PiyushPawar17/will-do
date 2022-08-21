import { useState, useRef } from 'react';
import clsx from 'clsx';

import Loader from '@components/Loader';
import ActionButtons from '@components/ActionButtons';

import { trpc } from '@utils';

import type { ITodo } from '@models';

interface ITodoItemProps {
	todo: ITodo;
	isDone: boolean;
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo, isDone }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(todo.title);
	const titleRef = useRef(title);

	const { mutate: updateTodo, isLoading } = trpc.useMutation(['update-todo']);
	const { mutate: deleteTodo } = trpc.useMutation(['delete-todo']);

	const { invalidateQueries } = trpc.useContext();

	const handleEditing = (isEditing: boolean) => {
		setIsEditing(isEditing);
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleUpdateTitle = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsEditing(false);

		titleRef.current = title;

		if (title.trim() === '') {
			alert('Task should not be empty');
			return;
		}

		updateTodo(
			{ id: todo._id, title },
			{
				onSuccess: () => {
					invalidateQueries(['get-todos']);
				}
			}
		);
	};

	const handleUpdateStatus = (status: ITodo['status']) => {
		updateTodo(
			{ id: todo._id, status },
			{
				onSuccess: () => {
					invalidateQueries(['get-todos']);
				}
			}
		);
	};

	const handleDeleteTodo = () => {
		deleteTodo(
			{ id: todo._id },
			{
				onSuccess: () => {
					invalidateQueries(['get-todos']);
				}
			}
		);
	};

	return (
		<div className="py-1 flex items-center justify-between w-full">
			{!isEditing && !isLoading && (
				<span className={clsx({ 'line-through opacity-75': isDone })}>{todo.title}</span>
			)}

			{isEditing ? (
				<form className="flex gap-2 w-full" onSubmit={handleUpdateTitle}>
					<input
						className="grow p-1 px-3 text-sm rounded focus:outline-none focus:outline-1 focus:outline-amber-400"
						name="title"
						value={title}
						onChange={handleOnChange}
					/>
					<button className="bg-amber-600 rounded px-4 text-white text-sm" type="submit">
						Update Todo
					</button>
					<button
						className="rounded px-4 text-sm bg-transparent border border-amber-600 text-amber-600"
						type="button"
						onClick={() => handleEditing(false)}
					>
						Cancel
					</button>
				</form>
			) : isLoading ? (
				<div className="flex items-center gap-2 opacity-50">
					<span>{titleRef.current}</span> <Loader />
				</div>
			) : todo.status === 'pending' ? (
				<ActionButtons
					handleDeleteTodo={handleDeleteTodo}
					handleEditing={handleEditing}
					handleUpdateStatus={() => handleUpdateStatus('in-progress')}
					image={{ src: '/img/arrow-up.svg', alt: 'Up Arrow Icon', title: 'Move to in progress' }}
				/>
			) : todo.status === 'in-progress' ? (
				<ActionButtons
					handleDeleteTodo={handleDeleteTodo}
					handleEditing={handleEditing}
					handleUpdateStatus={() => handleUpdateStatus('done')}
					image={{ src: '/img/check.svg', alt: 'Check Icon', title: 'Move to done' }}
				/>
			) : (
				<ActionButtons
					handleDeleteTodo={handleDeleteTodo}
					handleEditing={handleEditing}
					handleUpdateStatus={() => handleUpdateStatus('pending')}
					image={{ src: '/img/undo.svg', alt: 'Undo Icon', title: 'Move to pending' }}
				/>
			)}
		</div>
	);
};

export default TodoItem;
