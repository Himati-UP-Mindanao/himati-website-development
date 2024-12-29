import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { slateEditor } from '@payloadcms/richtext-slate'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { HimatiStaff } from './collections/HimatiStaff'
import Articles from './collections/Articles'
import FeaturedPhoto from './collections/FeaturedPhoto'
import ProfilePhoto from './collections/ProfilePhoto'

import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: HimatiStaff.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [HimatiStaff, Articles, FeaturedPhoto, ProfilePhoto],
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  cors: [getServerSideURL()].filter(Boolean),

  // Uncomment this block to enable email sending
  // email: nodemailerAdapter({
  //   defaultFromAddress: "himati.upmin@up.edu.ph",
  //   defaultFromName: "Himati UPMin CMS",
  //   transport: nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   }),
  // }),

  plugins: [
    vercelBlobStorage({
      enabled: process.env.ENVIRONMENT === "cloud",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        // media: true,
        "featured-photo": true,
        // "profile-photo": true,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
