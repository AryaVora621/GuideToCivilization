import { buildFullZip } from "@/lib/download";

export const dynamic = "force-static";

export async function GET() {
  const zip = await buildFullZip();
  return new Response(zip as BodyInit, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="guide-to-civilization-complete.zip"`,
    },
  });
}
