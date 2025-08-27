'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
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
   const scannerRef = useRef<Html5QrcodeScanner | null>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const audioRef = useRef<HTMLAudioElement | null>(null);

           // Handle dialog open/close
    const handleDialogOpenChange = (dialogOpen: boolean) => {
      setOpen(dialogOpen);
      if (!dialogOpen) {
        stopScanner();
      }
    };

                                               // Handle scan success - update parent value and show success notification
      const handleScanSuccess = useCallback((decodedText: string) => {
        console.log('QR Code detected:', decodedText);
        
        // Update parent value
        setValue(decodedText);
        
        // Show success notification
        setShowSuccess(true);
        
        // Play success sound
        if (audioRef.current) {
          audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }
        
        // Hide success notification after 2 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }, [setValue]);

     const startScanner = useCallback(() => {
     if (scannerRef.current || !containerRef.current) {
       console.log('Scanner already running or container not available');
       return;
     }

     console.log('Starting HTML5 QR Scanner...');
     console.log('Container ref:', containerRef.current);
     console.log('Dialog open:', open);
     setIsScanning(true);

     try {
              // Create new scanner instance
        scannerRef.current = new Html5QrcodeScanner(
          "qr-reader", // Element ID
          {
            fps: 15, // Higher frames per second for better performance
            qrbox: { width: 300, height: 300 }, // Larger QR code detection area
            aspectRatio: 1.0, // Square aspect ratio
            supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA], // Only camera scanning
            showTorchButtonIfSupported: true, // Show torch button if supported
            showZoomSliderIfSupported: true, // Show zoom slider if supported
            rememberLastUsedCamera: true, // Remember last used camera
          },
          false // Verbose logging
        );

              // Define success callback
        const onScanSuccess = (decodedText: string) => {
          handleScanSuccess(decodedText);
        };

       // Define error callback
       const onScanError = () => {
         // Ignore errors during scanning - they're normal
         // console.log('Scan error:', errorMessage);
       };

       // Start the scanner
       scannerRef.current.render(onScanSuccess, onScanError);
       
       console.log('HTML5 QR Scanner started successfully');
     } catch (error) {
       console.error('Error starting HTML5 QR Scanner:', error);
       setIsScanning(false);
       
       // Check for specific error types
       if (error instanceof Error) {
         if (error.message.includes('Permission')) {
           alert('Camera permission denied. Please allow camera access and try again.');
         } else if (error.message.includes('NotFound')) {
           alert('No camera found. Please check your device has a camera.');
         } else {
           alert(`Error starting QR scanner: ${error.message}`);
         }
       } else {
         alert('Error starting QR scanner. Please try again.');
       }
     }
   }, [open, handleScanSuccess]);

  const stopScanner = useCallback(() => {
    if (scannerRef.current) {
      console.log('Stopping HTML5 QR Scanner...');
      try {
        scannerRef.current.clear();
        scannerRef.current = null;
      } catch (error) {
        console.error('Error stopping scanner:', error);
      }
    }
    setIsScanning(false);
  }, []);

  // Handle scanner lifecycle
  useEffect(() => {
    if (open && !scannerRef.current) {
      // Start scanner when dialog opens with a small delay
      const timer = setTimeout(() => {
        startScanner();
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (!open) {
      stopScanner();
    }
  }, [open, startScanner, stopScanner]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

     return (
          <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-w-md max-h-[80vh] bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
          {/* Hidden audio element for success sound */}
          <audio ref={audioRef} preload="auto">
            <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
          </audio>
                 <DialogHeader className="text-center pb-3">
           <DialogTitle className="text-xl font-bold text-gray-900">QR Scanner</DialogTitle>
           <DialogDescription className="text-sm text-gray-600">Point your camera at any QR code to scan</DialogDescription>
         </DialogHeader>

                 {/* Scanner Container */}
         <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-inner flex-1 min-h-0">
           <div className="relative h-full">
             {/* HTML5 QR Scanner will be rendered here */}
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
              
              {/* Success notification overlay */}
              {showSuccess && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl">
                  <div className="text-center text-white p-4">
                    <div className="mx-auto w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-lg font-bold mb-2">QR Code Scanned!</p>
                    <p className="text-sm opacity-90">Successfully detected</p>
                  </div>
                </div>
              )}
            
            
          </div>
        </div>

                 {/* Scanner Controls */}
         <div className="flex justify-center pt-3">
           {!isScanning ? (
             <button
               onClick={startScanner}
               className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
               </svg>
               <span>Start Scanner</span>
             </button>
           ) : (
             <div className="flex space-x-2">
               <button
                 onClick={stopScanner}
                 className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                 </svg>
                 <span>Stop</span>
               </button>
                                <button
                   onClick={() => {
                     console.log('Test QR scan triggered');
                     handleScanSuccess('TEST_QR_CODE_HTML5_123');
                   }}
                   className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm"
                 >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <span>Test</span>
               </button>
             </div>
           )}
         </div>

                 {/* Instructions */}
         <div className="text-center pt-3 pb-2">
           <p className="text-xs text-gray-600 font-medium">
             {isScanning 
               ? "Point your camera at any QR code to scan" 
               : "Initializing camera..."
             }
           </p>
           <p className="text-xs text-gray-500 mt-1">
              Scanned values will be sent to parent component
            </p>
         </div>
      </DialogContent>
    </Dialog>
  );
}
