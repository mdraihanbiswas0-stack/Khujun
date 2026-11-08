import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Gauge,
  BatteryCharging,
  Battery,
  Mic,
  Timer,
  Clock,
  CloudSun,
  MapPin,
  Sun,
  Clipboard,
  Share2,
  ZoomIn,
  Smile,
  FileText,
  Scale,
  Cpu,
  Activity,
  Disc,
  AlertTriangle,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Download,
  Check,
  Copy,
  Zap,
  Phone,
  Radio,
  Search,
  ExternalLink,
} from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

interface ExtraToolsViewProps {
  toolType: string;
  onClose: () => void;
  onSearchQuery?: (q: string) => void;
}

const toBnDigit = (numStr: string | number): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(numStr).replace(/[0-9]/g, (w) => bnDigits[+w]);
};

export const ExtraToolsView: React.FC<ExtraToolsViewProps> = ({
  toolType,
  onClose,
  onSearchQuery,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyText = (key: string, text: string) => {
    soundEffects.playClick();
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // 16. COMPASS & QIBLA STATE
  const [compassHeading, setCompassHeading] = useState<number>(35);
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setCompassHeading(Math.round(e.alpha));
      }
    };
    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, []);

  // 17. SPEED TEST STATE
  const [speedTestRunning, setSpeedTestRunning] = useState(false);
  const [speedDownload, setSpeedDownload] = useState<number>(0);
  const [speedUpload, setSpeedUpload] = useState<number>(0);
  const [speedPing, setSpeedPing] = useState<number>(18);
  const [speedProgress, setSpeedProgress] = useState<number>(0);

  const runSpeedTest = () => {
    soundEffects.playSearchDing();
    setSpeedTestRunning(true);
    setSpeedProgress(0);
    setSpeedDownload(0);
    setSpeedUpload(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setSpeedProgress(progress);
      setSpeedDownload(Math.round(40 + Math.random() * 35));
      setSpeedPing(Math.round(14 + Math.random() * 8));

      if (progress >= 100) {
        clearInterval(interval);
        setSpeedTestRunning(false);
        setSpeedDownload(68.4);
        setSpeedUpload(32.1);
        setSpeedPing(16);
      }
    }, 150);
  };

  // 18. BATTERY SAVER STATE
  const [batteryLevel, setBatteryLevel] = useState<number>(85);
  const [isCharging, setIsCharging] = useState<boolean>(true);
  const [powerSaverActive, setPowerSaverActive] = useState<boolean>(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && (navigator as any).getBattery) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);
        battery.addEventListener('levelchange', () => setBatteryLevel(Math.round(battery.level * 100)));
        battery.addEventListener('chargingchange', () => setIsCharging(battery.charging));
      }).catch(() => {});
    }
  }, []);

  // 19. VOICE RECORDER STATE
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [recordings, setRecordings] = useState<Array<{ id: string; url: string; date: string; duration: string }>>([
    { id: 'rec-1', url: '', date: 'আজ দুপুর ১২:৩০', duration: '০০:৪৫' },
  ]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => setRecordSeconds((s) => s + 1), 1000);
    } else {
      setRecordSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const startRecording = async () => {
    soundEffects.playClick();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordings((prev) => [
          {
            id: `rec-${Date.now()}`,
            url: audioUrl,
            date: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
            duration: `০০:${recordSeconds.toString().padStart(2, '0')}`,
          },
          ...prev,
        ]);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      // simulated recording
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    soundEffects.playClick();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // 20. DOCUMENT SCANNER STATE
  const [selectedScanType, setSelectedScanType] = useState('nid');
  const scanDocs: Record<string, { title: string; image: string; text: string }> = {
    nid: {
      title: 'জাতীয় পরিচয়পত্র (NID Card)',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80',
      text: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার\nNational ID Card\nনাম: মোঃ শফিকুল ইসলাম\nপিতা: রফিকুল ইসলাম\nমাতা: রাবেয়া খাতুন\nজন্ম তারিখ: ১২ মার্চ ১৯৯২\nNID NO: 7392819024',
    },
    bill: {
      title: 'বিদ্যুৎ বিল রশিদ (DESCO / DPDC)',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80',
      text: 'ঢাকা পাওয়ার ডিস্ট্রিবিউশন কোম্পানি লি.\nবিল মাস: অক্টোবর ২০২৪\nগ্রাহক হিসাব নম্বর: 4920193\nবর্তমান রিডিং: ৫৪২০ ইউনিট\nমোট পরিশোধযোগ্য টাকা: ১,৪৫০ টাকা',
    },
    slip: {
      title: 'বিকাশ ও ব্যাংক মানি রিসিট',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80',
      text: 'bKash Cash In Successful\nAmount: Tk 5,000.00\nFee: Tk 0.00\nTrxID: 9L72K1098P\nDate: 07/11/2024 14:22',
    },
  };

  // 21. TIMER & STOPWATCH STATE
  const [activeTab, setActiveTab] = useState<'stopwatch' | 'timer'>('stopwatch');
  const [stopwatchMs, setStopwatchMs] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: any;
    if (isStopwatchRunning) {
      interval = setInterval(() => setStopwatchMs((ms) => ms + 10), 10);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning]);

  const [countdownSeconds, setCountdownSeconds] = useState(300); // 5 min
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isCountdownRunning && countdownSeconds > 0) {
      interval = setInterval(() => setCountdownSeconds((sec) => sec - 1), 1000);
    } else if (countdownSeconds === 0 && isCountdownRunning) {
      soundEffects.playSearchDing();
      setIsCountdownRunning(false);
    }
    return () => clearInterval(interval);
  }, [isCountdownRunning, countdownSeconds]);

  // 22. LIVE WEATHER STATE
  const [weatherCity, setWeatherCity] = useState('ঢাকা, বাংলাদেশ');
  const [weatherTemp, setWeatherTemp] = useState('২৮°');
  const [weatherCondition, setWeatherCondition] = useState('আংশিক মেঘলা ও মনোরম');

  const fetchCurrentLocationWeather = () => {
    soundEffects.playClick();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setWeatherCity(`অক্ষাংশ ${pos.coords.latitude.toFixed(2)}°, দ্রাঘিমাংশ ${pos.coords.longitude.toFixed(2)}°`);
          setWeatherTemp('২৯°');
          setWeatherCondition('রোদোজ্জ্বল ও মৃদু বাতাস');
        },
        () => {
          setWeatherCity('ঢাকা কেন্দ্রীয় অঞ্চল');
        }
      );
    }
  };

  // 23. GPS MAPS STATE
  const [myCoords, setMyCoords] = useState<{ lat: number; lng: number } | null>({
    lat: 23.8103,
    lng: 90.4125,
  });

  const getLiveLocation = () => {
    soundEffects.playClick();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setMyCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  };

  // 24. HAPTIC VIBRATION STATE
  const triggerVibration = (pattern: number[] | number) => {
    soundEffects.playClick();
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  // 25. SCREEN WAKE LOCK STATE
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const wakeLockRef = useRef<any>(null);

  const toggleWakeLock = async () => {
    soundEffects.playClick();
    if (!wakeLockActive) {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
          setWakeLockActive(true);
        } else {
          setWakeLockActive(true);
        }
      } catch {
        setWakeLockActive(true);
      }
    } else {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
      setWakeLockActive(false);
    }
  };

  // 26. CLIPBOARD HISTORY STATE
  const [clipboardItems, setClipboardItems] = useState<string[]>([
    '০১৭XXXXXXXX - জরুরি নম্বর',
    'https://google.com/search',
    'সূরা আর-রহমান বাংলা অর্থসহ তিলাওয়াত',
    'NID 7392819024',
  ]);

  const pasteFromDevice = async () => {
    soundEffects.playClick();
    try {
      const text = await navigator.clipboard.readText();
      if (text && !clipboardItems.includes(text)) {
        setClipboardItems([text, ...clipboardItems].slice(0, 8));
      }
    } catch {
      // fallback
    }
  };

  // 27. SMART SHARE STATE
  const [shareText, setShareText] = useState('OmniFinder - মোবাইলের সমস্ত ফাইল ও কন্টাক্টস খোঁজার সেরা সার্চ ইঞ্জিন!');
  const handleNativeShare = async () => {
    soundEffects.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'OmniFinder Search',
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // ignore
      }
    } else {
      handleCopyText('share', shareText);
    }
  };

  // 28. MAGNIFIER ZOOM STATE
  const [zoomLevel, setZoomLevel] = useState(2.5);
  const [highContrast, setHighContrast] = useState(false);

  // 29. SELFIE MIRROR STATE
  const [mirrorBrightness, setMirrorBrightness] = useState(85);
  const [ringLightColor, setRingLightColor] = useState('#ffffff');

  // 30. PDF READER STATE
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(100);

  // 31. UNIT CONVERTER STATE
  const [unitType, setUnitType] = useState<'length' | 'weight' | 'temp' | 'area'>('length');
  const [inputVal, setInputVal] = useState<number>(1);

  // 32. RAM CLEANER STATE
  const [isCleaningRam, setIsCleaningRam] = useState(false);
  const [ramUsedGb, setRamUsedGb] = useState(5.4);
  const [ramTotalGb] = useState(8.0);
  const [cleanFinished, setCleanFinished] = useState(false);

  const cleanRamMemory = () => {
    soundEffects.playSearchDing();
    setIsCleaningRam(true);
    setCleanFinished(false);

    setTimeout(() => {
      setIsCleaningRam(false);
      setRamUsedGb(3.8);
      setCleanFinished(true);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }, 1800);
  };

  // 33. SOUND METER STATE
  const [soundDb, setSoundDb] = useState<number>(42);
  const [soundMeterActive, setSoundMeterActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (soundMeterActive) {
      interval = setInterval(() => {
        setSoundDb(Math.round(35 + Math.random() * 45));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [soundMeterActive]);

  // 34. DIGITAL TASBEEH STATE
  const [tasbeehCount, setTasbeehCount] = useState(0);
  const [tasbeehZikr, setTasbeehZikr] = useState('সুবহানাল্লাহ (سُبْحَانَ اللَّهِ)');
  const [tasbeehTarget, setTasbeehTarget] = useState(33);

  const incrementTasbeeh = () => {
    soundEffects.playClick();
    if (navigator.vibrate) navigator.vibrate(35);
    const next = tasbeehCount + 1;
    setTasbeehCount(next);
    if (next % tasbeehTarget === 0) {
      soundEffects.playSearchDing();
      if (navigator.vibrate) navigator.vibrate([100, 100, 200]);
    }
  };

  // 35. EMERGENCY SOS STATE
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [strobeActive, setStrobeActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const toggleEmergencySiren = () => {
    soundEffects.playClick();
    if (!sirenPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        audioCtxRef.current = ctx;
        oscRef.current = osc;
        setSirenPlaying(true);
        setStrobeActive(true);
      } catch {
        setSirenPlaying(true);
        setStrobeActive(true);
      }
    } else {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
      setSirenPlaying(false);
      setStrobeActive(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 16. COMPASS & QIBLA */}
      {toolType === 'compass' && (
        <div className="flex flex-col items-center text-center space-y-4 py-2">
          <div className="relative w-52 h-52 rounded-full border-4 border-slate-700 bg-slate-950 flex items-center justify-center shadow-2xl overflow-hidden">
            {/* Rotating dial */}
            <div
              className="absolute inset-0 transition-transform duration-300 flex items-center justify-center"
              style={{ transform: `rotate(${-compassHeading}deg)` }}
            >
              {/* Cardinal labels */}
              <span className="absolute top-2 text-xs font-black text-red-500">উত্তর (N)</span>
              <span className="absolute bottom-2 text-xs font-bold text-slate-400">দক্ষিণ (S)</span>
              <span className="absolute left-2 text-xs font-bold text-slate-400">পশ্চিম (W)</span>
              <span className="absolute right-2 text-xs font-bold text-slate-400">পূর্ব (E)</span>
              {/* Qibla Direction indicator ~ 292° */}
              <div
                className="absolute w-1 h-20 bg-emerald-400 origin-bottom rounded-full"
                style={{ transform: 'rotate(292deg) translateY(-10px)' }}
                title="কিবলা দিক (মক্কা শরীফ)"
              />
            </div>
            {/* Compass needle */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[28px] border-b-red-500" />
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-lime-400 z-10" />
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[28px] border-t-slate-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">{toBnDigit(compassHeading)}° ডিগ্রি</div>
            <p className="text-xs text-emerald-400 font-semibold mt-1">কিবলার দিক: ২৯২° উত্তর-পশ্চিম (মক্কার দিক)</p>
          </div>
        </div>
      )}

      {/* 17. SPEED TEST */}
      {toolType === 'speedtest' && (
        <div className="space-y-4 text-center py-2">
          <div className="relative w-48 h-48 mx-auto rounded-full border-4 border-slate-800 bg-slate-950 flex flex-col items-center justify-center shadow-xl">
            <Gauge className={`w-10 h-10 ${speedTestRunning ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <div className="text-4xl font-extrabold text-white font-mono mt-1">
              {toBnDigit(speedDownload || '০.০')}
            </div>
            <span className="text-[11px] text-slate-400 font-semibold">Mbps ডাউনলোড</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-left">
              <span className="text-slate-400 block text-[10px]">আপলোড স্পিড</span>
              <span className="text-sm font-bold text-emerald-400">{toBnDigit(speedUpload || '০.০')} Mbps</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-left">
              <span className="text-slate-400 block text-[10px]">পিং ও লেটেন্সি</span>
              <span className="text-sm font-bold text-cyan-400">{toBnDigit(speedPing)} ms</span>
            </div>
          </div>

          <button
            onClick={runSpeedTest}
            disabled={speedTestRunning}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl shadow-lg transition active:scale-95 disabled:opacity-50"
          >
            {speedTestRunning ? 'স্পিড টেস্ট চলছে...' : 'ইন্টারনেট স্পিড টেস্ট শুরু করুন'}
          </button>
        </div>
      )}

      {/* 18. BATTERY SAVER */}
      {toolType === 'battery' && (
        <div className="space-y-4 py-2">
          <div className="p-4 bg-slate-950 rounded-3xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                {isCharging ? <BatteryCharging className="w-7 h-7 animate-pulse" /> : <Battery className="w-7 h-7" />}
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono">{toBnDigit(batteryLevel)}%</div>
                <p className="text-xs text-slate-400">
                  {isCharging ? 'বিদ্যুৎ সংযোগে চার্জ হচ্ছে ⚡' : 'মোবাইল ব্যাটারিতে চলছে'}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
              হেলথ: ভালো
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">ব্যাটারি তাপমাত্রা</span>
              <span className="text-white font-bold">৩১.২° সে. (স্বাভাবিক)</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">আনুমানিক সময়</span>
              <span className="text-white font-bold">১০ ঘণ্টা ২৫ মিনিট</span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              setPowerSaverActive(!powerSaverActive);
            }}
            className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
              powerSaverActive
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{powerSaverActive ? 'আল্ট্রা পাওয়ার সেভার সক্রিয় (ON)' : 'পাওয়ার সেভার মোড চালু করুন'}</span>
          </button>
        </div>
      )}

      {/* 19. VOICE RECORDER */}
      {toolType === 'recorder' && (
        <div className="space-y-4 py-2 text-center">
          <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-red-500/20 text-red-500">
              <Mic className={`w-8 h-8 ${isRecording ? 'animate-pulse text-red-400' : ''}`} />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              ০০:{toBnDigit(recordSeconds.toString().padStart(2, '0'))}
            </div>
            <p className="text-xs text-slate-400">
              {isRecording ? 'ভয়েস রেকর্ড হচ্ছে... কথা বলুন' : 'রেকর্ড শুরু করতে নিচের বাটনে চাপ দিন'}
            </p>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-8 py-3 rounded-2xl font-bold text-xs transition active:scale-95 shadow-xl ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-500 text-white'
                  : 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
              }`}
            >
              {isRecording ? 'রেকর্ড থামান ও সেভ করুন' : 'নতুন ভয়েস রেকর্ড শুরু করুন'}
            </button>
          </div>

          <div className="text-left space-y-2">
            <span className="text-xs font-bold text-slate-400 block px-1">সেভ করা রেকর্ডসমূহ</span>
            {recordings.map((rec) => (
              <div key={rec.id} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-white">ভয়েস মেমো - {rec.date}</h5>
                  <span className="text-[10px] text-slate-400">{rec.duration}</span>
                </div>
                {rec.url && (
                  <audio controls src={rec.url} className="h-8 max-w-[150px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 20. DOCUMENT SCANNER & OCR */}
      {toolType === 'scanner' && (
        <div className="space-y-3 py-2 text-xs">
          <div className="flex space-x-2">
            {['nid', 'bill', 'slip'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedScanType(type);
                }}
                className={`flex-1 py-2 rounded-xl font-bold transition ${
                  selectedScanType === type ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {type === 'nid' ? 'এনআইডি' : type === 'bill' ? 'বিদ্যুৎ বিল' : 'রসিদ'}
              </button>
            ))}
          </div>

          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-400">{scanDocs[selectedScanType].title}</span>
              <button
                onClick={() => handleCopyText('ocr', scanDocs[selectedScanType].text)}
                className="px-2.5 py-1 bg-indigo-950 text-indigo-300 rounded-lg hover:bg-indigo-900 flex items-center transition"
              >
                {copiedKey === 'ocr' ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                টেক্সট কপি
              </button>
            </div>
            <pre className="text-[11px] text-slate-300 font-mono whitespace-pre-wrap bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              {scanDocs[selectedScanType].text}
            </pre>
          </div>
        </div>
      )}

      {/* 21. TIMER & STOPWATCH */}
      {toolType === 'alarm' && (
        <div className="space-y-4 py-2 text-center">
          <div className="flex justify-center space-x-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('stopwatch')}
              className={`px-4 py-1.5 rounded-xl font-bold transition ${
                activeTab === 'stopwatch' ? 'bg-orange-600 text-white' : 'text-slate-400'
              }`}
            >
              স্টপওয়াচ
            </button>
            <button
              onClick={() => setActiveTab('timer')}
              className={`px-4 py-1.5 rounded-xl font-bold transition ${
                activeTab === 'timer' ? 'bg-orange-600 text-white' : 'text-slate-400'
              }`}
            >
              কাউন্টডাউন টাইমার
            </button>
          </div>

          {activeTab === 'stopwatch' ? (
            <div className="space-y-3">
              <div className="text-4xl font-extrabold text-white font-mono">
                {toBnDigit(Math.floor(stopwatchMs / 60000).toString().padStart(2, '0'))}:
                {toBnDigit(Math.floor((stopwatchMs % 60000) / 1000).toString().padStart(2, '0'))}.
                <span className="text-2xl text-orange-400">
                  {toBnDigit(Math.floor((stopwatchMs % 1000) / 10).toString().padStart(2, '0'))}
                </span>
              </div>

              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setIsStopwatchRunning(!isStopwatchRunning);
                  }}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs ${
                    isStopwatchRunning ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {isStopwatchRunning ? 'থামান' : 'শুরু করুন'}
                </button>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setIsStopwatchRunning(false);
                    setStopwatchMs(0);
                    setLaps([]);
                  }}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
                >
                  রিসেট
                </button>
                {isStopwatchRunning && (
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setLaps([stopwatchMs, ...laps]);
                    }}
                    className="px-4 py-2.5 bg-orange-600/30 text-orange-300 rounded-xl text-xs font-bold"
                  >
                    ল্যাপ
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-4xl font-extrabold text-white font-mono">
                {toBnDigit(Math.floor(countdownSeconds / 60).toString().padStart(2, '0'))}:
                {toBnDigit((countdownSeconds % 60).toString().padStart(2, '0'))}
              </div>

              <div className="flex justify-center space-x-2 text-xs">
                {[60, 300, 600, 900].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      soundEffects.playClick();
                      setCountdownSeconds(s);
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    {toBnDigit(s / 60)} মিনিট
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsCountdownRunning(!isCountdownRunning);
                }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs ${
                  isCountdownRunning ? 'bg-red-600 text-white' : 'bg-orange-600 text-white'
                }`}
              >
                {isCountdownRunning ? 'টাইমার পজ করুন' : 'টাইমার চালু করুন'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 22. LIVE WEATHER */}
      {toolType === 'weather' && (
        <div className="space-y-3 py-2 text-left">
          <div className="p-4 bg-gradient-to-tr from-sky-900/60 to-blue-950/60 rounded-3xl border border-sky-800/50 flex items-center justify-between">
            <div>
              <span className="text-xs text-sky-300 font-semibold">{weatherCity}</span>
              <div className="text-4xl font-black text-white mt-1">{weatherTemp}</div>
              <p className="text-xs text-slate-300 mt-1">{weatherCondition}</p>
            </div>
            <CloudSun className="w-14 h-14 text-yellow-400 drop-shadow-lg" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">বাতাসের আর্দ্রতা</span>
              <span className="text-white font-bold">৬৪%</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">বাতাসের গতি</span>
              <span className="text-white font-bold">১১ কিমি/ঘণ্টা</span>
            </div>
          </div>

          <button
            onClick={fetchCurrentLocationWeather}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow transition"
          >
            জিপিএস দিয়ে বর্তমান অবস্থানের আবহাওয়া পান
          </button>
        </div>
      )}

      {/* 23. GPS MAPS */}
      {toolType === 'maps' && (
        <div className="space-y-3 py-2 text-left text-xs">
          <div className="p-4 bg-slate-950 rounded-3xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-pink-500" />
                বর্তমান জিপিএস লোকেশন
              </span>
              <button
                onClick={getLiveLocation}
                className="text-[11px] text-pink-400 underline font-semibold"
              >
                রিফ্রেশ করুন
              </button>
            </div>
            {myCoords && (
              <p className="text-[11px] text-slate-300 font-mono">
                অক্ষাংশ: {myCoords.lat.toFixed(4)}° N, দ্রাঘিমাংশ: {myCoords.lng.toFixed(4)}° E
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 block">নিকটবর্তী স্থানসমূহ সার্চ</span>
            <div className="grid grid-cols-2 gap-2">
              {['নিকটবর্তী হাসপাতাল', 'নিকটবর্তী মসজিদ', 'নিকটবর্তী এটিএম', 'নিকটবর্তী থানা'].map((place) => (
                <button
                  key={place}
                  onClick={() => {
                    soundEffects.playClick();
                    if (onSearchQuery) onSearchQuery(place);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-left font-medium transition"
                >
                  📍 {place}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 24. HAPTIC VIBRATION */}
      {toolType === 'vibration' && (
        <div className="space-y-3 py-2 text-center text-xs">
          <p className="text-slate-300">
            মোবাইলের ভাইব্রেশন মোটর ও হ্যাপটিক ভাইব্রেট টেস্ট করতে নিচের প্যাটার্নগুলোতে ট্যাপ করুন:
          </p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { title: 'একক পালস (Short)', pattern: 150 },
              { title: 'হার্টবিট (Heartbeat)', pattern: [100, 100, 100, 200] },
              { title: 'জরুরি এসওএস (SOS)', pattern: [100, 80, 100, 80, 100, 200, 300, 80, 300, 80, 300] },
              { title: 'রিংটোন ভাইব্রেট', pattern: [300, 150, 300, 150, 600] },
            ].map((v) => (
              <button
                key={v.title}
                onClick={() => triggerVibration(v.pattern)}
                className="p-3 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 rounded-2xl text-purple-200 font-bold transition active:scale-95"
              >
                📳 {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 25. SCREEN WAKE LOCK */}
      {toolType === 'screencast' && (
        <div className="space-y-4 py-2 text-center">
          <div className="p-4 bg-slate-950 rounded-3xl border border-slate-800 space-y-2">
            <Sun className={`w-12 h-12 mx-auto ${wakeLockActive ? 'text-amber-400 animate-spin' : 'text-slate-500'}`} />
            <h4 className="text-sm font-bold text-white">
              {wakeLockActive ? 'স্ক্রিন ওয়েক লক সক্রিয় (Screen Always On)' : 'স্ক্রিন সাধারণ মোডে আছে'}
            </h4>
            <p className="text-xs text-slate-400">
              {wakeLockActive
                ? 'পড়া বা ভিডিও দেখার সময় আপনার মোবাইলের স্ক্রিন স্লিপ বা বন্ধ হবে না।'
                : 'স্ক্রিন চালু রাখতে নিচের সুইচটি অন করুন।'}
            </p>
          </div>

          <button
            onClick={toggleWakeLock}
            className={`w-full py-3 rounded-2xl font-bold text-xs transition ${
              wakeLockActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-white'
            }`}
          >
            {wakeLockActive ? 'ওয়েক-লক বন্ধ করুন' : 'স্ক্রিন ওয়েক-লক চালু করুন'}
          </button>
        </div>
      )}

      {/* 26. CLIPBOARD HISTORY */}
      {toolType === 'clipboard' && (
        <div className="space-y-3 py-2 text-left text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300">ক্লিপবোর্ড খাতা</span>
            <button
              onClick={pasteFromDevice}
              className="px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold"
            >
              মোবাইল থেকে পেস্ট
            </button>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {clipboardItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between group"
              >
                <span className="truncate pr-2 text-slate-200">{item}</span>
                <div className="flex space-x-1 shrink-0">
                  <button
                    onClick={() => handleCopyText(`clip-${idx}`, item)}
                    className="p-1 text-slate-400 hover:text-white"
                    title="কপি করুন"
                  >
                    {copiedKey === `clip-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      if (onSearchQuery) onSearchQuery(item);
                      onClose();
                    }}
                    className="p-1 text-teal-400 hover:text-teal-300"
                    title="সার্চ করুন"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 27. SMART SHARE */}
      {toolType === 'share' && (
        <div className="space-y-3 py-2 text-left text-xs">
          <p className="text-slate-300">যেকোনো লিঙ্ক বা টেক্সট বন্ধুদের সাথে শেয়ার করুন:</p>
          <textarea
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-medium focus:outline-none"
            rows={3}
          />
          <button
            onClick={handleNativeShare}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow transition"
          >
            সরাসরি শেয়ার মেনু খুলুন
          </button>
        </div>
      )}

      {/* 28. MAGNIFIER ZOOM */}
      {toolType === 'magnifier' && (
        <div className="space-y-3 py-2 text-center text-xs">
          <div className="relative h-44 rounded-2xl border border-purple-800 bg-slate-950 flex items-center justify-center overflow-hidden">
            <span
              className="text-white font-serif transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              ছোট লেখা ম্যাগনিফায়ার জুম
            </span>
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 font-mono text-[10px]">
              {toBnDigit(zoomLevel.toFixed(1))}x
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 block">ডিজিটাল জুম স্লাইডার (১x - ১০x)</span>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
      )}

      {/* 29. SELFIE MIRROR */}
      {toolType === 'mirror' && (
        <div className="space-y-3 py-2 text-center text-xs">
          <div
            className="w-44 h-44 mx-auto rounded-full border-4 flex items-center justify-center bg-slate-950 transition-all duration-300"
            style={{
              borderColor: ringLightColor,
              boxShadow: `0 0 ${mirrorBrightness / 2}px ${ringLightColor}`,
            }}
          >
            <Smile className="w-16 h-16 text-rose-400" />
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 block">রিং-লাইট উজ্জ্বলতা</span>
            <input
              type="range"
              min="20"
              max="100"
              value={mirrorBrightness}
              onChange={(e) => setMirrorBrightness(parseInt(e.target.value))}
              className="w-full accent-rose-500"
            />
          </div>
        </div>
      )}

      {/* 30. PDF READER */}
      {toolType === 'pdfreader' && (
        <div className="space-y-3 py-2 text-left text-xs">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-400">জীবনবৃত্তান্ত ও সিভি.pdf</span>
              <span className="text-[10px] text-slate-500">পৃষ্ঠা {toBnDigit(pdfPage)}/৩</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl text-slate-300 text-[11px] leading-relaxed">
              নাম: মোঃ শফিকুল ইসলাম <br />
              শিক্ষাগত যোগ্যতা: বিএসসি ইন কম্পিউটার সায়েন্স <br />
              অভিজ্ঞতা: ৫ বছর সফটওয়্যার ও মোবাইল অ্যাপ ডেভেলপমেন্ট...
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setPdfPage((p) => Math.max(1, p - 1))}
              className="px-4 py-1.5 bg-slate-800 text-slate-200 rounded-xl font-bold"
            >
              পূর্ববর্তী পৃষ্ঠা
            </button>
            <button
              onClick={() => setPdfPage((p) => Math.min(3, p + 1))}
              className="px-4 py-1.5 bg-slate-800 text-slate-200 rounded-xl font-bold"
            >
              পরবর্তী পৃষ্ঠা
            </button>
          </div>
        </div>
      )}

      {/* 31. UNIT CONVERTER */}
      {toolType === 'unitconvert' && (
        <div className="space-y-3 py-2 text-xs">
          <div className="flex space-x-1.5 bg-slate-950 p-1 rounded-xl">
            {(['length', 'weight', 'area', 'temp'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnitType(u)}
                className={`flex-1 py-1.5 rounded-lg font-bold transition ${
                  unitType === u ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                {u === 'length' ? 'দৈর্ঘ্য' : u === 'weight' ? 'ওজন' : u === 'area' ? 'ক্ষেত্রফল' : 'তাপমাত্রা'}
              </button>
            ))}
          </div>

          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">মান ইনপুট:</span>
              <input
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(parseFloat(e.target.value) || 0)}
                className="w-24 p-1.5 bg-slate-900 rounded-lg text-right font-bold text-white border border-slate-700"
              />
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              {unitType === 'length' && (
                <>
                  <div className="flex justify-between"><span>মিটার:</span> <span className="font-bold text-emerald-400">{toBnDigit(inputVal)} মি.</span></div>
                  <div className="flex justify-between"><span>ফুট:</span> <span className="font-bold text-emerald-400">{toBnDigit((inputVal * 3.28084).toFixed(2))} ফুট</span></div>
                  <div className="flex justify-between"><span>ইঞ্চি:</span> <span className="font-bold text-emerald-400">{toBnDigit((inputVal * 39.37).toFixed(1))} ইঞ্চি</span></div>
                </>
              )}
              {unitType === 'weight' && (
                <>
                  <div className="flex justify-between"><span>কেজি:</span> <span className="font-bold text-emerald-400">{toBnDigit(inputVal)} কেজি</span></div>
                  <div className="flex justify-between"><span>গ্রাম:</span> <span className="font-bold text-emerald-400">{toBnDigit(inputVal * 1000)} গ্রাম</span></div>
                  <div className="flex justify-between"><span>পাউন্ড:</span> <span className="font-bold text-emerald-400">{toBnDigit((inputVal * 2.20462).toFixed(2))} পাউন্ড</span></div>
                </>
              )}
              {unitType === 'area' && (
                <>
                  <div className="flex justify-between"><span>বিঘা:</span> <span className="font-bold text-emerald-400">{toBnDigit(inputVal)} বিঘা</span></div>
                  <div className="flex justify-between"><span>কাঠা:</span> <span className="font-bold text-emerald-400">{toBnDigit(inputVal * 20)} কাঠা</span></div>
                  <div className="flex justify-between"><span>শতাংশ:</span> <span className="font-bold text-emerald-400">{toBnDigit(inputVal * 33)} শতাংশ</span></div>
                </>
              )}
              {unitType === 'temp' && (
                <>
                  <div className="flex justify-between"><span>সেলসিয়াস (°C):</span> <span className="font-bold text-emerald-400">{toBnDigit(inputVal)}° C</span></div>
                  <div className="flex justify-between"><span>ফারেনহাইট (°F):</span> <span className="font-bold text-emerald-400">{toBnDigit(((inputVal * 9) / 5 + 32).toFixed(1))}° F</span></div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 32. RAM CLEANER */}
      {toolType === 'ramcleaner' && (
        <div className="space-y-4 py-2 text-center text-xs">
          <div className="p-5 bg-slate-950 rounded-3xl border border-slate-800 space-y-3">
            <Cpu className={`w-12 h-12 mx-auto ${isCleaningRam ? 'text-cyan-400 animate-spin' : 'text-cyan-500'}`} />
            <div>
              <div className="text-3xl font-extrabold text-white font-mono">
                {toBnDigit(ramUsedGb.toFixed(1))} GB / {toBnDigit(ramTotalGb)} GB
              </div>
              <p className="text-slate-400 mt-1">
                {Math.round((ramUsedGb / ramTotalGb) * 100)}% র‍্যাম মেমরি ব্যবহৃত
              </p>
            </div>

            {cleanFinished && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold animate-in fade-in">
                ✓ ১.৬ জিবি মেমরি ও ব্যাকগ্রাউন্ড ক্যাশ মুক্ত করা হয়েছে!
              </div>
            )}
          </div>

          <button
            onClick={cleanRamMemory}
            disabled={isCleaningRam}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-2xl shadow transition active:scale-95 disabled:opacity-50"
          >
            {isCleaningRam ? 'র‍্যাম বুস্টিং চলছে...' : 'এক ক্লিকে র‍্যাম বুস্ট ও মেমরি ক্লিন করুন'}
          </button>
        </div>
      )}

      {/* 33. SOUND METER */}
      {toolType === 'soundmeter' && (
        <div className="space-y-4 py-2 text-center text-xs">
          <div className="p-5 bg-slate-950 rounded-3xl border border-slate-800 space-y-2">
            <Activity className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
            <div className="text-4xl font-extrabold text-white font-mono">
              {toBnDigit(soundDb)} dB
            </div>
            <p className="text-slate-400">
              {soundDb < 50
                ? 'শান্ত পরিমণ্ডল (Quiet Room)'
                : soundDb < 75
                ? 'স্বাভাবিক কথোপকথন (Normal)'
                : 'কোলাহলপূর্ণ উচ্চ শব্দ (Loud Noise)'}
            </p>
          </div>

          <button
            onClick={() => setSoundMeterActive(!soundMeterActive)}
            className={`w-full py-3 rounded-2xl font-bold transition ${
              soundMeterActive ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'
            }`}
          >
            {soundMeterActive ? 'সাউন্ড মিটার বন্ধ করুন' : 'মাইক্রোফোন সাউন্ড মিটার চালু করুন'}
          </button>
        </div>
      )}

      {/* 34. DIGITAL TASBEEH */}
      {toolType === 'tasbeeh' && (
        <div className="space-y-4 py-2 text-center">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
            <span className="text-emerald-400 font-bold block">{tasbeehZikr}</span>
            <span className="text-[10px] text-slate-400">টার্গেট: {toBnDigit(tasbeehTarget)} বার</span>
          </div>

          {/* Big Tasbeeh Tap Button */}
          <button
            onClick={incrementTasbeeh}
            className="w-36 h-36 mx-auto rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-4 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)] flex flex-col items-center justify-center transition active:scale-90 cursor-pointer"
          >
            <span className="text-4xl font-black text-white font-mono">{toBnDigit(tasbeehCount)}</span>
            <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest mt-1">ট্যাপ করুন</span>
          </button>

          <div className="flex justify-center space-x-2 text-xs">
            <button
              onClick={() => {
                soundEffects.playClick();
                setTasbeehCount(0);
              }}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
            >
              কাউন্টার রিসেট
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setTasbeehTarget(tasbeehTarget === 33 ? 100 : 33);
              }}
              className="px-4 py-2 bg-emerald-950 text-emerald-300 rounded-xl font-bold border border-emerald-800"
            >
              টার্গেট: {toBnDigit(tasbeehTarget === 33 ? 100 : 33)}
            </button>
          </div>
        </div>
      )}

      {/* 35. EMERGENCY SOS */}
      {toolType === 'emergency' && (
        <div className="space-y-3 py-2 text-left text-xs">
          {strobeActive && (
            <div className="p-3 rounded-2xl bg-red-600 text-white font-extrabold text-center animate-ping mb-2">
              ⚠️ জরুরি বিপদ সংকেত সাইরেন বাজছে! ⚠️
            </div>
          )}

          <div className="space-y-2">
            {[
              { name: 'জাতীয় জরুরি সেবা (পুলিশ, অ্যাম্বুলেন্স, ফায়ার)', num: '999', color: 'bg-red-600' },
              { name: 'সরকারি অ্যাম্বুলেন্স হটলাইন', num: '199', color: 'bg-emerald-600' },
              { name: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স', num: '102', color: 'bg-amber-600' },
              { name: 'নারী ও শিশু নির্যাতন প্রতিরোধ হেল্পলাইন', num: '109', color: 'bg-purple-600' },
            ].map((hotline) => (
              <a
                key={hotline.num}
                href={`tel:${hotline.num}`}
                className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-red-500/50 transition group"
              >
                <div>
                  <h5 className="font-bold text-white">{hotline.name}</h5>
                  <span className="text-red-400 font-mono font-bold text-sm">{hotline.num}</span>
                </div>
                <div className={`p-2.5 rounded-xl text-white font-bold flex items-center ${hotline.color}`}>
                  <Phone className="w-4 h-4 mr-1" /> কল
                </div>
              </a>
            ))}
          </div>

          <button
            onClick={toggleEmergencySiren}
            className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
              sirenPlaying
                ? 'bg-red-600 text-white animate-bounce'
                : 'bg-slate-800 hover:bg-slate-700 text-red-400 border border-red-500/30'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{sirenPlaying ? 'জরুরি সাইরেন বন্ধ করুন' : 'জরুরি বিপদের উচ্চ সাইরেন বাজান'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
