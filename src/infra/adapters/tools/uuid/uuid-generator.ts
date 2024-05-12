import { IUUIDGenerator } from '@/application/interfaces/usecases/uuid/uuid-generator.interface'
import { randomUUID } from 'crypto'

export class UUIDGeneratorAdapter implements IUUIDGenerator {
  generate (): string {
    return randomUUID()
  }
}
