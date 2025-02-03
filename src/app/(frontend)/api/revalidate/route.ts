import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: {secret: string, slug: string} = await req.json();
  const slug = body.slug;

  if (body.secret !== process.env.REVALIDATION_SECRET) {
    console.log("Invalid secret");
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // Revalidate pages
  revalidateTag(slug)
  console.log("Revalidation triggered");
  return NextResponse.json({ message: "Revalidation triggered", date: Date.now() }, { status: 200, });
}
