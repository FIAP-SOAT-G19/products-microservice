import { IController } from '@/application/interfaces'
import { IGetProductsUseCase } from '@/application/interfaces/usecases/product/get-products.interface'
import { HttpResponse, success, serverError } from '@/infra/shared'

export class GetProductsController implements IController {
  constructor(private readonly getProductsUseCase: IGetProductsUseCase) {}
  async execute (): Promise<HttpResponse> {
    try {
      const products = await this.getProductsUseCase.execute()
      return success(200, products)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
