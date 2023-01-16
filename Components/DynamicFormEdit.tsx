import * as React from 'react';
import Input from './Input';
import {
  getId,
  getRandomString,
  IFormFieldMetaData,
  IFormMetaData,
  IRecord,
} from '../Util';

export interface IDynamicFormEditProps {
  onChange: (formMetaData: IFormMetaData) => void;
  formMetaData: IFormMetaData;
  onClose: () => void;
}

const DynamicFormEdit: React.FC<IDynamicFormEditProps> = ({
  onChange = () => {},
  formMetaData,
  onClose = () => {},
}) => {
  const [newField, setNewField] = React.useState<IFormFieldMetaData>({
    key: '',
    label: '',
    type: 'text',
  });

  const newFieldChangeHandler = React.useCallback((k: string, v: string) => {
    setNewField((nf) => ({
      ...nf,
      [k]: v,
    }));
  }, []);

  const addNewFieldHandler = React.useCallback(() => {
    onChange({
      ...formMetaData,
      fields: [...formMetaData.fields, { ...newField }],
    });
    setNewField({ key: '', label: '', type: 'text' });
  }, [onChange, formMetaData, newField]);

  const fieldChangeHandler = React.useCallback(
    (fieldKey: string, k: string, v: string) => {
      onChange({
        ...formMetaData,
        fields: formMetaData.fields.map((f) =>
          f.key === fieldKey
            ? {
                ...f,
                [k]: v,
              }
            : {
                ...f,
              }
        ),
      });
    },
    [onChange, formMetaData]
  );

  const deleteFieldHandler = React.useCallback(
    (fieldKey: string) => {
      onChange({
        ...formMetaData,
        fields: formMetaData.fields.filter(({ key }) => key !== fieldKey),
      });
    },
    [onChange, formMetaData]
  );

  return (
    <div className="dynamicFormEditWrap">
      <h1>
        Edit Form
        <span className="closeButton" onClick={onClose}>
          &times;
        </span>
      </h1>
      <div className="fieldsWrap scrollWrap">
        {formMetaData.fields.map((field) => (
          <React.Fragment>
            <span className="fieldKeyWrap">{field.key}</span>
            <div className="fieldWrap" key={field.key}>
              <Input
                label="Label"
                value={field.label}
                type="text"
                onChange={(v) => fieldChangeHandler(field.key, 'label', v)}
              />
              <Input
                label="Default"
                value={field.defaultValue}
                type="text"
                onChange={(v) =>
                  fieldChangeHandler(field.key, 'defaultValue', v)
                }
              />
              <span
                className="deleteButton"
                onClick={() => deleteFieldHandler(field.key)}
              >
                &#9938;
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="addFieldWrap">
        <Input
          label="Key"
          value={newField.key}
          type="text"
          onChange={(v) => {
            newFieldChangeHandler('key', v);
          }}
        />
        <Input
          label="Label"
          value={newField.label}
          type="text"
          onChange={(v) => {
            newFieldChangeHandler('label', v);
          }}
        />
        <span className="typeButtonsWrap">
          <span
            className={
              'typeButton ' + (newField.type === 'number' ? 'active' : '')
            }
            onClick={() => {
              newFieldChangeHandler('type', 'number');
            }}
          >
            12
          </span>
          <span
            className={
              'typeButton ' + (newField.type === 'text' ? 'active' : '')
            }
            onClick={() => {
              newFieldChangeHandler('type', 'text');
            }}
          >
            ab
          </span>
        </span>

        <span
          className={
            'addButton ' +
            (newField.key === '' ||
            newField.label === '' ||
            formMetaData.fields.findIndex(({ key }) => key === newField.key) !==
              -1
              ? 'disabled'
              : '')
          }
          onClick={addNewFieldHandler}
        >
          &#43;
        </span>
      </div>
    </div>
  );
};

export default DynamicFormEdit;
