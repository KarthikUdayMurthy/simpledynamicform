import * as data from './formMetaData.json';

export const formMetaData = data;

export interface IRecord {
  id: string;
  [index: string]: string | number;
}

export interface IFormFieldMetaData {
  type: 'text' | 'number';
  key: string;
  label: string;
  defaultValue?: string;
}

export interface IFormMetaData {
  title: string;
  fields: IFormFieldMetaData[];
}

export const getRandomString = (length = 8) => {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getId = (): string => {
  return `${getRandomString(4)}_${new Date().valueOf()}`;
};

export const generateRandomRecord = (
  fields: IFormFieldMetaData[] = []
): IRecord => {
  const randomRecord: IRecord = {
    id: getId(),
  };

  fields.forEach((field) => {
    randomRecord[field.key] =
      field.type === 'text'
        ? getRandomString()
        : Math.round(Math.random() * 100);
  });

  return randomRecord;
};
