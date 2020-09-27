import { Collapse, Drawer, Empty } from 'antd';
import { Iitem, ItaskStore } from 'interfaces/TaskInterface';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../TaskCreate/taskReducer/taskReducer';
import { TaskDescriptionItem } from './TaskDescriptionItem';

export const TaskDescription: React.FC = () => {
  const [panel, setPanel] = useState<string | string[]>('')
  const [panelItems, setPanelItems] = useState<Array<Iitem>>()



  const dispatch = useDispatch();
  const visible = useSelector((store: any) => store.taskStore?.isVisible)
  const id = useSelector((store: any) => store.taskStore?.id) || null
  const allTask = useSelector((taskStore: ItaskStore) => taskStore.firestore.data.tasks);
  const { Panel } = Collapse;

  useEffect(() => {
    if(id){
    const task = allTask[id];
    const items = task?.items?.filter((item: Iitem) =>
    item.category === allTask[id].categoriesOrder[Number(panel)])
    setPanelItems(items)}
  }, [allTask, id, panel]);

	const onClose = () => {
    dispatch(deleteTask());
	};

	return (
		<Drawer placement='right' width={'640px'} closable={true} onClose={onClose} visible={visible || false}>
			{id ?
      <div className="description">
        <h3>Task Description</h3>
        {visible ? allTask[id].description : null}
        <h3>Status</h3>
        {visible ? allTask[id].state : null}
        <h3>Scoring criteria</h3>
        <Collapse accordion onChange={(key) => setPanel(key)}>
          {visible ? allTask[id].categoriesOrder.map((el: string, idx: number) => (
            <Panel
              header={el}
              key={idx}
            >
             {panelItems ? panelItems.map((el,idx) => (
               <TaskDescriptionItem {...el} key={idx + 888} />
             )) : null }
            </Panel>
		    	)) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </Collapse>
      </div>
      :
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
		</Drawer>
	);
};
