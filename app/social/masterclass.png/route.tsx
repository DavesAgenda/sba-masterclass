import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/images/valid-agenda-white.svg"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b304b", color: "#f8f9f7", padding: "56px 60px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
        <div style={{ display: "flex", color: "#f48847", fontSize: 22, letterSpacing: 4, fontWeight: 700 }}>SITES BY AGENTS</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 68, lineHeight: 1.06, fontWeight: 700, marginTop: 30 }}><span>Build a website.</span><span>Let AI do the</span><span>technical work.</span></div>
        <div style={{ display: "flex", fontSize: 25, lineHeight: 1.4, color: "#b9d6e6", marginTop: 25 }}>The masterclass & step-by-step field guide</div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "auto", gap: 24 }}>
          {/* The original logo geometry is preserved in the requested white variant. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${logo.toString("base64")}`} width={154} height={55} alt="Valid Agenda" />
          <div style={{ display: "flex", height: 30, width: 1, background: "#426582" }} />
          <div style={{ display: "flex", fontSize: 20, color: "#b9d6e6" }}>sitesbyagents.com</div>
        </div>
      </div>
      <div style={{ display: "flex", position: "absolute", right: 56, top: 111, width: 370, height: 390, transform: "rotate(5deg)", background: "#f8f9f7", color: "#0d3153", borderRadius: 5, borderBottom: "12px solid #c9d2d3", boxShadow: "14px 18px 0 #08253b" }}>
        <div style={{ display: "flex", width: 24, background: "#dbe4e4", borderRight: "2px solid #c3cdce" }} />
        <div style={{ display: "flex", flexDirection: "column", padding: "32px 28px", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 15, letterSpacing: 3, color: "#426582" }}>THE PRACTICAL GUIDE</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 43, lineHeight: 1.1, fontWeight: 700, marginTop: 28 }}><span>From idea</span><span>to live site.</span></div>
          <div style={{ display: "flex", width: 62, height: 6, background: "#f48847", marginTop: 26, marginBottom: 22 }} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 21, lineHeight: 1.5 }}><span>Plan. Build. Publish.</span><span>No coding required.</span></div>
          <div style={{ display: "flex", marginTop: "auto", fontSize: 16, color: "#426582" }}>WATCH • READ • TRY IT</div>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
