import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate-all`);
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
