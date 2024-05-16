import { Router } from 'express'
import { expressAdapter } from '../adapters/tools/http/express.adapter'
import { makeCreateProductController } from '../factories/controllers/create-product-controller.factory'
import { makeDeleteProductController } from '../factories/controllers/delete-product-controller.factory'
import { makeGetProductByCategoryController } from '../factories/controllers/get-product-by-category-controller.factory'
import { makeGetProductController } from '../factories/controllers/get-product-controller.factory'
import { makeGetProductsController } from '../factories/controllers/get-products-controller.factory'
import { makeHealthcheckController } from '../factories/controllers/healthcheck-controller.factory'
import { makeUpdateProductController } from '../factories/controllers/update-product-controller.factory'
import { selectProductsRoute } from '../middleware/select-products-route'
import { makeLivenessProbeController } from '../factories/controllers/liveness-controller.factory'
import { makeReadinessProbeController } from '../factories/controllers/readiness-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))
router.get('/livenessProbe', expressAdapter(makeLivenessProbeController()))
router.get('/readinessProbe', expressAdapter(makeReadinessProbeController()))

// Products
const getProductsController = selectProductsRoute(makeGetProductByCategoryController(), makeGetProductsController())
router.get('/products', getProductsController)
router.post('/products', expressAdapter(makeCreateProductController()))
router.get('/products/:productId', expressAdapter(makeGetProductController()))
router.patch('/products/:productId', expressAdapter(makeUpdateProductController()))
router.delete('/products/:productId', expressAdapter(makeDeleteProductController()))

export { router }
