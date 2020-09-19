import React, { useContext } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { TaskHeader } from './TaskHeader';
import { TaskContext } from './TaskContext';
import { Iitem, Itask } from 'interfaces/TaskInterface';
import { insertToArrayByIndex } from 'utils/insertToArrayByIndex';
import { toast } from 'react-toastify';

interface valuesTaskAdd {
	name: string;
	order: number;
}

export const TaskAddCateory: React.FC = () => {
	const [ form ] = Form.useForm();
	const { setNewTask, returnToTaskDefault, newTask, editCategory, setEditCategory, setNewItems } = useContext(
		TaskContext
	);

	const onReset = (): void => {
		form.resetFields();
		setEditCategory(false);
	};

	const setCategoriesOrder = (prev: Itask, values: valuesTaskAdd) => {
		let prevCatState = prev.categoriesOrder;
		const isEdit = prevCatState.includes(editCategory);
		const currentElIndex = () => prev.categoriesOrder.indexOf(editCategory);
		const newElName = values.name;
		const setNewItemsNames = (prev: Array<Iitem>) => {
			return [
				...prev.map((item) => {
					const elIdx = prevCatState.indexOf(newElName);
					if (item.category === editCategory) {
						const newItem = item;
						newItem.id = `${newElName.replace(/\s+/g, '')}_p${elIdx}`;
						newItem.category = newElName;
						return newItem;
					} else {
						return item;
					}
				})
			];
		};

		const changeOrder = () => {
			const newOrdered = prevCatState;
			const newIdx = values.order - 1;
			const oldIdx = prevCatState.indexOf(newElName);
			const item = prevCatState[oldIdx];
			const isNewOrder = newIdx !== oldIdx;
			if (isNewOrder) {
				newOrdered.splice(oldIdx, 1);
				newOrdered.splice(newIdx, 0, item);
				prevCatState = [ ...newOrdered ];
			}
		};

		if (isEdit) {
			prevCatState.splice(currentElIndex(), 1, newElName);
			changeOrder();
			setNewItems((prev: Array<Iitem>) => setNewItemsNames(prev));
		}
		return isEdit ? prevCatState : insertToArrayByIndex(prevCatState, values.order - 1, newElName);
	};

	const handleCatSubmit = () => {
		const values: valuesTaskAdd = form.getFieldsValue();
		setNewTask((prev: Itask) => ({
			...prev,
			categoriesOrder: setCategoriesOrder(prev, values)
		}));
		setEditCategory(false);
	};

	const onFinish = () => {
		returnToTaskDefault();
		setEditCategory(false);
	};

	const onFinishFailed = (errorInfo: object) => {
		toast.error(errorInfo);
	};

	return (
		<div className='task-category'>
			<Form form={form} name='Add Category' onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<div className='task-category--header'>
					<TaskHeader
						onReset={onReset}
						handleSubmit={handleCatSubmit}
						arrowButton={true}
						title={editCategory ? 'Edit Task' : 'Create Task'}
					/>
				</div>

				<Form.Item
					name='name'
					rules={[ { required: true, message: 'Please input title!' } ]}
					initialValue={editCategory ? editCategory : null}
				>
					<Input placeholder='Type category title' maxLength={30} />
				</Form.Item>
				<Form.Item
					name='order'
					rules={[ { required: true, message: 'Please select order!' } ]}
					initialValue={
						editCategory ? (
							newTask.categoriesOrder.indexOf(editCategory) + 1
						) : (
							newTask.categoriesOrder.length + 1
						)
					}
				>
					<InputNumber min={1} max={100} onChange={() => null} />
				</Form.Item>
			</Form>
		</div>
	);
};
