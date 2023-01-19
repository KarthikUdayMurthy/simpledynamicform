import * as React from 'react';
import { IFormMetaData, IRecord } from '../Util';

export interface IDynamicTableProps {
  records: IRecord[];
  onDelete: (record: IRecord) => void;
  onDeleteAll: () => void;
  formMetaData: IFormMetaData;
  isSmall: boolean;
}

export enum SortDirection {
  Ascending = 1,
  Descending = 2,
}

export interface ISortedKey {
  [index: string]: SortDirection;
}

const DynamicTable: React.FC<IDynamicTableProps> = ({
  records = [],
  onDelete = () => {},
  onDeleteAll = () => {},
  formMetaData,
  isSmall = false,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>();

  const [addExtraPadding, setAddExtraPadding] = React.useState<boolean>(false);
  const [sortedRecords, setSortedRecords] = React.useState<IRecord[]>(records);
  const [sortedKey, setSortedKey] = React.useState<ISortedKey>({});

  React.useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const hasOverflowingChildren =
        element.offsetHeight < element.scrollHeight ||
        element.offsetWidth < element.scrollWidth;
      setAddExtraPadding(!hasOverflowingChildren);
    }
  }, [scrollRef, records]);

  React.useEffect(() => {
    if (Object.keys(sortedKey).length === 0) {
      setSortedRecords(records);
    } else {
      const fieldKey = Object.keys(sortedKey)[0];
      const sortDirection = sortedKey[fieldKey];

      const tempRecords = records.slice();
      tempRecords.sort((a, b) => {
        if (a[fieldKey] < b[fieldKey]) {
          return sortDirection === SortDirection.Descending ? 1 : -1;
        } else if (a[fieldKey] > b[fieldKey]) {
          return sortDirection === SortDirection.Descending ? -1 : 1;
        }
        return 0;
      });

      setSortedRecords(tempRecords);
    }
  }, [sortedKey, records]);

  const toggleSort = React.useCallback(
    (fieldKey: string) => {
      if (sortedKey[fieldKey] === SortDirection.Descending) {
        setSortedKey({});
        return;
      }

      let newSortDirection: SortDirection = SortDirection.Ascending;

      if (sortedKey[fieldKey] === SortDirection.Ascending) {
        newSortDirection = SortDirection.Descending;
      }

      setSortedKey({ [fieldKey]: newSortDirection });
    },
    [sortedKey]
  );

  return (
    <div
      className={
        'dynamicTableWrap ' +
        (addExtraPadding ? ' extraPadding' : '') +
        (isSmall ? ' small' : '')
      }
    >
      <div className="dynamicTableInnerWrap scrollWrap" ref={scrollRef}>
        {sortedRecords.length > 0 ? (
          <table className="dataDisplay">
            <caption>
              &#9783; {formMetaData.title} ({sortedRecords.length})
            </caption>
            <thead>
              <tr>
                {formMetaData.fields.map((field) => (
                  <th
                    key={field.key}
                    className="sortableHeader"
                    onClick={() => toggleSort(field.key)}
                  >
                    {field.label}
                    <span
                      className={
                        'sortIcon ' + (sortedKey[field.key] ? ' visible' : '')
                      }
                    >
                      {sortedKey[field.key] === SortDirection.Ascending
                        ? String.fromCharCode(8681)
                        : String.fromCharCode(8679)}
                    </span>
                  </th>
                ))}
                <th className="deleteAllHeader" onClick={onDeleteAll}>
                  Delete All
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.map((record) => {
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
        ) : (
          <div className="noDataText">{formMetaData.title} - No Data</div>
        )}
      </div>
    </div>
  );
};

export default DynamicTable;
