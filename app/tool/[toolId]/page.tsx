"use client"

import { useParams, useRouter } from "next/navigation"
import ImagePromptPage from "../image-prompt"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X } from "lucide-react"
import { useState } from "react"

const aiTools = [
  {
    id: "text-to-speech",
    name: "AI Text to Speech",
    description: "Convert text to natural speech",
  },
  {
    id: "image-prompt",
    name: "AI Image Prompt Generator",
    description: "Generate product photo prompts for e-commerce.",
  },
  {
    id: "art-images",
    name: "AI Art & Images",
    description: "Generate stunning artwork",
  },
  {
    id: "video-generator",
    name: "AI Video Generator",
    description: "Create amazing videos",
  },
  {
    id: "photo-generator",
    name: "AI Photo Generator",
    description: "Generate realistic photos",
  },
  {
    id: "music-generator",
    name: "Music & Song Generator",
    description: "Compose music with AI",
  },
  {
    id: "speech-to-text",
    name: "AI Speech to Text",
    description: "Transcribe audio to text",
  },
]

export default function ToolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const toolId = params.toolId as string;
  const tool = aiTools.find((t) => t.id === toolId);
  if (!tool) {
    return <div className="p-8 text-center text-red-500">Tool not found</div>;
  }
  if (toolId === "image-prompt") {
    return <ImagePromptPage />;
  }
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 pt-12">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="text-white hover:bg-slate-800">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-semibold">{tool.name}</h1>
      </div>
      <div className="px-4">
        {/* Tool Description */}
        <div className="mb-6">
          <h2 className="text-white font-medium mb-2">{tool.name.replace("AI ", "")}</h2>
          <p className="text-gray-400 text-sm">{tool.description}</p>
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <h3 className="text-white font-medium mb-3">Upload Image</h3>
          {!uploadedImage ? (
            <Card className="bg-slate-800 border-slate-700 border-dashed p-8">
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-4">Click to upload a file</p>
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (ev) => setUploadedImage(ev.target?.result as string)
                    reader.readAsDataURL(file)
                  }
                }} className="hidden" id="image-upload" />
                <label htmlFor="image-upload">
                  <Button variant="secondary" className="cursor-pointer">
                    Choose File
                  </Button>
                </label>
              </div>
            </Card>
          ) : (
            <div className="relative">
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUploadedImage(null)}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Description Section */}
        {uploadedImage && (
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">How would you like to animate your image?</h3>
            <Textarea
              placeholder="Add wind and water ripple effects"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder-gray-400 min-h-[100px]"
            />
          </div>
        )}

        {/* Duration Section */}
        <div className="mb-8">
          <h3 className="text-white font-medium mb-3">Set Duration</h3>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="5 sec" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="3">3 sec</SelectItem>
              <SelectItem value="5">5 sec</SelectItem>
              <SelectItem value="10">10 sec</SelectItem>
              <SelectItem value="15">15 sec</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
            disabled={tool.id === "video-generator" && !uploadedImage}
          >
            {uploadedImage && description ? "Generate" : "Generate"}
          </Button>
          <Button
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 rounded-xl bg-transparent"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  )
}
