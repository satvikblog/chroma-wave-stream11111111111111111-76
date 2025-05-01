import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Week, Topic, Video,
  getWeeks, getTopics, getVideos,
  addWeek, addTopic, addVideo,
  deleteWeek, deleteTopic, deleteVideo
} from '../lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/Layout';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('weeks');
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form states
  const [newWeekName, setNewWeekName] = useState('');
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicWeekId, setNewTopicWeekId] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTopicId, setNewVideoTopicId] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';
      setIsAuthenticated(isAdmin);
      
      if (!isAdmin) {
        navigate('/admin');
      }
    };
    
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error fetching data",
        description: "There was a problem loading the data.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };

  const handleAddWeek = async () => {
    if (!newWeekName.trim()) {
      toast({
        title: "Error",
        description: "Week name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await addWeek(newWeekName.trim());

      if (error) throw error;

      toast({
        title: "Success",
        description: "Week added successfully",
      });

      setNewWeekName('');
      fetchData();
    } catch (error) {
      console.error('Error adding week:', error);
      toast({
        title: "Error",
        description: "Failed to add week",
        variant: "destructive",
      });
    }
  };

  const handleAddTopic = async () => {
    if (!newTopicName.trim() || !newTopicWeekId) {
      toast({
        title: "Error",
        description: "Topic name and week are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await addTopic(
        newTopicName.trim(), 
        parseInt(newTopicWeekId)
      );

      if (error) throw error;

      toast({
        title: "Success",
        description: "Topic added successfully",
      });

      setNewTopicName('');
      setNewTopicWeekId('');
      fetchData();
    } catch (error) {
      console.error('Error adding topic:', error);
      toast({
        title: "Error",
        description: "Failed to add topic",
        variant: "destructive",
      });
    }
  };

  const handleAddVideo = async () => {
    if (!newVideoTitle.trim() || !newVideoUrl.trim() || !newVideoTopicId) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await addVideo(
        newVideoTitle.trim(),
        newVideoUrl.trim(),
        parseInt(newVideoTopicId)
      );

      if (error) throw error;

      toast({
        title: "Success",
        description: "Video added successfully",
      });

      setNewVideoTitle('');
      setNewVideoUrl('');
      setNewVideoTopicId('');
      fetchData();
    } catch (error) {
      console.error('Error adding video:', error);
      toast({
        title: "Error",
        description: "Failed to add video",
        variant: "destructive",
      });
    }
  };

  const handleDeleteWeek = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this week? All associated topics and videos will also be deleted.')) {
      return;
    }
    
    try {
      const { error } = await deleteWeek(id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Week and all its content deleted successfully",
      });
      
      fetchData();
    } catch (error) {
      console.error('Error deleting week:', error);
      toast({
        title: "Error",
        description: "Failed to delete week",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTopic = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this topic? All associated videos will also be deleted.')) {
      return;
    }
    
    try {
      const { error } = await deleteTopic(id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Topic and all its videos deleted successfully",
      });
      
      fetchData();
    } catch (error) {
      console.error('Error deleting topic:', error);
      toast({
        title: "Error",
        description: "Failed to delete topic",
        variant: "destructive",
      });
    }
  };

  const handleDeleteVideo = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this video?')) {
      return;
    }
    
    try {
      const { error } = await deleteVideo(id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Video deleted successfully",
      });
      
      fetchData();
    } catch (error) {
      console.error('Error deleting video:', error);
      toast({
        title: "Error",
        description: "Failed to delete video",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout showAdminLink={false}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="weeks">Weeks</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weeks">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Weeks Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-neon-green hover:bg-neon-green/90 text-black">Add Week</Button>
              </DialogTrigger>
              <DialogContent className="glassmorphism">
                <DialogHeader>
                  <DialogTitle>Add New Week</DialogTitle>
                  <DialogDescription>
                    Create a new week for organizing topics.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="week-name">Week Name</Label>
                    <Input
                      id="week-name"
                      placeholder="e.g., Week 1: Introduction"
                      value={newWeekName}
                      onChange={(e) => setNewWeekName(e.target.value)}
                      className="bg-dark-300/50"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddWeek} className="bg-neon-green hover:bg-neon-green/90 text-black">Add Week</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {weeks.length > 0 ? (
                weeks.map((week) => (
                  <div key={week.id} className="glassmorphism rounded-xl p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{week.name}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteWeek(week.id)}
                      >
                        Delete
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Topics: {topics.filter(t => t.week_id === week.id).length}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No weeks available. Create a new week to get started.
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="topics">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Topics Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-neon-green hover:bg-neon-green/90 text-black" disabled={weeks.length === 0}>Add Topic</Button>
              </DialogTrigger>
              <DialogContent className="glassmorphism">
                <DialogHeader>
                  <DialogTitle>Add New Topic</DialogTitle>
                  <DialogDescription>
                    Create a new topic for a specific week.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic-name">Topic Name</Label>
                    <Input
                      id="topic-name"
                      placeholder="e.g., Getting Started with React"
                      value={newTopicName}
                      onChange={(e) => setNewTopicName(e.target.value)}
                      className="bg-dark-300/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic-week">Week</Label>
                    <Select value={newTopicWeekId} onValueChange={setNewTopicWeekId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a week" />
                      </SelectTrigger>
                      <SelectContent>
                        {weeks.map((week) => (
                          <SelectItem key={week.id} value={week.id.toString()}>
                            {week.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddTopic} className="bg-neon-green hover:bg-neon-green/90 text-black">Add Topic</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {topics.length > 0 ? (
                topics.map((topic) => {
                  const week = weeks.find(w => w.id === topic.week_id);
                  return (
                    <div key={topic.id} className="glassmorphism rounded-xl p-5">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">{topic.name}</h3>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteTopic(topic.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Week: {week?.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Videos: {videos.filter(v => v.topic_id === topic.id).length}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  {weeks.length === 0 
                    ? "Create weeks first before adding topics."
                    : "No topics available. Create a new topic to get started."
                  }
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Videos Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-neon-green hover:bg-neon-green/90 text-black" disabled={topics.length === 0}>Add Video</Button>
              </DialogTrigger>
              <DialogContent className="glassmorphism">
                <DialogHeader>
                  <DialogTitle>Add New Video</DialogTitle>
                  <DialogDescription>
                    Add a new video to a specific topic.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-title">Video Title</Label>
                    <Input
                      id="video-title"
                      placeholder="e.g., Introduction to React Hooks"
                      value={newVideoTitle}
                      onChange={(e) => setNewVideoTitle(e.target.value)}
                      className="bg-dark-300/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-url">Embed URL</Label>
                    <Input
                      id="video-url"
                      placeholder="e.g., https://mega.nz/embed/..."
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      className="bg-dark-300/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-topic">Topic</Label>
                    <Select value={newVideoTopicId} onValueChange={setNewVideoTopicId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => {
                          const week = weeks.find(w => w.id === topic.week_id);
                          return (
                            <SelectItem key={topic.id} value={topic.id.toString()}>
                              {topic.name} ({week?.name})
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddVideo} className="bg-neon-green hover:bg-neon-green/90 text-black">Add Video</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid gap-4">
              {videos.length > 0 ? (
                videos.map((video) => {
                  const topic = topics.find(t => t.id === video.topic_id);
                  const week = topic ? weeks.find(w => w.id === topic.week_id) : null;
                  return (
                    <div key={video.id} className="glassmorphism rounded-xl p-5 flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{video.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Topic: {topic?.name}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Week: {week?.name}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 break-all">
                          URL: {video.embed_url}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4 flex md:flex-col gap-2">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteVideo(video.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  {topics.length === 0 
                    ? "Create topics first before adding videos."
                    : "No videos available. Create a new video to get started."
                  }
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default AdminDashboard;
