import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const alreadyRegisteredProduct = await this.productsRepository.findByName(
      name,
    );

    if (alreadyRegisteredProduct) {
      throw new AppError('Already registered product.');
    }

    const product = await this.productsRepository.create({
      name,
      quantity,
      price,
    });
    return product;
  }
}

export default CreateProductService;
