'use client';

import { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanSuccess: (itemName: string) => void;
}

export default function QRScanner({ open, onOpenChange, onScanSuccess }: QRScannerProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scannedQRCode, setScannedQRCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Debug: Log when video ref becomes available
  useEffect(() => {
    if (videoRef.current) {
      console.log('Video ref is now available');
    }
  }, [videoRef.current]);

  // Test jsQR library on component mount
  useEffect(() => {
    console.log('Testing jsQR library...');
    try {
      // Create a simple test to verify jsQR is working
      const testCanvas = document.createElement('canvas');
      testCanvas.width = 100;
      testCanvas.height = 100;
      const testContext = testCanvas.getContext('2d');
      if (testContext) {
        // Fill with white
        testContext.fillStyle = 'white';
        testContext.fillRect(0, 0, 100, 100);
        const testImageData = testContext.getImageData(0, 0, 100, 100);
        const testResult = jsQR(testImageData.data, testImageData.width, testImageData.height);
        console.log('jsQR library test result:', testResult); // Should be null for white image
        console.log('jsQR library is working properly');
      }
    } catch (error) {
      console.error('jsQR library test failed:', error);
    }
  }, []);

  // Handle dialog open/close
  const handleDialogOpenChange = (dialogOpen: boolean) => {
    onOpenChange(dialogOpen);
    if (!dialogOpen) {
      // Clear scanned code when dialog closes
      setScannedQRCode('');
    }
  };

  const startCamera = async () => {
    if (isCameraActive || isLoading) return; // Prevent multiple calls
    
    // Double-check video ref is available
    if (!videoRef.current) {
      console.error('Video ref not available, cannot start camera');
      return;
    }
    
    setIsLoading(true);
    console.log('Starting camera...');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      console.log('Camera stream obtained:', stream);
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsCameraActive(true);
      
             // Wait for video to be ready before starting scan
       videoRef.current.onloadedmetadata = () => {
         console.log('Video metadata loaded');
         console.log('Video dimensions:', videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight);
         console.log('Video ready state:', videoRef.current?.readyState);
         setIsLoading(false);
         
         // Start scanning after a short delay to ensure video is playing
         setTimeout(() => {
           console.log('Starting scan after video metadata loaded');
           scanQRCode();
         }, 500);
       };

      // Handle video play errors
      videoRef.current.onerror = () => {
        console.error('Video playback error');
        setIsLoading(false);
        alert('Error starting video stream');
      };
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera for QR scanning. Please ensure camera permissions are granted.');
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setIsScanning(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

      const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current || !isCameraActive) {
      console.log('Scan prerequisites not met:', {
        videoRef: !!videoRef.current,
        canvasRef: !!canvasRef.current,
        isCameraActive
      });
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Canvas context not available');
      return;
    }

    console.log('Starting QR scan loop...');
    setIsScanning(true);
    let frameCount = 0;
    let lastScanTime = 0;

    const scanFrame = () => {
      frameCount++;
      const now = Date.now();
      
      // Log first few frames to confirm loop is running
      if (frameCount <= 5) {
        console.log(`Scan frame ${frameCount} - Camera active: ${isCameraActive}, Video ready: ${video?.readyState === video?.HAVE_ENOUGH_DATA}`);
      }
      
      // Check if we should continue scanning
      if (!isCameraActive || !video || !canvas) {
        console.log('Scan loop stopped - prerequisites not met');
        setIsScanning(false);
        return;
      }
      
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Log every 30 frames (about once per second) to see if scanning is working
        if (frameCount % 30 === 0) {
          console.log(`Scanning frame ${frameCount}, video ready: ${video.readyState === video.HAVE_ENOUGH_DATA}, dimensions: ${canvas.width}x${canvas.height}`);
          console.log('ImageData properties:', {
            dataLength: imageData.data.length,
            width: imageData.width,
            height: imageData.height
          });
        }
        
        // Scan every frame for better responsiveness (removed throttling)
        try {
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code) {
            console.log('QR Code found!', code.data);
            const qrCode = code.data;
            setScannedQRCode(qrCode);
            
            // Show success indicator briefly before closing
            setIsScanning(false);
            setTimeout(() => {
              // Call the success callback with the scanned QR code
              onScanSuccess(qrCode);
              handleDialogOpenChange(false);
            }, 500);
            return;
          }
        } catch (error) {
          console.error('Error in jsQR processing:', error);
        }
      } else {
        if (frameCount % 30 === 0) {
          console.log(`Frame ${frameCount}: Video not ready yet. Ready state: ${video.readyState}, Camera active: ${isCameraActive}`);
        }
      }
      
      // Continue the loop
      if (isCameraActive) {
        requestAnimationFrame(scanFrame);
      } else {
        console.log('Scan loop stopped - camera not active');
        setIsScanning(false);
      }
    };

    scanFrame();
  };

  // Handle camera startup when dialog opens
  useEffect(() => {
    if (open && !isCameraActive) {
      // Auto-start camera when dialog opens with longer delay to ensure DOM is ready
      setTimeout(() => {
        if (videoRef.current) {
          console.log('Auto-starting camera...');
          startCamera();
        } else {
          console.log('Video ref not ready yet for auto-start, will use manual button');
        }
      }, 1500);
    } else if (!open) {
      // Stop camera when dialog closes
      stopCamera();
    }
  }, [open, isCameraActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <DialogTitle>QR Code Scanner</DialogTitle>
              <DialogDescription>Scan inventory items quickly</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Camera Section */}
        <div className="relative bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
          <div className="relative">
            {/* Always render video element for ref availability */}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className={`w-full aspect-video object-cover ${!isCameraActive ? 'hidden' : ''}`}
            />
            
            {/* Canvas for QR scanning */}
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Camera not active overlay */}
            {!isCameraActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Camera Ready</p>
                  <p className="text-gray-500 text-sm mt-1">Click the button below to start</p>
                </div>
              </div>
            )}
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                  <p>Starting camera...</p>
                </div>
              </div>
            )}
            
                                      {/* Scanning Overlay - only show when camera is active */}
             {isCameraActive && (
               <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-blue-500 border-dashed rounded-lg">
                   <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
                   <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
                   <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
                   <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
                 </div>
                 {/* Scanning indicator */}
                 <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                   {isScanning ? 'Scanning...' : 'Camera Active'}
                 </div>
               </div>
             )}
             
             {/* Success Overlay - show when QR code is found */}
             {scannedQRCode && (
               <div className="absolute inset-0 bg-green-500 bg-opacity-75 flex items-center justify-center">
                 <div className="text-center text-white">
                   <div className="mx-auto w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                   </div>
                   <p className="text-lg font-semibold">QR Code Found!</p>
                   <p className="text-sm opacity-90">{scannedQRCode}</p>
                 </div>
               </div>
             )}
          </div>
        </div>

                 {/* Camera Controls */}
         <div className="flex justify-center space-x-3">
           {!isCameraActive ? (
             <button
               onClick={startCamera}
               disabled={isLoading}
               className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
               </svg>
               <span>{isLoading ? 'Starting Camera...' : 'Start Camera Manually'}</span>
             </button>
           ) : (
             <div className="flex space-x-2">
               <button
                 onClick={stopCamera}
                 className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white border border-red-700 hover:bg-red-700 transition-colors text-sm"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                 </svg>
                 <span>Stop Camera</span>
               </button>
                               <button
                  onClick={() => {
                    console.log('Test QR scan triggered');
                    onScanSuccess('TEST_QR_CODE_123');
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white border border-green-700 hover:bg-green-700 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Test Scan</span>
                </button>
                <button
                  onClick={() => {
                    console.log('Manual scan start triggered');
                    if (isCameraActive && !isScanning) {
                      scanQRCode();
                    } else {
                      console.log('Camera not active or already scanning');
                    }
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                  </svg>
                  <span>Start Scan</span>
                </button>
                <button
                  onClick={() => {
                    // Create a simple black and white pattern to test jsQR
                    const testCanvas = document.createElement('canvas');
                    testCanvas.width = 200;
                    testCanvas.height = 200;
                    const testContext = testCanvas.getContext('2d');
                    if (testContext) {
                      // Create a simple pattern that might be detected as a QR code
                      testContext.fillStyle = 'white';
                      testContext.fillRect(0, 0, 200, 200);
                      testContext.fillStyle = 'black';
                      testContext.fillRect(50, 50, 100, 100);
                      testContext.fillStyle = 'white';
                      testContext.fillRect(60, 60, 80, 80);
                      testContext.fillStyle = 'black';
                      testContext.fillRect(70, 70, 60, 60);
                      
                      const testImageData = testContext.getImageData(0, 0, 200, 200);
                      console.log('Testing jsQR with pattern...');
                      try {
                        const testResult = jsQR(testImageData.data, testImageData.width, testImageData.height);
                        console.log('Pattern test result:', testResult);
                      } catch (error) {
                        console.error('Pattern test error:', error);
                      }
                    }
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white border border-purple-700 hover:bg-purple-700 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Test Pattern</span>
                </button>
                <button
                  onClick={() => {
                    if (videoRef.current && canvasRef.current) {
                      const video = videoRef.current;
                      const canvas = canvasRef.current;
                      const context = canvas.getContext('2d');
                      if (context) {
                        canvas.height = video.videoHeight;
                        canvas.width = video.videoWidth;
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                        console.log('Manual frame capture:', {
                          dimensions: `${canvas.width}x${canvas.height}`,
                          dataLength: imageData.data.length,
                          samplePixels: Array.from(imageData.data.slice(0, 20)) // First 20 pixels
                        });
                        
                        // Try to scan this frame
                        try {
                          const code = jsQR(imageData.data, imageData.width, imageData.height);
                          console.log('Manual scan result:', code);
                        } catch (error) {
                          console.error('Manual scan error:', error);
                        }
                      }
                    }
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white border border-yellow-700 hover:bg-yellow-700 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Debug Frame</span>
                </button>
             </div>
           )}
         </div>

        {/* Instructions */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isCameraActive 
              ? "Point your camera at a QR code to scan" 
              : "Camera will start automatically, or click the button above"
            }
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
