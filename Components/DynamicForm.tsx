import * as React from 'react';
import Input from './Input';
import {
  getId,
  getRandomString,
  IFormFieldMetaData,
  IFormMetaData,
  IRecord,
} from '../Util';

export interface IDynamicFormProps {
  onAdd: (record: IRecord) => void;
  formMetaData: IFormMetaData;
  onFormMetaDataEdit: () => void;
}

const DynamicForm: React.FC<IDynamicFormProps> = ({
  onAdd = () => {},
  formMetaData,
  onFormMetaDataEdit = () => {},
}) => {
  const getInitialRecord = React.useCallback(
    (fields: IFormFieldMetaData[] = []): IRecord => {
      const tempRecord: IRecord = {
        id: getId(),
      };

      fields.forEach((field) => {
        tempRecord[field.key] =
          field.type === 'text'
            ? field.defaultValue || ''
            : Number(field.defaultValue) || 0;
      });

      return tempRecord;
    },
    []
  );

  const [newRecord, setNewRecord] = React.useState<IRecord>(
    getInitialRecord(formMetaData.fields)
  );

  const submitHandler = React.useCallback(() => {
    const tempRecord = {};
    Object.keys(newRecord).forEach((k) => {
      const value =
        newRecord[k] === ''
          ? getRandomString()
          : newRecord[k] === 0
          ? Math.round(Math.random() * 100)
          : newRecord[k];
      tempRecord[k] = value;
    });
    onAdd(tempRecord as IRecord);

    setNewRecord(getInitialRecord(formMetaData.fields));
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
      <h1>
        {formMetaData.title}
        <span className="editButton" onClick={onFormMetaDataEdit}>
          &#9998;
        </span>
      </h1>
      <div className="fieldsWrap scrollWrap">
        {formMetaData.fields.map((field) => (
          <Input
            key={field.key}
            label={field.label}
            type={field.type}
            value={newRecord[field.key]}
            onChange={(v) =>
              changeHandler(field.key, field.type === 'number' ? Number(v) : v)
            }
          />
        ))}
      </div>
      <button className="b1 block" onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default DynamicForm;
