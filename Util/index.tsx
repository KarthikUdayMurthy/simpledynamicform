export interface IRecord {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  age: number;
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

export const formMetaData: IFormMetaData = {
  title: 'User Information',
  fields: [
    {
      type: 'text',
      key: 'firstName',
      label: 'First Name',
      defaultValue: '',
    },
    {
      type: 'text',
      key: 'lastName',
      label: 'Last Name',
      defaultValue: '',
    },
    {
      type: 'text',
      key: 'city',
      label: 'City',
      defaultValue: '',
    },
    {
      type: 'number',
      key: 'age',
      label: 'Age',
      defaultValue: '',
    },
  ],
};

export const getRandomString = (length) => {
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

export const generateRandomRecord = (): IRecord => {
  return {
    id: getId(),
    firstName: getRandomString(8),
    lastName: getRandomString(8),
    city: getRandomString(8),
    age: Math.round(Math.random() * 100),
  };
};
