
import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  embedUrl: string;
  title: string;
}

const VideoPlayer = ({ embedUrl, title }: VideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    const iframe = iframeRef.current;
    
    const handleLoad = () => {
      setLoading(false);
    };
    
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }
    
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
      }
    };
  }, [embedUrl]);

  return (
    <div className="w-full rounded-xl overflow-hidden glassmorphism border border-neon-green/30">
      <div className="aspect-video relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin"></div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s ease' }}
        ></iframe>
      </div>
      <div className="p-4 bg-dark-200/80">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
    </div>
  );
};

export default VideoPlayer;
