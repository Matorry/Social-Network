import { LoginData } from '../models/user';
import { Logged } from '../types/logged';

export interface Repository<X extends { id: string | number }> {
  getAll?(token: string): Promise<X[]>;
  getById?(id: X['id'], token: string): Promise<X>;
  register?(newData: Omit<X, 'id'>): Promise<X>;
  create?(newData: Omit<X, 'id'>, token: string): Promise<X>;
  update?(newData: Partial<X>, id: string, token: string): Promise<X>;
  delete?(id: string, token: string): Promise<void>;
  login?(data: LoginData): Promise<Logged>;
}
