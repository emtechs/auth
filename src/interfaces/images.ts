import { z } from 'zod'
import { ImageCreateSchemaBody } from '../schemas'

export type IImageRequest = z.infer<typeof ImageCreateSchemaBody>
