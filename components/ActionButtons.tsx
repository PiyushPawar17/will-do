import Image from 'next/image';

interface IActionButtonProps {
	handleEditing: (isEditing: boolean) => void;
	handleUpdateStatus: () => void;
	handleDeleteTodo: () => void;
	image: {
		src: string;
		alt: string;
		title: string;
	};
}

const ActionButtons: React.FC<IActionButtonProps> = ({
	handleEditing,
	handleUpdateStatus,
	handleDeleteTodo,
	image
}) => {
	const { src, alt, title } = image;

	return (
		<span className="flex items-center gap-2 shrink-0">
			<button
				className="p-1 hover:bg-slate-900 hover:bg-opacity-5 rounded leading-0"
				onClick={() => handleEditing(true)}
			>
				<Image src="/img/edit.svg" width={14} height={14} alt="Edit Icon" title="Edit todo" />
			</button>
			<button
				className="p-1 hover:bg-slate-900 hover:bg-opacity-5 rounded leading-0"
				onClick={handleUpdateStatus}
			>
				<Image src={src} alt={alt} title={title} width={14} height={14} />
			</button>
			<button className="p-1 hover:bg-slate-900 hover:bg-opacity-5 rounded leading-0" onClick={handleDeleteTodo}>
				<Image src="/img/trash.svg" width={14} height={14} alt="Delete Icon" title="Delete Todo" />
			</button>
		</span>
	);
};

export default ActionButtons;
