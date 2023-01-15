import * as React from 'react';
import Input from './Input';
import { getId, getRandomString, IRecord } from '../Util';

export interface IDynamicFormProps {
  title: string;
  onAdd: (record: IRecord) => void;
}

const DynamicForm: React.FC<IDynamicFormProps> = ({
  title = '',
  onAdd = () => {},
}) => {
  const getInitialRecord = React.useCallback(() => {
    return {
      id: getId(),
      firstName: '',
      lastName: '',
      city: '',
      age: 5,
    };
  }, []);

  const [newRecord, setNewRecord] = React.useState<IRecord>(getInitialRecord());

  const submitHandler = React.useCallback(() => {
    const tempRecord = {};
    Object.keys(newRecord).forEach((k) => {
      const value = newRecord[k] === '' ? getRandomString(8) : newRecord[k];
      tempRecord[k] = value;
    });
    onAdd(tempRecord as IRecord);

    setNewRecord(getInitialRecord());
  }, [newRecord]);

  const changeHandler = React.useCallback(
    (key: keyof IRecord, value: string | number) => {
      setNewRecord((record) => {
        return {
          ...record,
          [key]: value,
        };
      });
    },
    []
  );

  return (
    <div className="dynamicFormWrap">
      <h1>{title}</h1>
      <Input
        label="First Name"
        type="text"
        value={newRecord.firstName}
        onChange={(v) => changeHandler('firstName', v)}
      />
      <Input
        label="Last Name"
        type="text"
        value={newRecord.lastName}
        onChange={(v) => changeHandler('lastName', v)}
      />
      <Input
        label="City"
        type="text"
        value={newRecord.city}
        onChange={(v) => changeHandler('city', v)}
      />
      <Input
        label="Age"
        type="number"
        value={newRecord.age}
        onChange={(v) => changeHandler('age', Number(v))}
      />
      <br />
      <button className="b1" onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default DynamicForm;
