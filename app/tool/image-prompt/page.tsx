
"use client";
import React, { useState, useMemo } from "react";

const PRESET_MOODS = [
	{
		id: "studio-clean",
		label: "Studio Clean",
		img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=400&auto=format&fit=crop",
		brief: "Clean, dreamy aesthetic, high-end visual, subtle gradient backdrop, soft studio lighting, minimal props."
	},
	{
		id: "aqua-fresh",
		label: "Aqua Fresh",
		img: "https://i.pinimg.com/1200x/7f/63/0a/7f630ab0fc70b82a48a2070adfc31867.jpg",
		brief: "Fresh aquatic feel, water ripples, crisp highlights, reflective surface, airy composition."
	},
	{
		id: "wooden-warm",
		label: "Wooden Warm",
		img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=400&auto=format&fit=crop",
		brief: "Warm lifestyle mood, wooden table, natural bokeh, cozy ambient light, shallow depth of field."
	}
];

const SIZE_MAP = [
	"1:1 (1080x1080)",
	"4:5 (1350x1080)",
	"16:9 (1920x1080)",
	"9:16 (1080x1920)"
];

const DEFAULT_BRIEF = (productName, color, extra, mood) =>
	`Use a ${mood?.label?.toLowerCase() || "clean"} aesthetic with professional studio lighting. ${extra ? "Specifically include: " + extra : ""}. Product must be visible, brand readable.`;

const buildPrompt = ({ productName, color, extra, size, mood }) => {
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
	const mood = useMemo(() => PRESET_MOODS.find(m => m.id === moodId), [moodId]);
	const prompt = useMemo(() => buildPrompt({ productName, color, extra, size, mood }), [productName, color, extra, size, mood]);

		const copyToClipboard = async () => {
			try {
				if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
					await navigator.clipboard.writeText(prompt);
				} else {
					// Fallback untuk browser lama atau context non-https
					const textarea = document.createElement("textarea");
					textarea.value = prompt;
					document.body.appendChild(textarea);
					textarea.select();
					document.execCommand("copy");
					document.body.removeChild(textarea);
				}
				setCopied(true);
				setTimeout(() => setCopied(false), 1500);
			} catch (e) {
				console.error(e);
			}
		};

		return (
			<div className="max-w-5xl mx-auto p-6 space-y-6">
				{/* Premium Banner Style Header Sticky */}
				<div className="sticky top-0 z-40 mb-6">
					<div
						className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 shadow flex flex-col cursor-pointer hover:opacity-90 transition"
						onClick={() => window.location.href = "/"}
					>
						<h1 className="text-white font-semibold text-xl mb-1">AI Image Prompter</h1>
						<p className="text-blue-100 text-sm">Generate Prompt Image</p>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label className="text-sm font-medium text-slate-700 dark:text-slate-200">Nama produk</label>
					<input
						className="w-full mt-1 rounded-xl border border-blue-600 dark:border-blue-500 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-600 dark:focus:ring-blue-500 bg-slate-800 text-white placeholder-blue-300"
						value={productName}
						onChange={e => setProductName(e.target.value)}
						placeholder="Contoh: Parfum Mawar"
					/>
				</div>
				<div>
					<label className="text-sm font-medium text-slate-700 dark:text-slate-200">Warna Dominan</label>
					<input
						className="w-full mt-1 rounded-xl border border-blue-600 dark:border-blue-500 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-600 dark:focus:ring-blue-500 bg-slate-800 text-white placeholder-blue-300"
						value={color}
						onChange={e => setColor(e.target.value)}
						placeholder="Contoh: Pink pastel"
					/>
				</div>
				<div className="md:col-span-2">
					<label className="text-sm font-medium text-slate-700 dark:text-slate-200">Elemen tambahan</label>
					<input
						className="w-full mt-1 rounded-xl border border-blue-600 dark:border-blue-500 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-600 dark:focus:ring-blue-500 bg-slate-800 text-white placeholder-blue-300"
						value={extra}
						onChange={e => setExtra(e.target.value)}
						placeholder="Contoh: bunga, embun air"
					/>
				</div>
				<div>
					<label className="text-sm font-medium text-slate-700 dark:text-slate-200">Ukuran</label>
					<select
						className="w-full mt-1 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-4 focus:ring-slate-200"
						value={size}
						onChange={e => setSize(e.target.value)}
					>
						{SIZE_MAP.map(s => (
							<option key={s} value={s}>{s}</option>
						))}
					</select>
				</div>
			</div>

			<div>
				<p className="text-sm font-semibold mb-2">Referensi Moodboard</p>
				<div className="grid grid-cols-3 gap-3">
					{PRESET_MOODS.map(m => (
						<button
							key={m.id}
							type="button"
							onClick={() => setMoodId(m.id)}
							className={`rounded-xl overflow-hidden border ${moodId === m.id ? "ring-4 ring-slate-300 border-slate-900 dark:ring-slate-600 dark:border-slate-200" : "border-slate-200 dark:border-slate-700"}`}
						>
							<img src={m.img} alt={m.label} className="h-32 w-full object-cover" />
							<div className="bg-black/50 text-white text-xs p-1">{m.label}</div>
						</button>
					))}
				</div>
			</div>

			<div className="bg-slate-900 text-white p-4 rounded-2xl space-y-3">
				<div className="flex justify-between items-center">
					<h2 className="font-semibold">Generated Prompt</h2>
					<button
						type="button"
						onClick={copyToClipboard}
						className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-medium shadow-sm border border-white/20 bg-white/10 text-white hover:bg-white/20 transition"
					>
						{copied ? "Copied" : "Copy"}
					</button>
				</div>
				<pre className="whitespace-pre-wrap text-sm leading-6 bg-black/30 p-3 rounded-xl max-h-[50vh] overflow-auto">{prompt}</pre>
			</div>

			<footer className="text-xs text-slate-500 text-center">Dibuat cepat oleh ChatGPT • Sesuaikan sesuai brand</footer>
		</div>
	);
}
