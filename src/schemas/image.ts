import { z } from 'zod'

export const ImageCreateSchemaBody = z.object({
  name: z.string(),
  size: z.number(),
  url: z.string(),
  key: z.string(),
  user_id: z.string().uuid(),
})

export const ImageIdSchemaParams = z.object({
  id: z.string().uuid(),
})
