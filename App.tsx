import * as React from 'react';
import './style.css';
import DynamicForm from './Components/DynamicForm';
import DynamicFormEdit from './Components/DynamicFormEdit';
import DynamicTable from './Components/DynamicTable';
import {
  formMetaData as formMetaDataInitial,
  generateRandomRecord,
  IFormMetaData,
  IRecord,
} from './Util';

export default function App() {
  const [formMetaData, setFormMetaData] =
    React.useState<IFormMetaData>(formMetaDataInitial);

  const [records, setRecords] = React.useState<IRecord[]>();

  const [showDynamicFormEdit, setShowDynamicFormEdit] =
    React.useState<boolean>(false);

  const addHandler = React.useCallback((record: IRecord) => {
    setRecords((r) => {
      return [record, ...r];
    });
  }, []);

  const deleteHandler = React.useCallback((record: IRecord) => {
    setRecords((records) => {
      return records.filter((x) => x.id !== record.id);
    });
  }, []);

  const deleteAllHandler = React.useCallback(() => {
    setRecords([]);
  }, []);

  React.useEffect(() => {
    setRecords(
      Array(showDynamicFormEdit ? 2 : 8)
        .fill('')
        .map(() => generateRandomRecord(formMetaData.fields))
    );
  }, [formMetaData.fields, showDynamicFormEdit]);

  return (
    <React.Fragment>
      {showDynamicFormEdit ? (
        <DynamicFormEdit
          setFormMetaData={setFormMetaData}
          formMetaData={formMetaData}
          onClose={() => setShowDynamicFormEdit(false)}
        />
      ) : (
        <DynamicForm
          onAdd={addHandler}
          formMetaData={formMetaData}
          onFormMetaDataEdit={() => setShowDynamicFormEdit(true)}
        />
      )}
      <DynamicTable
        records={records}
        onDelete={deleteHandler}
        onDeleteAll={deleteAllHandler}
        formMetaData={formMetaData}
        isSmall={showDynamicFormEdit}
      />
    </React.Fragment>
  );
}
