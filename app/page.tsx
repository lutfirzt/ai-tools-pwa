"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, ImageIcon, Video, Camera, Music, MessageSquare, Settings } from "lucide-react"

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const aiTools: AITool[] = [
  {
    id: "text-to-speech",
    name: "AI Text to Speech",
    description: "Convert text to natural speech",
    icon: <Mic className="w-6 h-6" />,
    color: "bg-blue-600",
  },
  {
    id: "image-prompt",
    name: "AI Image Prompt",
    description: "Generate stunning artwork",
    icon: <ImageIcon className="w-6 h-6" />,
    color: "bg-purple-600",
  },
  {
    id: "video-generator",
    name: "AI Video Generator",
    description: "Create amazing videos",
    icon: <Video className="w-6 h-6" />,
    color: "bg-green-600",
  },
  {
    id: "photo-generator",
    name: "AI Photo Generator",
    description: "Generate realistic photos",
    icon: <Camera className="w-6 h-6" />,
    color: "bg-orange-600",
  },
  {
    id: "music-generator",
    name: "Music & Song Generator",
    description: "Compose music with AI",
    icon: <Music className="w-6 h-6" />,
    color: "bg-pink-600",
  },
  {
    id: "speech-to-text",
    name: "AI Speech to Text",
    description: "Transcribe audio to text",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "bg-cyan-600",
  },
]


export default function AIToolsApp() {
  const router = useRouter();
  return (
  <div className="min-h-screen bg-slate-900 text-white pb-24">
      {/* Header + Premium Banner Combined */}
      <div className="sticky top-0 z-50 bg-slate-900 pb-2">
        <div className="flex items-center justify-between p-4 pt-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">LZ</span>
            </div>
            <span className="text-sm text-gray-300">AI Tools</span>
          </div>
          <Settings className="w-6 h-6 text-gray-400" />
        </div>
        <div className="mx-4">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-none p-4">
            <h3 className="text-white font-semibold mb-1">Hello, Lutfirzt</h3>
            <p className="text-blue-100 text-sm">Just a simple tools</p>
          </Card>
        </div>
      </div>

  {/* AI Tools Grid, gunakan margin-bottom agar tidak turun semua */}
  <div className="px-4 mb-24">
        <div className="grid grid-cols-2 gap-4">
          {aiTools.map((tool) => (
            <Card
              key={tool.id}
              className="bg-slate-800 border-slate-700 p-4 cursor-pointer hover:bg-slate-750 transition-colors"
              onClick={() => router.push(`/tool/${tool.id}`)}
            >
              <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center mb-3`}>
                {tool.icon}
              </div>
              <h3 className="text-white font-medium text-sm mb-1">{tool.name}</h3>
              <p className="text-gray-400 text-xs">{tool.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Search Bar Fixed Bottom, dengan safe-area dan auto scroll saat fokus */}
      <div
        className="fixed left-0 right-0 bottom-0 z-40 bg-slate-900 px-4 pb-4"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <div className="relative">
          <Input
            placeholder="Ask me anything..."
            className="bg-slate-800 border-slate-700 text-white placeholder-gray-400 pr-12"
            onFocus={e => {
              if (typeof window !== 'undefined') {
                setTimeout(() => {
                  e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
              }
            }}
          />
          <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
