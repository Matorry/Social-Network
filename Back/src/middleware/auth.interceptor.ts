/* eslint-disable no-unused-vars */
import { Request, ResponseToolkit } from "@hapi/hapi";
import { Auth } from "../services/auth.js";
export class AuthInterceptor {
  async authentication(request: Request, response: ResponseToolkit) {
    try {
      const token = request.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token provided");
      }

      const payload = Auth.verifyTokenGettingPayload(token);
      request.auth.credentials = payload;

      return response.continue;
    } catch (error) {
      return response.response({ error: "Invalid token" }).code(401);
    }
  }

  async authorization(request: Request, response: ResponseToolkit) {
    try {
      const token = request.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token provided");
      }

      const { id } = Auth.verifyTokenGettingPayload(token);

      request.plugins = { validatedId: id };

      return response.continue;
    } catch (error) {
      return response.response({ error: "Invalid token" }).code(401);
    }
  }
}
