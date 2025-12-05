"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Loader, AlertCircle, Download, FileText } from "lucide-react"

export function EmotionAnalyzer() {
  const [image, setImage] = useState<string | null>(null)
  const [reportReady, setReportReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image valide")
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("L'image doit faire moins de 10MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target?.result as string)
      setUploadedFile(file)
      setError("")
      setReportReady(false)
    }
    reader.readAsDataURL(file)
  }

  const analyzeDrawing = async () => {
    if (!uploadedFile) return

    setLoading(true)
    setAnalyzing(true)
    setError("")
    setReportReady(false)

    try {
      // Step 1: Upload image
      const formData = new FormData()
      formData.append("image", uploadedFile)

      const uploadResponse = await fetch("/api/emotion-analysis/upload", {
        method: "POST",
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error("Échec du téléchargement de l'image")
      }

      // Step 2: Run analysis
      const analyzeResponse = await fetch("/api/emotion-analysis/analyze", {
        method: "POST",
      })

      if (!analyzeResponse.ok) {
        throw new Error("Échec de l'analyse")
      }

      const result = await analyzeResponse.json()
      
      if (result.success) {
        setReportReady(true)
      } else {
        throw new Error(result.error || "Erreur lors de l'analyse")
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'analyse. Veuillez réessayer.")
      console.error(err)
    } finally {
      setLoading(false)
      setAnalyzing(false)
    }
  }

  const downloadReport = () => {
    window.open("/api/emotion-analysis/download", "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="font-medium text-foreground mb-2">Uploadez un dessin</p>
        <p className="text-sm text-muted-foreground">Cliquez ou glissez-déposez une image (PNG, JPG)</p>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Image Preview */}
      {image && (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border border-border">
            <img
              src={image || "/placeholder.svg"}
              alt="Uploaded drawing"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>

          {/* Analyze Button */}
          {!analyzing && !reportReady && (
            <Button
              onClick={analyzeDrawing}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Lancer l'analyse émotionnelle
                </>
              )}
            </Button>
          )}

          {/* Loading State */}
          {analyzing && (
            <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
              <div className="text-center">
                <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Analyse en cours... Cela peut prendre 1-2 minutes
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Détection des émotions, objets, expressions faciales et génération du rapport
                </p>
              </div>
            </div>
          )}

          {/* Report Ready */}
          {reportReady && !analyzing && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Analyse Terminée !
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Votre rapport d'analyse émotionnelle est prêt
                    </p>
                  </div>
                  <Button onClick={downloadReport} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger le Rapport PDF
                  </Button>
                  <Button
                    onClick={() => {
                      setImage(null)
                      setReportReady(false)
                      setUploadedFile(null)
                      fileInputRef.current?.click()
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Analyser un autre dessin
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
