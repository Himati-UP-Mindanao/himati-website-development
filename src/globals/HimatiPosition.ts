import { GlobalConfig } from 'payload'

export const HimatiPosition: GlobalConfig = {
  slug: 'himati-position',
  fields: [
    {
      name: 'item',
      type: 'array',
      fields: [
        {
          name: 'position',
          type: 'text',
        }
      ]
    }
  ],
}