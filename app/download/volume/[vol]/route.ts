import { VOLUMES } from "@/lib/volumes";
import { buildVolumeZip } from "@/lib/download";

export const dynamic = "force-static";

export function generateStaticParams() {
  return VOLUMES.map((v) => ({ vol: v.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ vol: string }> },
) {
  const { vol } = await params;
  const volume = VOLUMES.find((v) => v.slug === vol);
  const zip = await buildVolumeZip(vol);
  if (!volume || !zip) return new Response("Not found", { status: 404 });

  const name = `vol-${String(volume.number).padStart(2, "0")}-${vol}.zip`;
  return new Response(zip as BodyInit, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${name}"`,
    },
  });
}
