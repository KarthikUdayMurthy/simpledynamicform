import * as React from 'react';
import { IFormMetaData, IRecord } from '../Util';

export interface IDynamicTableProps {
  records: IRecord[];
  onDelete: (record: IRecord) => void;
  formMetaData: IFormMetaData;
}

const DynamicTable: React.FC<IDynamicTableProps> = ({
  records = [],
  onDelete = () => {},
  formMetaData,
}) => {
  return (
    <div className="dynamicTableWrap scrollWrap">
      {records.length > 0 && (
        <table className="dataDisplay">
          <thead>
            <tr>
              {formMetaData.fields.map((field) => (
                <th key={field.key}>{field.label}</th>
              ))}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              return (
                <tr key={record.id}>
                  {formMetaData.fields.map((field) => (
                    <td key={`${record.id}${field.key}`}>
                      {record[field.key]}
                    </td>
                  ))}
                  <td>
                    <button className="b2" onClick={() => onDelete(record)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DynamicTable;
