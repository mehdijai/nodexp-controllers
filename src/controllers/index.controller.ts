import { Request, Response, NextFunction } from 'express';
import { AuthGuard, BaseController, Controller, Get } from '@/decorators/controller.decorator';

@Controller('Customer', 'v1', '/')
export default class CustomerController extends BaseController {
  @Get('/')
  public async getApiStatus(_: Request, response: Response, next: NextFunction) {
    try {
      response.status(200).json({
        name: 'API',
        version: '1.0.0',
        status: 'RUNNING',
      });
    } catch (err) {
      next(err);
    }
  }
  @AuthGuard()
  @Get('/protected')
  public async getProtectedApiStatus(_: Request, response: Response, next: NextFunction) {
    try {
      response.status(200).json({
        name: 'API',
        secure: true,
        version: '1.0.0',
        status: 'RUNNING',
      });
    } catch (err) {
      next(err);
    }
  }
}
