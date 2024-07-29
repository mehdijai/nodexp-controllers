# NodeJS ExpressJS API with controllers pattern

Creating NodeJS/ExpressJS dummy API and implementing a basic controller pattern. The controllers are auth-detected.
This API includes some dummy endpoints and middleware to mimic an almost real-world behavior. We use decorators to add certain metadata and variables for the endpoints, like AuthGuard, Middlewares, HTTP Method, and route base URI.

The structure of the app:

- config folder: Handle the api config variables (API Prefix)
- controllers: Handle the controllers and endpoints
- decorators: The Controller decorators
- middlewares: Handle ExpressJS middlewares
- services: Handle services, Such as, Reflect Metadata, Prisma, Mail,...
- utils: Functions and classes tools
- app.ts: The Express App Handler
- server.ts: App main file.

**Note:**

To use the decorators with typescript, enable `experimentalDecorators` in `tsconfig.json`:

```json
{
    "compilerOptions": {
        ...
        "experimentalDecorators": true,
        ...
    }
}
```

## Full tutorial

For a detailed guide on creating and implementing these controllers, check out my article: [Create NodeJS/ExpressJS API using Controller Pattern](https://mehdijai.hashnode.dev/step-by-step-guide-to-creating-a-nodejsexpressjs-api-using-controller-pattern). In this article, I provide an in-depth explanation of the process and behavior of these controllers.
