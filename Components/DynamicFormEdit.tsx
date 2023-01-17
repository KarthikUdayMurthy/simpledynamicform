import * as React from 'react';
import Input from './Input';
import { IFormFieldMetaData, IFormMetaData } from '../Util';

export interface IDynamicFormEditProps {
  setFormMetaData: React.Dispatch<React.SetStateAction<IFormMetaData>>;
  formMetaData: IFormMetaData;
  onClose: () => void;
}

const DynamicFormEdit: React.FC<IDynamicFormEditProps> = ({
  setFormMetaData = () => {},
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
    setFormMetaData((formMetaData) => ({
      ...formMetaData,
      fields: [...formMetaData.fields, { ...newField }],
    }));
    setNewField({ key: '', label: '', type: 'text' });
  }, [setFormMetaData, newField]);

  const fieldChangeHandler = React.useCallback(
    (fieldKey: string, k: string, v: string) => {
      setFormMetaData((formMetaData) => ({
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
      }));
    },
    [setFormMetaData]
  );

  const deleteFieldHandler = React.useCallback(
    (fieldKey: string) => {
      setFormMetaData((formMetaData) => ({
        ...formMetaData,
        fields: formMetaData.fields.filter(({ key }) => key !== fieldKey),
      }));
    },
    [setFormMetaData]
  );

  const isAddDisabled =
    newField.key === '' ||
    newField.label === '' ||
    formMetaData.fields.findIndex(({ key }) => key === newField.key) !== -1;

  return (
    <div className="dynamicFormEditWrap">
      <h1>
        <Input
          label="Form Name"
          value={formMetaData.title}
          type="text"
          onChange={(v) =>
            setFormMetaData((formMetaData) => ({ ...formMetaData, title: v }))
          }
        />
        <span className="closeButton" onClick={onClose}>
          &#10004;&nbsp;Done
        </span>
      </h1>
      <div className="fieldsWrap scrollWrap">
        {formMetaData.fields.map((field) => (
          <div className="fieldWrap" key={field.key}>
            <span className="fieldKeyWrap">
              &#10096;&nbsp;{field.key}&nbsp;&#10097;
            </span>
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
              onChange={(v) => fieldChangeHandler(field.key, 'defaultValue', v)}
            />
            <span
              className="deleteButton"
              onClick={() => deleteFieldHandler(field.key)}
            >
              &#10006;
            </span>
          </div>
        ))}
      </div>
      <div className="addFieldWrap">
        <span className="addFieldCaption">
          Add new field&nbsp;&#10010;&nbsp;
        </span>
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
              'typeButton ' + (newField.type === 'text' ? 'active' : '')
            }
            onClick={() => {
              newFieldChangeHandler('type', 'text');
            }}
          >
            ab
          </span>
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
        </span>

        <span
          className={'addButton ' + (isAddDisabled ? 'disabled' : '')}
          onClick={isAddDisabled ? undefined : addNewFieldHandler}
        >
          &#43;
        </span>
      </div>
    </div>
  );
};

export default DynamicFormEdit;
