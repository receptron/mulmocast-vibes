import { useState } from "react";
import { Grid, List, Play, Eye, Calendar, Plus, Volume2, Pause, Activity, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import SocketChat from "@/components/SocketChat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  // Sample data for projects
  const items = [
    {
      id: 1,
      title: "Product Demo Video",
      type: "video",
      thumbnail:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      date: "2024-05-20",
      sessionActive: true,
      hasErrors: false,
    },
    {
      id: 2,
      title: "Tech Talk Podcast",
      type: "audio",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      date: "2024-05-19",
      sessionActive: false,
      hasErrors: false,
    },
    {
      id: 3,
      title: "Company Presentation",
      type: "video",
      thumbnail:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      date: "2024-05-18",
      sessionActive: true,
      hasErrors: true,
    },
    {
      id: 4,
      title: "Weekly Podcast Episode #15",
      type: "audio",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      date: "2024-05-17",
      sessionActive: false,
      hasErrors: false,
    },
    {
      id: 5,
      title: "Marketing Campaign Video",
      type: "video",
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      date: "2024-05-16",
      sessionActive: false,
      hasErrors: false,
    },
    {
      id: 6,
      title: "Daily News Podcast",
      type: "audio",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      date: "2024-05-15",
      sessionActive: false,
      hasErrors: false,
    },
  ];

  const handleAudioPlay = (itemId: number, audioUrl: string) => {
    if (playingAudio === itemId) {
      // Stop audio
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      setPlayingAudio(null);
    } else {
      // Stop any currently playing audio
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      
      // Play new audio
      const audio = new Audio(audioUrl);
      audio.play();
      setPlayingAudio(itemId);
      
      audio.addEventListener('ended', () => {
        setPlayingAudio(null);
      });
    }
  };

  const ListView = () => (
    <div className="space-y-2">
      {items.map((item) => (
        <Link key={item.id} href={`/project/${item.id}`}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {item.type === "video" ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Volume2 className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    {item.type === "audio" && (
                      <Volume2 className="w-4 h-4 text-blue-600" />
                    )}
                    {item.sessionActive && (
                      <div className="flex items-center space-x-1">
                        <Activity className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">Generating</span>
                      </div>
                    )}
                    {item.hasErrors && (
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-red-600 font-medium">Error</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {item.type === "video" ? "Video" : "Audio"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Play className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group">
          <div className="aspect-video bg-gray-100 relative overflow-hidden">
            {item.type === "video" ? (
              <>
                {/* Video Preview */}
                <video
                  className="w-full h-full object-cover"
                  poster={item.thumbnail?.replace("w=200&h=150", "w=400&h=300")}
                  preload="metadata"
                  onMouseEnter={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.currentTime = 5; // Preview from 5 seconds
                  }}
                >
                  <source src={item.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                    <Link href={`/project/${item.id}`}>
                      <button className="p-2 bg-white bg-opacity-90 text-gray-700 hover:bg-white rounded-full transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>
                    <button 
                      className="p-2 bg-white bg-opacity-90 text-gray-700 hover:bg-white rounded-full transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        const video = e.currentTarget.closest('.aspect-video')?.querySelector('video') as HTMLVideoElement;
                        if (video) {
                          if (video.paused) {
                            video.play();
                          } else {
                            video.pause();
                          }
                        }
                      }}
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Audio Speaker Icon */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAudioPlay(item.id, item.audioUrl!);
                    }}
                    className="p-8 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  >
                    {playingAudio === item.id ? (
                      <Pause className="w-12 h-12 text-blue-600" />
                    ) : (
                      <Volume2 className="w-12 h-12 text-blue-600" />
                    )}
                  </button>
                </div>
                {playingAudio === item.id && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs text-center">
                      Playing...
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {item.title}
              </h3>
              <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                {item.type === "audio" && (
                  <Volume2 className="w-4 h-4 text-blue-600" />
                )}
                {item.sessionActive && (
                  <Activity className="w-4 h-4 text-green-500" />
                )}
                {item.hasErrors && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                {item.sessionActive && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    Generating
                  </span>
                )}
                {item.hasErrors && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                    Error
                  </span>
                )}
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {item.type === "video" ? "Video" : "Audio"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Plus className="w-5 h-5" />
                <span>Create New</span>
              </button>
              <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">{items.length} projects</div>
          </div>

          {viewMode === "list" ? <ListView /> : <GridView />}
        </div>
        {/* Socket.io リアルタイム通信テスト */}
        <SocketChat />
      </div>
    </Layout>
  );
};

export default Dashboard;
