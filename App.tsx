import * as React from 'react';
import './style.css';
import DynamicForm from './Components/DynamicForm';
import DynamicTable from './Components/DynamicTable';
import { generateRandomRecord, IRecord } from './Util';

export default function App() {
  const [records, setRecords] = React.useState<IRecord[]>([
    generateRandomRecord(),
    generateRandomRecord(),
  ]);

  const addHandler = React.useCallback((record: IRecord) => {
    setRecords((r) => {
      return [...r, record];
    });
  }, []);

  const deleteHandler = React.useCallback((record: IRecord) => {
    setRecords((records) => {
      return records.filter((x) => x.id !== record.id);
    });
  }, []);

  return (
    <React.Fragment>
      <DynamicForm title="User Information" onAdd={addHandler} />
      <DynamicTable records={records} onDelete={deleteHandler} />
    </React.Fragment>
  );
}
