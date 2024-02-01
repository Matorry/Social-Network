import { LoginData, User, UserNoId } from "../models/user";
import { Logged } from "../types/logged";
import { Repository } from "./repository";

export class ApiUsersRepository implements Repository<User> {
  urlBase: string;
  constructor(urlBase: string) {
    this.urlBase = urlBase;
  }
  async register(item: UserNoId): Promise<User> {
    const response = await fetch(this.urlBase + "/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async login(item: LoginData): Promise<Logged> {
    const response = await fetch(this.urlBase + "/login", {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }
}
