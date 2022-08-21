import Todos from '@components/Todos';
import Loader from '@components/Loader';

import type { ITodo } from '@models';

interface ITodoContainerProps {
	title: 'In Progress' | 'Pending' | 'Done';
	todos: ITodo[];
	isLoading?: boolean;
	titleRef?: string;
}

const TodoContainer: React.FC<ITodoContainerProps> = ({ todos, title, isLoading = false, titleRef = '' }) => {
	const getEmptyStateText = () => {
		if (title === 'In Progress') {
			return 'No todos in progress';
		}

		if (title === 'Pending') {
			return 'No todos pending';
		}

		return 'No todos done';
	};

	return (
		<section>
			<h2 className="font-semibold text-2xl">{title}</h2>
			<hr className="my-2 h-px border-t border-t-amber-400 opacity-50 block" />
			{todos.length === 0 ? (
				<p className="text-sm">{getEmptyStateText()}</p>
			) : (
				<Todos todos={todos} isDone={title === 'Done'} />
			)}

			{title === 'Pending' && isLoading && (
				<div className="flex items-center gap-2 opacity-50">
					<span>{titleRef}</span> <Loader />
				</div>
			)}
		</section>
	);
};

export default TodoContainer;
