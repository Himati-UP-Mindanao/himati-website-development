// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

// Uncomment this block to enable email sending
// import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
// import nodemailer from "nodemailer";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),

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
        process.env.ENVIRONMENT === "development"
          ? process.env.DATABASE_URI
          : `postgres://postgres:${process.env.DATABASE_PASSWORD}@postgres:5432/postgres`,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
