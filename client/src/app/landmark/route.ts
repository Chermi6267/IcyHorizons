import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    revalidateTag("landmarks");

    return NextResponse.json({ revalidated: true });
  } catch (error: any) {
    return NextResponse.json({ revalidated: false, error: error.message });
  }
}
