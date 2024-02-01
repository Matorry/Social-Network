/* eslint-disable no-unused-vars */
import Hapi from "@hapi/hapi";
import { Repository } from "../repository/repository.js";

export abstract class Controller<T extends { id: string | number }> {
  protected repo: Repository<T>;

  constructor(repo: Repository<T>) {
    this.repo = repo;
  }

  async getAll(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const data = await this.repo.getAll();
      return h.response(data).code(200);
    } catch (error) {
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async get(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { id } = request.params;
      const data = await this.repo.get(id);
      return h.response(data).code(200);
    } catch (error) {
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async post(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const user = await this.repo.post(request.payload as Omit<T, "id">);
      return h.response(user).code(201);
    } catch (error) {
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async patch(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { id } = request.params;
      const user = await this.repo.patch(id, request.payload as Partial<T>);
      return h.response(user).code(200);
    } catch (error) {
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async delete(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      await this.repo.delete(request.params.id);
      return h.response().code(204);
    } catch (error) {
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  }
}
