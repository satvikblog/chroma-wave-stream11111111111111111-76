import { useEffect, useState } from 'react';
import { 
  supabase, Week, Topic, Video, 
  getWeeks, getTopics, getVideos 
} from '../lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import VideoPlayer from '../components/VideoPlayer';
import Layout from '../components/Layout';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeWeek, setActiveWeek] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weeks
        const { data: weeksData, error: weeksError } = await getWeeks();
        
        if (weeksError) throw weeksError;
        
        // Fetch topics
        const { data: topicsData, error: topicsError } = await getTopics();
        
        if (topicsError) throw topicsError;
        
        // Fetch videos
        const { data: videosData, error: videosError } = await getVideos();
        
        if (videosError) throw videosError;
        
        setWeeks(weeksData as Week[]);
        setTopics(topicsData as Topic[]);
        setVideos(videosData as Video[]);
        
        // Set default active week and video
        if (weeksData.length > 0) {
          setActiveWeek(weeksData[0].id.toString());
          
          // Find first video in first topic of first week
          if (topicsData.length > 0) {
            const firstTopicInWeek = topicsData.find(
              topic => topic.week_id === weeksData[0].id
            );
            
            if (firstTopicInWeek && videosData.length > 0) {
              const firstVideo = videosData.find(
                video => video.topic_id === firstTopicInWeek.id
              );
              
              if (firstVideo) {
                setSelectedVideo(firstVideo as Video);
              }
            }
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error loading content",
          description: "There was a problem loading the videos. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="w-16 h-16 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  const getTopicsByWeek = (weekId: number) => {
    return topics.filter(topic => topic.week_id === weekId);
  };

  const getVideosByTopic = (topicId: number) => {
    return videos.filter(video => video.topic_id === topicId);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {selectedVideo ? (
            <div className="space-y-6">
              <VideoPlayer 
                embedUrl={selectedVideo.embed_url} 
                title={selectedVideo.title} 
              />
              
              <div className="glassmorphism rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                <p className="text-muted-foreground">
                  {topics.find(t => t.id === selectedVideo?.topic_id)?.name} - {
                    weeks.find(w => 
                      w.id === topics.find(t => t.id === selectedVideo?.topic_id)?.week_id
                    )?.name
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="glassmorphism rounded-xl p-6 flex flex-col items-center justify-center h-64">
              <h2 className="text-2xl font-bold text-center">Welcome to ChromaStream</h2>
              <p className="text-muted-foreground text-center mt-2">
                Please select a video from the playlist to start watching.
              </p>
            </div>
          )}
        </div>
        
        <div>
          <div className="glassmorphism rounded-xl p-4 sticky top-24">
            <h2 className="text-xl font-bold mb-4 px-2">Course Content</h2>
            {weeks.length > 0 ? (
              <Tabs 
                value={activeWeek || weeks[0].id.toString()} 
                onValueChange={setActiveWeek}
                className="w-full"
              >
                <TabsList className="w-full flex overflow-x-auto hide-scrollbar mb-4">
                  {weeks.map((week) => (
                    <TabsTrigger 
                      key={week.id} 
                      value={week.id.toString()}
                      className="flex-1 min-w-[100px] data-[state=active]:border-b-2 data-[state=active]:border-neon-green"
                    >
                      {week.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {weeks.map((week) => (
                  <TabsContent key={week.id} value={week.id.toString()}>
                    <div className="max-h-[60vh] overflow-y-auto pr-2">
                      <Accordion type="multiple" className="space-y-2">
                        {getTopicsByWeek(week.id).map((topic) => (
                          <AccordionItem key={topic.id} value={topic.id.toString()} className="border border-border/20 rounded-lg overflow-hidden">
                            <AccordionTrigger className="px-4 py-3 hover:bg-dark-200/60">
                              {topic.name}
                            </AccordionTrigger>
                            <AccordionContent className="px-2 pb-2">
                              <ul className="space-y-1">
                                {getVideosByTopic(topic.id).map((video) => (
                                  <li key={video.id}>
                                    <button
                                      onClick={() => handleVideoSelect(video)}
                                      className={`w-full text-left px-4 py-2 rounded-md hover:bg-dark-200/80 transition-colors
                                        ${selectedVideo?.id === video.id ? 'bg-dark-200/80 border-l-2 border-neon-green' : ''}
                                      `}
                                    >
                                      {video.title}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No content available yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
