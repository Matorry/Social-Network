/* eslint-disable no-unused-vars */
import { Request, ResponseToolkit } from "@hapi/hapi";
import { Auth } from "../services/auth.js";
export class AuthInterceptor {
  async authentication(request: Request, h: ResponseToolkit) {
    try {
      const token = request.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token provided");
      }

      const payload = Auth.verifyTokenGettingPayload(token);
      request.auth.credentials = payload;

      return h.continue;
    } catch (error) {
      return h.response({ error: "Invalid token" }).code(401);
    }
  }

  async authorization(request: Request, h: ResponseToolkit) {
    try {
      const token = request.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token provided");
      }

      const { id } = Auth.verifyTokenGettingPayload(token);

      request.plugins = { validatedId: id };

      return h.continue;
    } catch (error) {
      return h.response({ error: "Invalid token" }).code(401);
    }
  }
}
