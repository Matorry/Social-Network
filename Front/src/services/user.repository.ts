import { LoginData, User, UserNoId } from '../models/user';
import { Logged } from '../types/logged';
import { Repository } from './repository';

export class ApiUsersRepository implements Repository<User> {
  urlBase: string;

  constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  async register(item: UserNoId): Promise<User> {
    const response = await fetch(`${this.urlBase}/register`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async login(item: LoginData): Promise<Logged> {
    const response = await fetch(`${this.urlBase}/login`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async update(
    newData: Partial<User>,
    id: string,
    token: string
  ): Promise<User> {
    const response = await fetch(`${this.urlBase}/user/patch/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async delete(id: string, token: string): Promise<string> {
    const response = await fetch(`${this.urlBase}/user/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    return id;
  }

  async getByUsername(userName: string, token: string): Promise<User> {
    const response = await fetch(`${this.urlBase}/user/search/${userName}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async follow(user: User, id: string, token: string): Promise<User> {
    const response = await fetch(`${this.urlBase}/user/follow/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(user.id),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async unfollow(user: User, id: string, token: string): Promise<User> {
    const response = await fetch(`${this.urlBase}/user/unfollow/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(user.id),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async getById(id: string, token: string): Promise<User> {
    const response = await fetch(`${this.urlBase}/user/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async uploadImg(
    formData: FormData,
    token: string,
    id: string
  ): Promise<User> {
    console.log(formData);
    const response = await fetch(`${this.urlBase}/upload-image/${id}`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }
}
