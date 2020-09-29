import React, { useContext } from 'react';
import { Button } from 'antd';
import { SaveFilled } from '@ant-design/icons';
import { TaskContext } from '../TaskContext';
import { saveAs } from 'file-saver';
import { Iitem } from 'interfaces/TaskInterface';
import { useSelector } from 'react-redux';

export const TaskImport = () => {
  const { newTaskForSubmit } = useContext(TaskContext);
  const task = useSelector((store: any) => store.taskStore)
  console.log(task)

  const saveToJson = (obj: any) => {
		const str = JSON.stringify(obj, null, 2);
		const blob = new Blob([ str ], { type: "application/json';charset=utf-8" });
		return saveAs(blob, `${newTaskForSubmit.id}.json`);
  };

  const convertToRss = () => {
    const rrs = {
      "taskName": newTaskForSubmit.id,

      "criteria": [
      ...newTaskForSubmit.categoriesOrder.map((cat:string) => {
        return {'type': 'title', 'title': cat}
      }),
      ...newTaskForSubmit.items.map((item: Iitem) => {
        if(item.minScore < 0) return {'type': 'penalty', 'text': item?.description, 'max': item?.minScore }
        return {'type': 'subtask', 'text': item?.description, 'max': item?.maxScore }
      })

    ]

    }
    saveToJson(rrs)
  }


	return (
    <>
		<Button type='default' className={'button-import'} disabled={!task && !newTaskForSubmit?.id} icon={<SaveFilled />} onClick={() => saveToJson(newTaskForSubmit)}>
			Save to JSON
		</Button>
    <Button type='default' className={'button-import'} disabled={!newTaskForSubmit?.id} icon={<SaveFilled />} onClick={convertToRss}>
      Save to RRS
    </Button>
    </>
	);
};
