import * as React from 'react';
import { IRecord } from '../Util';

export interface IDynamicTableProps {
  records: IRecord[];
  onDelete: (record: IRecord) => void;
}

const DynamicTable: React.FC<IDynamicTableProps> = ({
  records = [],
  onDelete = () => {},
}) => {
  return (
    <div className="dynamicTableWrap scrollWrap">
      {records.length > 0 && (
        <table className="dataDisplay">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Age</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              return (
                <tr key={record.id}>
                  <td>{record.firstName}</td>
                  <td>{record.lastName}</td>
                  <td>{record.city}</td>
                  <td>{record.age}</td>
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
