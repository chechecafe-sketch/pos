import { useEffect, useMemo, useState } from "react";
import qrcode from "qrcode-generator";

// Ticket virtual: el POS genera un QR; el cliente lo escanea con su celular,
// se abre una página con su ticket (logo, consumo, total e indicaciones para
// facturar) y puede bajarlo como imagen. No usa base de datos: los datos del
// ticket viajan dentro de la propia liga del QR (no incluyen datos personales).

export const INVOICE_EMAIL = "facturacion.cheche@gmail.com";
const LOGO_URL = "/cheche-logo.png";

// ── Codificación de la liga ──────────────────────────────
function toB64Url(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64Url(b64) {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(b64.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

// data: { s: sucursal, d: fecha, h: hora, m: mesa, md: modo, i: [[qty, nombre, importe]],
//         x: descuento ($), l: etiqueta descuento, t: total }
export function ticketUrl(data) {
  return `${window.location.origin}/?ticket=${toB64Url(JSON.stringify(data))}`;
}

export function readTicketFromLocation() {
  try {
    const p = new URLSearchParams(window.location.search).get("ticket");
    return p ? fromB64Url(p) : null;
  } catch {
    return null;
  }
}

const money = (n) => `$${Number(n || 0).toFixed(0)}`;

// ── Imagen del ticket (canvas → PNG) ─────────────────────
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function wrapText(ctx, text, maxWidth) {
  const words = String(text).split(" ");
  const lines = [];
  let line = "";
  words.forEach((w) => {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  });
  if (line) lines.push(line);
  return lines;
}

async function renderTicketPng(t) {
  const W = 800;
  const pad = 56;
  const mono = "'DM Mono', ui-monospace, Menlo, 'Courier New', monospace";
  const logo = await loadImage(LOGO_URL).catch(() => null);

  // Primera pasada para medir la altura; segunda para dibujar.
  const measure = document.createElement("canvas").getContext("2d");
  measure.font = `30px ${mono}`;
  const itemLines = (t.i || []).map(([q, n, amt]) => ({
    lines: wrapText(measure, `${q}x ${n}`, W - pad * 2 - 170),
    amt,
  }));
  const itemsH = itemLines.reduce((s, it) => s + it.lines.length * 42 + 8, 0);
  const logoH = logo ? 280 : 0;
  const H = pad + logoH + 150 + itemsH + (t.x > 0 ? 60 : 0) + 130 + 270 + pad;

  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "alphabetic";

  let y = pad;
  if (logo) {
    const lw = 373;
    ctx.drawImage(logo, (W - lw) / 2, y, lw, 280);
    y += logoH;
  }
  ctx.textAlign = "center";
  ctx.font = `600 34px ${mono}`;
  ctx.fillText(t.s || "", W / 2, y + 30);
  ctx.font = `26px ${mono}`;
  ctx.fillStyle = "#b9b9b9";
  ctx.fillText(`${t.d || ""}  ${t.h || ""}`, W / 2, y + 74);
  ctx.fillText(`Mesa ${t.m || ""} · ${t.md === "takeout" ? "Para llevar" : "Salón"}`, W / 2, y + 112);
  y += 150;

  const rule = () => {
    ctx.strokeStyle = "#555";
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(W - pad, y);
    ctx.stroke();
    ctx.setLineDash([]);
  };
  rule();
  y += 20;

  ctx.textAlign = "left";
  ctx.font = `30px ${mono}`;
  itemLines.forEach((it) => {
    ctx.fillStyle = "#fff";
    it.lines.forEach((ln, idx) => {
      y += 42;
      ctx.textAlign = "left";
      ctx.fillText(ln, pad, y);
      if (idx === 0) {
        ctx.textAlign = "right";
        ctx.fillText(money(it.amt), W - pad, y);
      }
    });
    y += 8;
  });
  y += 12;
  rule();
  y += 20;

  if (t.x > 0) {
    ctx.font = `28px ${mono}`;
    ctx.fillStyle = "#b9b9b9";
    ctx.textAlign = "left";
    ctx.fillText(t.l ? `Descuento ${t.l}` : "Descuento", pad, y + 36);
    ctx.textAlign = "right";
    ctx.fillText(`-${money(t.x)}`, W - pad, y + 36);
    y += 60;
  }

  ctx.fillStyle = "#fff";
  ctx.font = `700 46px ${mono}`;
  ctx.textAlign = "left";
  ctx.fillText("TOTAL", pad, y + 56);
  ctx.textAlign = "right";
  ctx.fillText(money(t.t), W - pad, y + 56);
  y += 90;
  rule();
  y += 56;

  ctx.textAlign = "center";
  ctx.font = `600 30px ${mono}`;
  ctx.fillText("¡Gracias por su visita!", W / 2, y);
  y += 64;
  ctx.font = `26px ${mono}`;
  ctx.fillStyle = "#b9b9b9";
  ["¿Necesitas factura?", "Envía tus datos fiscales y esta", "imagen al correo:"].forEach((ln, idx) => {
    ctx.fillText(ln, W / 2, y + idx * 38);
  });
  y += 3 * 38 + 14;
  ctx.fillStyle = "#fff";
  ctx.font = `600 29px ${mono}`;
  ctx.fillText(INVOICE_EMAIL, W / 2, y);

  return c.toDataURL("image/png");
}

// ── Página que ve el cliente en su celular ───────────────
export function VirtualTicketPage({ ticket }) {
  const [png, setPng] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    document.title = "Ticket · Che' Che' Café";
    document.body.style.cssText = "margin:0;background:#000;";
    renderTicketPng(ticket).then(setPng).catch(() => setErr(true));
  }, [ticket]);

  const fileName = `ticket-chechecafe-${String(ticket.d || "").replace(/\//g, "-")}.png`;
  const btn = {
    display: "block", width: "100%", boxSizing: "border-box", textAlign: "center",
    padding: "15px 18px", borderRadius: 12, fontSize: 16, fontWeight: 600,
    textDecoration: "none", border: "1px solid #fff", fontFamily: "system-ui, sans-serif",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px 40px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {png ? (
          <img src={png} alt="Ticket Che Che Café" style={{ width: "100%", height: "auto", display: "block", borderRadius: 8 }} />
        ) : (
          <p style={{ textAlign: "center", color: "#aaa", marginTop: 60 }}>{err ? "No se pudo cargar el ticket." : "Cargando tu ticket…"}</p>
        )}
        {png && (
          <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
            <a href={png} download={fileName} style={{ ...btn, background: "#fff", color: "#000" }}>⬇️ Descargar ticket</a>
            <a
              href={`mailto:${INVOICE_EMAIL}?subject=${encodeURIComponent("Solicitud de factura")}`}
              style={{ ...btn, background: "transparent", color: "#fff" }}
            >
              🧾 Pedir factura
            </a>
            <p style={{ color: "#888", fontSize: 13, textAlign: "center", margin: "4px 0 0" }}>
              Si no se descarga, mantén presionada la imagen y elige “Guardar en Fotos”.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Modal del POS: muestra el QR para que el cliente lo escanee ──
export function VirtualTicketModal({ data, onClose }) {
  const { svg, url, tooLong } = useMemo(() => {
    try {
      const u = ticketUrl(data);
      const qr = qrcode(0, "L");
      qr.addData(u);
      qr.make();
      return { url: u, svg: qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true }), tooLong: false };
    } catch {
      return { url: "", svg: "", tooLong: true };
    }
  }, [data]);

  return (
    <div className="ov" onClick={onClose}>
      <div className="mod" onClick={(e) => e.stopPropagation()} style={{ alignItems: "center", textAlign: "center" }}>
        <div className="mdrag" />
        <h2>📱 Ticket virtual</h2>
        <p className="msub">Total {money(data.t)} · pídele al cliente que escanee con la cámara de su celular</p>
        {tooLong ? (
          <p className="msub">La cuenta es muy larga para un QR. Usa el ticket impreso.</p>
        ) : (
          <div
            style={{ background: "#fff", padding: 12, borderRadius: 12, width: "min(320px, 80vw)", lineHeight: 0 }}
            dangerouslySetInnerHTML={{ __html: svg }}
            data-url={url}
          />
        )}
        <div className="mbtns" style={{ width: "100%" }}>
          <button className="mb p" onClick={onClose}>Listo</button>
        </div>
      </div>
    </div>
  );
}
