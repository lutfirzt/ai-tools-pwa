"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

const PRESET_MOODS = [
  {
    id: "studio-clean",
    label: "Studio Clean",
    img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=400&auto=format&fit=crop",
    brief:
      "Clean, dreamy aesthetic, high-end visual, subtle gradient backdrop, soft studio lighting, minimal props.",
  },
  {
    id: "aqua-fresh",
    label: "Aqua Fresh",
    img: "https://images.unsplash.com/photo-1600185365483-26d7d0e9234b?q=80&w=400&auto=format&fit=crop",
    brief:
      "Fresh aquatic feel, water ripples, crisp highlights, reflective surface, airy composition.",
  },
  {
    id: "wooden-warm",
    label: "Wooden Warm",
    img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=400&auto=format&fit=crop",
    brief:
      "Warm lifestyle mood, wooden table, natural bokeh, cozy ambient light, shallow depth of field.",
  },
];

const SIZE_MAP = [
  "1:1 (1080x1080)",
  "4:5 (1350x1080)",
  "16:9 (1920x1080)",
  "9:16 (1080x1920)",
];

type Mood = { id: string; label: string; img: string; brief: string };

const DEFAULT_BRIEF = (
  productName: string,
  color: string,
  extra: string,
  mood?: Mood
) =>
  `Use a ${mood?.label?.toLowerCase() || "clean"} aesthetic with professional studio lighting. ${extra ? "Specifically include: " + extra : ""}. Product must be visible, brand readable.`;

interface PromptParams {
  productName: string;
  color: string;
  extra: string;
  size: string;
  mood?: Mood;
}

const buildPrompt = ({ productName, color, extra, size, mood }: PromptParams) => {
  return [
    `ROLE: Kamu adalah AI visual designer untuk foto produk e-commerce.`,
    "\nREFERENSI MOODBOARD: " + (mood ? mood.label : "(pilih)") + (mood ? ` — ${mood.brief}` : ""),
    "\nDETAIL PROMPT:\n- Nama produk: " + (productName || "(isi)") + "\n- Warna: " + (color || "Sesuai produk") + "\n- Elemen tambahan: " + (extra || "Sesuai produk") + "\n- Ukuran: " + size,
    "\nBrief visual:\n\"" + DEFAULT_BRIEF(productName, color, extra, mood) + "\"",
    "\nNEGATIVE PROMPT:\nAvoid: cropping product, warped labels, wrong brand, text overlays, watermark, excessive contrast."
  ].join("\n");
};

export default function ImagePromptPage() {
  const [productName, setProductName] = useState("");
  const [color, setColor] = useState("");
  const [extra, setExtra] = useState("");
  const [size, setSize] = useState(SIZE_MAP[0]);
  const [moodId, setMoodId] = useState(PRESET_MOODS[0].id);
  const [copied, setCopied] = useState(false);

  const mood = useMemo(() => PRESET_MOODS.find((m) => m.id === moodId), [moodId]);
  const prompt = useMemo(() => buildPrompt({ productName, color, extra, size, mood }), [productName, color, extra, size, mood]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white">AI Prompt Generator – Foto Produk</h1>
        <p className="text-slate-400 text-sm">Isi detail produk → pilih moodboard → salin prompt</p>
      </div>

      <Card className="p-4 space-y-4 bg-slate-800">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-200">Nama produk</label>
            <Input value={productName} onChange={e => setProductName(e.target.value)} placeholder="Contoh: Parfum Mawar" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-200">Warna Dominan</label>
            <Input value={color} onChange={e => setColor(e.target.value)} placeholder="Contoh: Pink pastel" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-200">Elemen tambahan</label>
            <Input value={extra} onChange={e => setExtra(e.target.value)} placeholder="Contoh: bunga, embun air" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-200">Ukuran</label>
            <select value={size} onChange={e => setSize(e.target.value)} className="w-full mt-1 rounded-xl border border-slate-700 px-3 py-2 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-700">
              {SIZE_MAP.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-slate-800">
        <p className="text-sm font-semibold mb-2 text-white">Referensi Moodboard</p>
        <div className="grid grid-cols-3 gap-3">
          {PRESET_MOODS.map(m => (
            <button key={m.id} onClick={() => setMoodId(m.id)} className={`rounded-xl overflow-hidden border ${moodId === m.id ? "ring-4 ring-blue-700 border-slate-900" : "border-slate-700"}`}>
              <img src={m.img} alt={m.label} className="h-32 w-full object-cover" />
              <div className="bg-black/50 text-white text-xs p-1">{m.label}</div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="bg-slate-900 text-white p-4 rounded-2xl space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Generated Prompt</h2>
          <Button onClick={copyToClipboard} className="bg-blue-700 text-white border-blue-700 hover:bg-blue-800">{copied ? "Copied" : "Copy"}</Button>
        </div>
        <pre className="whitespace-pre-wrap text-sm leading-6 bg-black/30 p-3 rounded-xl max-h-[50vh] overflow-auto">{prompt}</pre>
      </Card>

      <div className="text-xs text-slate-500 text-center">Dibuat cepat oleh ChatGPT • Sesuaikan sesuai brand</div>
    </div>
  );
}
