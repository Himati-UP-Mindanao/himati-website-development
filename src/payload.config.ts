// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { slateEditor } from "@payloadcms/richtext-slate";

import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { HimatiStaff } from "@/collections/HimatiStaff";
import Articles from "./collections/Articles";
import FeaturedPhoto from "./collections/FeaturedPhoto";
import ProfilePhoto from "./collections/ProfilePhoto";

// Uncomment this block to enable email sending
// import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
// import nodemailer from "nodemailer";

// import { Users } from "./collections/Users";
// import { Media } from "./collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: HimatiStaff.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  //   collections: [Users, Media],
  collections: [HimatiStaff, Articles, FeaturedPhoto, ProfilePhoto],
  editor: slateEditor({}),

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

  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.ENVIRONMENT === "cloud"
          ? process.env.DATABASE_URI
          : `postgres://postgres:${process.env.DATABASE_PASSWORD}@postgres:5432/postgres`,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
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
});
