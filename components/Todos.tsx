import TodoItem from '@components/TodoItem';

import type { ITodo } from '@models';

interface ITodosProps {
	todos: ITodo[];
	isDone?: boolean;
}

const Todos: React.FC<ITodosProps> = ({ todos, isDone = false }) => {
	return (
		<div>
			{todos.map(todo => (
				<TodoItem key={todo._id} todo={todo} isDone={isDone} />
			))}
		</div>
	);
};

export default Todos;
