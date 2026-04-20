"use client";

import { MATERIA_ICONS } from "./materia-icons"; // We'll extract this simple map too
import type { MateriaContenido, BloqueContenido } from "@/data/content-types";

interface DownloadPdfButtonProps {
    slug: string;
    materia: MateriaContenido;
    bloque: BloqueContenido;
    gradoNombre: string;
    enClase: string[];
}

export default function DownloadPdfButton({ slug, materia, bloque, gradoNombre, enClase }: DownloadPdfButtonProps) {
    const gm = bloque.guiaMaestro;

    return (
        <button onClick={() => {
            const w = window.open('', '_blank', 'width=800,height=900');
            if (!w) return;
            w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ficha - ${bloque.nombre}</title>
            <style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;color:#1E293B;padding:0 1rem}
            h1{font-size:1.4rem;border-bottom:3px solid ${materia.color};padding-bottom:0.5rem;color:${materia.color}}
            h2{font-size:1rem;margin:1.2rem 0 0.4rem;color:#334155}
            .badge{display:inline-block;background:#F1F5F9;padding:0.2rem 0.5rem;border-radius:0.3rem;font-size:0.8rem;margin:0.15rem}
            .box{background:#F8FAFC;border-left:3px solid ${materia.color};padding:0.6rem 0.8rem;border-radius:0 0.4rem 0.4rem 0;margin:0.5rem 0}
            ul{margin:0.3rem 0;padding-left:1.2rem}li{margin:0.2rem 0;font-size:0.9rem}
            .meta{color:#64748B;font-size:0.8rem}
            .footer{margin-top:2rem;padding-top:1rem;border-top:1px solid #E2E8F0;font-size:0.75rem;color:#94A3B8;text-align:center}
            @media print{body{margin:1rem}}</style></head><body>
            <div class="meta">${MATERIA_ICONS[slug] || materia.emoji} ${materia.nombre} · Bloque ${bloque.bloque} · ${bloque.meses} · ${gradoNombre}</div>
            <h1>${bloque.nombre}</h1>
            ${gm ? `<div class="box"><strong>🎯 Objetivo:</strong> ${gm.objetivo}</div>
            <div class="box"><strong>📋 Competencia SEP:</strong> ${gm.competencia}</div>
            ${gm.aprendizajesEsperados ? `<h2>✅ Aprendizajes Esperados</h2><ul>${gm.aprendizajesEsperados.map((a: string) => `<li>${a}</li>`).join('')}</ul>` : ''}
            ${gm.secuenciaDidactica ? `<h2>📝 Secuencia Didáctica</h2><ul>${gm.secuenciaDidactica.map((s: string) => `<li>${s}</li>`).join('')}</ul>` : ''}
            ${gm.preguntasDetonadoras ? `<h2>💡 Preguntas Detonadoras</h2><ul>${gm.preguntasDetonadoras.map((p: string) => `<li><em>"${p}"</em></li>`).join('')}</ul>` : ''}
            ${gm.materialesSugeridos ? `<h2>📦 Materiales</h2><div>${gm.materialesSugeridos.map((m: string) => `<span class="badge">${m}</span>`).join(' ')}</div>` : ''}
            ${gm.evaluacion ? `<h2>📊 Evaluación</h2><p>${gm.evaluacion}</p>` : ''}` : ''}
            ${enClase.length > 0 ? `<h2>📌 Actividades en Clase</h2><div>${enClase.map((a: string) => `<span class="badge">${a}</span>`).join(' ')}</div>` : ''}
            <div class="footer">Chispito.mx — Ficha pedagógica · ${gradoNombre}</div>
            <script>setTimeout(()=>window.print(),400)<\/script>
            </body></html>`);
            w.document.close();
        }}
            style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                padding: "0.5rem", borderRadius: "0.5rem", border: "none", cursor: "pointer",
                background: `linear-gradient(135deg,${materia.color},${materia.color}AA)`,
                color: "white", fontSize: "0.75rem", fontWeight: 700, width: "100%",
            }}>
            📥 Descargar PDF
        </button>
    );
}
