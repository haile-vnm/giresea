import { APP_CODE } from './constant';

type AppFields = 'github-personal-token';

const getAppKey = (key: AppFields) => `${APP_CODE}_${key}`;

export const setField = (key: AppFields, value: string) => {
  localStorage.setItem(getAppKey(key), value);
};

export const removeField = (key: AppFields) => {
  localStorage.removeItem(getAppKey(key));
};

export const getField = (key: AppFields) =>
  localStorage.getItem(getAppKey(key));

export const getNumberField = (key: AppFields) => Number(getField(key));
