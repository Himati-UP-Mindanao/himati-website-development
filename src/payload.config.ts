import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { slateEditor } from '@payloadcms/richtext-slate'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { HimatiUsers } from './collections/HimatiUsers'
import Articles from './collections/Articles'
import FeaturedPhoto from './collections/FeaturedPhoto'
import ProfilePhoto from './collections/ProfilePhoto'
import { Pages } from './collections/Pages'


import { getServerSideURL } from './utilities/getURL'

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import { Newsletter } from './collections/Newsletter'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: HimatiUsers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [HimatiUsers, Articles, FeaturedPhoto, ProfilePhoto, Pages, Newsletter],
  globals: [],
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  cors: [getServerSideURL()].filter(Boolean),
  email: nodemailerAdapter({
    defaultFromAddress: "himati.upmin@up.edu.ph",
    defaultFromName: "Himati UPMin CMS",
    transport: nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
  }),
  plugins: [
    vercelBlobStorage({
      enabled: process.env.ENVIRONMENT === "cloud",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        // media: true,
        "featured-photo": true,
        "profile-photo": true,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
