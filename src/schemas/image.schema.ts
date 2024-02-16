import { z } from 'zod'

export const ImageIdSchemaParams = z.object({
  id: z.string().uuid(),
})
