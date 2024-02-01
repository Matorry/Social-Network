/* eslint-disable no-unused-vars */
export interface Repository<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T>;
  post(newData: Omit<T, "id">): Promise<T>;
  patch(id: string, newData: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  search({ key, value }: { key: string; value: unknown }): Promise<T[]>;
}
