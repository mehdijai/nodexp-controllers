import { Request, Response, NextFunction } from 'express';
import {
  AuthGuard,
  BaseController,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@/decorators/controller.decorator';

@Controller('Customer', 'v1', '/customers')
export default class CustomerController extends BaseController {
  @Get('/')
  public async getCustomers(_: Request, response: Response, next: NextFunction) {
    try {
      response.status(200).json({ message: 'Customer list' });
    } catch (err) {
      next(err);
    }
  }

  @AuthGuard()
  @Get('/protected')
  public async getProtectedCustomers(_: Request, response: Response, next: NextFunction) {
    try {
      response.status(200).json({ message: 'Protected Customer list' });
    } catch (err) {
      next(err);
    }
  }

  @AuthGuard()
  @Get('/:id')
  public async getCustomer(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(200).json({ message: 'Customer id ' + request.params.id });
    } catch (err) {
      next(err);
    }
  }

  @AuthGuard()
  @Post('/')
  public async createCustomer(_: Request, response: Response, next: NextFunction) {
    try {
      response.status(201).json({ message: 'Customer created' });
    } catch (err) {
      next(err);
    }
  }

  @AuthGuard()
  @Put('/')
  public async updateCustomer(_: Request, response: Response, next: NextFunction) {
    try {
      response.status(201).json({ message: 'Customer updated' });
    } catch (err) {
      next(err);
    }
  }

  @AuthGuard()
  @Delete('/')
  public async deleteCustomer(_: Request, response: Response, next: NextFunction) {
    try {
      response.status(201).json({ message: 'Customer deleted' });
    } catch (err) {
      next(err);
    }
  }
}
