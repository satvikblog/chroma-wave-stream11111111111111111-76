
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
import { Card } from '@/components/ui/card';
import { Terminal, PlayCircle, Clock } from 'lucide-react';

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
        <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
          <div className="w-16 h-16 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin"></div>
          <p className="text-neon-green animate-pulse">Loading content...</p>
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

  // Get featured video (just using the first one for now)
  const featuredVideo = videos.length > 0 ? videos[0] : null;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="glassmorphism rounded-xl overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/20 text-neon-green text-xs font-medium mb-6">
                <Terminal className="w-3 h-3" /> 
                <span>CYBERSECURITY TRAINING</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-glow">
                Enhance Your <span className="text-neon-green">Hacking Skills</span> with Expert-Led Videos
              </h1>
              <p className="text-muted-foreground mb-8 max-w-xl">
                Access comprehensive cybersecurity tutorials, hands-on labs, and expert insights to master ethical hacking and penetration testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {selectedVideo ? (
            <div className="space-y-6">
              <Card className="glassmorphism overflow-hidden border-neon-green/10">
                <VideoPlayer 
                  embedUrl={selectedVideo.embed_url} 
                  title={selectedVideo.title} 
                />
              </Card>
              
              <div className="glassmorphism rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <PlayCircle className="text-neon-green" size={18} />
                  <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>Module {topics.find(t => t.id === selectedVideo?.topic_id)?.name}</span>
                  </div>
                  <span>•</span>
                  <span>Week {
                    weeks.find(w => 
                      w.id === topics.find(t => t.id === selectedVideo?.topic_id)?.week_id
                    )?.name
                  }</span>
                </div>
                
                <p className="text-muted-foreground text-sm">
                  Learn advanced techniques and strategies for enhancing your cybersecurity skills. 
                  This lesson covers important concepts with practical examples.
                </p>
              </div>
            </div>
          ) : (
            <div className="glassmorphism rounded-xl p-6 flex flex-col items-center justify-center h-64">
              <h2 className="text-2xl font-bold text-center mb-2">Welcome to HackOps Streaming</h2>
              <p className="text-muted-foreground text-center">
                Please select a video from the curriculum to start your learning journey.
              </p>
            </div>
          )}
        </div>
        
        <div>
          <div className="glassmorphism rounded-xl p-4 sticky top-24">
            <div className="flex items-center gap-2 px-2 mb-4">
              <Terminal size={18} className="text-neon-green" />
              <h2 className="text-xl font-bold">Course Curriculum</h2>
            </div>
            
            {weeks.length > 0 ? (
              <Tabs 
                value={activeWeek || weeks[0].id.toString()} 
                onValueChange={setActiveWeek}
                className="w-full"
              >
                <TabsList className="w-full flex overflow-x-auto hide-scrollbar mb-4 bg-dark-200/60">
                  {weeks.map((week) => (
                    <TabsTrigger 
                      key={week.id} 
                      value={week.id.toString()}
                      className="flex-1 min-w-[100px] data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green"
                    >
                      Week {week.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {weeks.map((week) => (
                  <TabsContent key={week.id} value={week.id.toString()}>
                    <div className="max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neon-green/20 scrollbar-track-transparent">
                      <Accordion type="multiple" className="space-y-2">
                        {getTopicsByWeek(week.id).map((topic) => (
                          <AccordionItem key={topic.id} value={topic.id.toString()} className="border border-neon-green/10 rounded-lg overflow-hidden bg-dark-200/30">
                            <AccordionTrigger className="px-4 py-3 hover:bg-dark-200/60 text-sm font-medium">
                              {topic.name}
                            </AccordionTrigger>
                            <AccordionContent className="px-2 pb-2">
                              <ul className="space-y-1">
                                {getVideosByTopic(topic.id).map((video) => (
                                  <li key={video.id}>
                                    <button
                                      onClick={() => handleVideoSelect(video)}
                                      className={`w-full text-left px-4 py-2 rounded-md hover:bg-dark-200/80 transition-colors flex items-center gap-2 text-sm
                                        ${selectedVideo?.id === video.id ? 'bg-neon-green/10 border-l-2 border-neon-green' : ''}
                                      `}
                                    >
                                      <PlayCircle size={14} className={selectedVideo?.id === video.id ? 'text-neon-green' : 'text-muted-foreground'} />
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
