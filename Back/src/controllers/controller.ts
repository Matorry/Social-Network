/* eslint-disable no-unused-vars */
import { Request, ResponseToolkit } from "@hapi/hapi";
import { Repository } from "../repository/repository.js";

export abstract class Controller<T extends { id: string | number }> {
  protected repo: Repository<T>;

  constructor(repo: Repository<T>) {
    this.repo = repo;
  }

  async getAll(request: Request, response: ResponseToolkit) {
    try {
      const data = await this.repo.getAll();
      return response.response(data).code(200);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async get(request: Request, response: ResponseToolkit) {
    try {
      const { id } = request.params;
      const data = await this.repo.get(id);
      return response.response(data).code(200);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async post(request: Request, response: ResponseToolkit) {
    try {
      const user = await this.repo.post(request.payload as Omit<T, "id">);
      return response.response(user).code(201);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async patch(request: Request, response: ResponseToolkit) {
    try {
      const { id } = request.params;
      const data = await this.repo.patch(id, request.payload as Partial<T>);
      return response.response(data).code(200);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async delete(request: Request, response: ResponseToolkit) {
    try {
      await this.repo.delete(request.params.id);
      return response.response().code(204);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }
}
