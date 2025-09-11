'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface QRScanner1Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  setValue: (value: string) => void;
}

export default function QRScanner1({ open, setOpen, setValue }: QRScanner1Props) {
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ---- STOP SCANNER ----
  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        console.log('Stopping scanner...');
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  }, []);

  // ---- OPEN/CLOSE DIALOG ----
  const handleDialogOpenChange = async (dialogOpen: boolean) => {
    if (!dialogOpen) {
      await stopScanner(); // wait for scanner to fully stop
    }
    setOpen(dialogOpen);
  };

  // ---- SCAN SUCCESS ----
  const handleScanSuccess = useCallback(
    (decodedText: string) => {
      console.log('QR Code detected:', decodedText);

      setValue(decodedText);
      setShowSuccess(true);

      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    },
    [setValue]
  );

  // ---- START SCANNER ----
  const startScanner = useCallback(() => {
    if (!containerRef.current || scannerRef.current) {
      console.log('Scanner already running or container not ready');
      return;
    }

    console.log('Starting Html5Qrcode...');
    const html5QrCode = new Html5Qrcode('qr-reader');
    scannerRef.current = html5QrCode;

    html5QrCode
      .start(
        { facingMode: 'environment' }, // use "user" for front camera
        {
          fps: 15,
          qrbox: { width: 300, height: 300 },
        },
        handleScanSuccess,
        (errorMessage) => {
          console.log('Scan error:', errorMessage);
        }
      )
      .then(() => {
        setIsScanning(true);
        console.log('Scanner started');
      })
      .catch((err) => {
        console.error('Error starting scanner:', err);
        setIsScanning(false);
        alert('Failed to start camera. Check permissions or HTTPS.');
      });
  }, [handleScanSuccess]);

  // ---- EFFECT: dialog lifecycle ----
  useEffect(() => {
    if (open) {
      startScanner();
    } else {
      stopScanner();
    }
    return () => {
      stopScanner();
    };
  }, [open, startScanner, stopScanner]);

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
        {/* Hidden audio element */}
        <audio ref={audioRef} preload="auto">
          <source
            src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
            type="audio/wav"
          />
        </audio>

        <DialogHeader className="text-center pb-3">
          <DialogTitle className="text-xl font-bold text-gray-900">
            QR Scanner
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Point your camera at any QR code to scan
          </DialogDescription>
        </DialogHeader>

        {/* Scanner Container */}
        <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-inner flex-1 min-h-0">
          <div className="relative h-full">
            <div
              ref={containerRef}
              id="qr-reader"
              className="w-full h-full rounded-xl"
            />

            {/* Loading overlay */}
            {!isScanning && (
              <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center rounded-xl">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-3"></div>
                  <p className="text-base font-medium">Initializing scanner...</p>
                  <p className="text-xs opacity-80 mt-1">Please wait</p>
                </div>
              </div>
            )}

            {/* Success overlay */}
            {showSuccess && (
              <div className="absolute inset-0 bg-green-500 bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl">
                <div className="text-center text-white p-4">
                  <div className="mx-auto w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-bold mb-2">QR Code Scanned!</p>
                  <p className="text-sm opacity-90">Successfully detected</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center pt-3">
          {!isScanning ? (
            <button
              onClick={startScanner}
              className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Start Scanner</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={stopScanner}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm"
              >
                Stop
              </button>
              <button
                onClick={() => handleScanSuccess('TEST_QR_CODE_HTML5_123')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm"
              >
                Test
              </button>
            </div>
          )}
        </div>

        <div className="text-center pt-3 pb-2">
          <p className="text-xs text-gray-600 font-medium">
            {isScanning
              ? 'Point your camera at any QR code to scan'
              : 'Initializing camera...'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Scanned values will be sent to parent component
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
