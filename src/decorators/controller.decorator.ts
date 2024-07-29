import { Router, Express, RequestHandler } from 'express';
import { authenticateJWT } from '@/middlewares/auth.middleware';
import MetadataService from '@/services/metadata.service';
import apiConfig from '@/config/api.config';

interface Route {
  path: string;
  methodName: string;
  middlewares: RequestHandler[];
  method: 'get' | 'post' | 'patch' | 'put' | 'delete';
}

function HTTPMethodDecorator(route: Route) {
  // Get existing routes or create an empty array
  const existingRoutes: Route[] = MetadataService.get('routes') || [];

  // Store the path and method information
  existingRoutes.push(route);

  // Update the metadata with the combined routes
  MetadataService.set('routes', existingRoutes);
}

// Decorator for defining Express GET routes
export function Get(path: string, middlewares: RequestHandler[] = []) {
  return function (_: Object, propertyKey: string) {
    HTTPMethodDecorator({ path, methodName: propertyKey, method: 'get', middlewares });
  };
}
// Decorator for defining Express POST routes
export function Post(path: string, middlewares: RequestHandler[] = []) {
  return function (_: Object, propertyKey: string) {
    HTTPMethodDecorator({ path, methodName: propertyKey, method: 'post', middlewares });
  };
}
// Decorator for defining Express PATCH routes
export function Patch(path: string, middlewares: RequestHandler[] = []) {
  return function (_: Object, propertyKey: string) {
    HTTPMethodDecorator({ path, methodName: propertyKey, method: 'patch', middlewares });
  };
}
// Decorator for defining Express PUT routes
export function Put(path: string, middlewares: RequestHandler[] = []) {
  return function (_: Object, propertyKey: string) {
    HTTPMethodDecorator({ path, methodName: propertyKey, method: 'put', middlewares });
  };
}
// Decorator for defining Express DELETE routes
export function Delete(path: string, middlewares: RequestHandler[] = []) {
  return function (_: Object, propertyKey: string) {
    HTTPMethodDecorator({ path, methodName: propertyKey, method: 'delete', middlewares });
  };
}

// Decorator for Authentication Middleware
export function AuthGuard() {
  return function (_: Object, propertyKey: string) {
    const existingRoutes: Route[] = MetadataService.get('routes') || [];
    const match = existingRoutes.find((route) => route.methodName === propertyKey);

    if (match) {
      match.middlewares.unshift(authenticateJWT);
    }
    MetadataService.set('routes', existingRoutes);
  };
}

export function Controller(_: string, version?: string, prefix?: string) {
  return function (target: Function) {
    Reflect.defineMetadata('prefix', prefix ?? '', target);
    Reflect.defineMetadata('version', version ?? '', target);
  };
}

// Base Controller class
export class BaseController {
  private router = Router();
  public _registerRoutes(app: Express, controllerClass: any) {
    // Get routes defined on the class
    const routes: Route[] = MetadataService.get('routes') || [];

    const prefix = Reflect.getMetadata('prefix', controllerClass.constructor) || '';
    const version = Reflect.getMetadata('version', controllerClass.constructor) || '';

    if (!routes) return;

    // Loop through routes and register them with Express
    routes.forEach((route: Route) => {
      if (route.methodName in controllerClass) {
        const handler: Function = controllerClass[route.methodName as keyof typeof controllerClass];
        this.router[route.method](route.path, ...route.middlewares, handler.bind(controllerClass));
      }
    });

    app.use(apiConfig.prefix + '/' + version + prefix, this.router);
  }
}
