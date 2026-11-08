import React, { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, QrCode, X, RefreshCw, Search, Check, Sparkles, ExternalLink } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchWithImage: (query: string, imageUrl?: string) => void;
  defaultMode?: 'camera' | 'qr';
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onSearchWithImage,
  defaultMode = 'camera',
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'qr'>(defaultMode);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiTags, setAiTags] = useState<string[]>([]);
  const [detectedQr, setDetectedQr] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    setActiveTab(defaultMode);
  }, [defaultMode]);

  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode, capturedImage]);

  const startCamera = async () => {
    setCameraError(null);
    stopCamera();
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch {
      setCameraError('ক্যামেরা চালু করা যায়নি। অনুগ্রহ করে পারমিশন চেক করুন অথবা ফাইল থেকে ছবি আপলোড করুন।');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const switchCamera = () => {
    soundEffects.playClick();
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const handleCapture = () => {
    soundEffects.playClick();
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedImage(dataUrl);
        analyzeImage(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundEffects.playClick();
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setCapturedImage(dataUrl);
        analyzeImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = (imageUrl: string) => {
    setAnalyzing(true);
    setAiTags([]);
    setDetectedQr(null);

    // Simulated Smart Visual recognition & QR check
    setTimeout(() => {
      setAnalyzing(false);
      const sampleTags = ['Smart Object', 'ডকুমেন্ট ও টেক্সট', 'ছবি অনুসন্ধান', 'বাংলা ফন্ট ও প্রোডাক্ট'];
      setAiTags(sampleTags);
      if (activeTab === 'qr') {
        setDetectedQr('https://bangla-universal-search.app/item/qr-9981');
      }
    }, 1200);
  };

  const handleApplySearch = (query: string) => {
    soundEffects.playSearchDing();
    onSearchWithImage(query, capturedImage || undefined);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800/90 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
              {activeTab === 'camera' ? <Camera className="w-5 h-5" /> : <QrCode className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base">
                {activeTab === 'camera' ? 'ক্যামেরা ও ভিজ্যুয়াল সার্চ' : 'কিউআর ও বারকোড স্ক্যানার'}
              </h3>
              <p className="text-xs text-slate-400">ছবি তুলে বা গ্যালারি থেকে সরাসরি সার্চ করুন</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex bg-slate-950/60 p-1 border-b border-slate-800">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('camera');
            }}
            className={`flex-1 flex items-center justify-center py-2 text-xs font-semibold rounded-xl transition ${
              activeTab === 'camera'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-4 h-4 mr-1.5" />
            ক্যামেরা লেন্স
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('qr');
            }}
            className={`flex-1 flex items-center justify-center py-2 text-xs font-semibold rounded-xl transition ${
              activeTab === 'qr'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-4 h-4 mr-1.5" />
            কিউআর কোড স্ক্যানার
          </button>
        </div>

        {/* Viewport Area */}
        <div className="relative flex-1 bg-black min-h-[320px] max-h-[460px] flex items-center justify-center overflow-hidden">
          {!capturedImage ? (
            <>
              {/* Live Video */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* QR Scanner Frame Overlay */}
              {activeTab === 'qr' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-56 h-56 border-2 border-emerald-400 rounded-2xl shadow-[0_0_20px_rgba(52,211,153,0.5)]">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-300 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-300 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-300 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-300 rounded-br-lg" />
                    {/* Laser Scanner Line */}
                    <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-bounce top-1/2" />
                  </div>
                </div>
              )}

              {/* Camera Error / Fallback */}
              {cameraError && (
                <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="p-4 bg-amber-500/10 text-amber-400 rounded-2xl mb-3">
                    <Camera className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-slate-300 mb-4">{cameraError}</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center shadow-lg"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    গ্যালারি থেকে ছবি আপলোড করুন
                  </button>
                </div>
              )}

              {/* Switch Facing Mode Button */}
              <button
                type="button"
                onClick={switchCamera}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition"
                title="ক্যামেরা ফ্লিপ করুন"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </>
          ) : (
            /* Captured Image Preview & Recognition */
            <div className="relative w-full h-full flex flex-col">
              <img
                src={capturedImage}
                alt="Captured visual search"
                className="w-full h-56 object-contain bg-slate-950"
              />
              <div className="p-4 bg-slate-900 flex-1 overflow-y-auto">
                {analyzing ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <Sparkles className="w-8 h-8 text-lime-400 animate-spin mb-2" />
                    <p className="text-xs text-lime-300 font-medium">স্মার্ট ভিজ্যুয়াল অ্যানালাইসিস চলছে...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300 flex items-center">
                        <Sparkles className="w-3.5 h-3.5 text-lime-400 mr-1" />
                        শনাক্ত করা ফলাফল ও কিওয়ার্ড:
                      </span>
                      <button
                        onClick={() => setCapturedImage(null)}
                        className="text-xs text-blue-400 hover:underline"
                      >
                        আবার তুলুন
                      </button>
                    </div>

                    {detectedQr && (
                      <div className="p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-xl">
                        <p className="text-[11px] text-emerald-400 font-medium mb-1">কিউআর কোড লিংক পাওয়া গেছে:</p>
                        <p className="text-xs text-white break-all font-mono">{detectedQr}</p>
                        <a
                          href={detectedQr}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center text-xs font-semibold text-emerald-300 hover:underline"
                        >
                          লিংকটি খুলুন <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {aiTags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleApplySearch(tag)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs flex items-center transition border border-slate-700"
                        >
                          <Search className="w-3 h-3 mr-1 text-blue-400" />
                          {tag}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handleApplySearch(aiTags[0] || 'ফটো লেন্স সার্চ')}
                      className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center shadow-lg transition"
                    >
                      <Check className="w-4 h-4 mr-1.5" />
                      এই ছবি দিয়ে সমস্ত ফাইল ও ইন্টারনেটে সার্চ করুন
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Capture Controls Footer */}
        {!capturedImage && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-around">
            {/* Gallery picker */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center text-slate-400 hover:text-white transition"
            >
              <div className="p-3 bg-slate-800 rounded-2xl mb-1 hover:bg-slate-700">
                <ImageIcon className="w-5 h-5 text-slate-300" />
              </div>
              <span className="text-[11px]">গ্যালারি</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* Shutter Button */}
            <button
              onClick={handleCapture}
              className="relative p-1 rounded-full border-4 border-white/80 hover:scale-105 active:scale-95 transition"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-100 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-slate-900" />
                </div>
              </div>
            </button>

            {/* QR shortcut or quick tip */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab(activeTab === 'camera' ? 'qr' : 'camera');
              }}
              className="flex flex-col items-center text-slate-400 hover:text-white transition"
            >
              <div className="p-3 bg-slate-800 rounded-2xl mb-1 hover:bg-slate-700">
                <QrCode className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-[11px]">{activeTab === 'camera' ? 'QR মোড' : 'ফটো মোড'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
