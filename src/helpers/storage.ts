const save = (key: string, value: string): void => {
  try {
    const serializedState: string = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error: any) {
    console.error('Set state error: ', error.message);
  }
};

const load = (key: string): string | undefined => {
  try {
    const serializedState: string | null = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error: any) {
    console.error('Get state error: ', error.message);
  }
};

const storage = {
  save,
  load,
};

export default storage;