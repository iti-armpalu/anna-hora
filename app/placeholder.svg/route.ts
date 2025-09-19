import { NextResponse } from "next/server";

function escapeXML(s = "") {
    return s.replace(/[<>&"']/g, (c) => ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
    }[c]!));
}

export function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const width = parseInt(searchParams.get("width") ?? searchParams.get("w") ?? "600", 10);
    const height = parseInt(searchParams.get("height") ?? searchParams.get("h") ?? "400", 10);
    const bg = searchParams.get("bg") ?? "#e5e7eb";   // background colour (optional)
    const fg = searchParams.get("fg") ?? "#111827";   // text colour (optional)
    const text = searchParams.get("text") ?? `${width}×${height}`;

    const fontSize = Math.round(Math.min(width, height) / 12);

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
        font-size="${fontSize}" fill="${fg}">
    ${escapeXML(text)}
  </text>
</svg>`.trim();

    return new NextResponse(svg, {
        headers: {
            "Content-Type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
