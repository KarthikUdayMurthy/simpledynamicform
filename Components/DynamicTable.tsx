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
  const scrollRef = React.useRef<HTMLDivElement>();

  const [addExtraPadding, setAddExtraPadding] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const hasOverflowingChildren =
        element.offsetHeight < element.scrollHeight ||
        element.offsetWidth < element.scrollWidth;
      setAddExtraPadding(!hasOverflowingChildren);
    }
  }, [scrollRef, records]);

  return (
    <div
      className={'dynamicTableWrap ' + (addExtraPadding ? ' extraPadding' : '')}
    >
      <div className="dynamicTableInnerWrap scrollWrap" ref={scrollRef}>
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
    </div>
  );
};

export default DynamicTable;
