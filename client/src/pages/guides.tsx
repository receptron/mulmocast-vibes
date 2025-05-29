import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  FileText, 
  Image, 
  Volume2, 
  Monitor, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  BookOpen,
  Layers,
  Headphones,
  ImageIcon,
  Type,
  Eye,
  Film,
  FileType,
  Code,
  Mic,
  Presentation,
  Globe
} from 'lucide-react';
import { useState } from 'react';

const Guides = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModes, setSelectedModes] = useState<{[key: number]: string}>({});
  const [language, setLanguage] = useState<'jp' | 'en'>('en');

  const guides = [
    { 
      id: 1, 
      title: language === 'jp' ? 'MulmoCastを始めよう' : 'Getting Started with MulmoCast',
      type: 'movie', 
      duration: '5 min',
      level: 'beginner',
      description: language === 'jp' ? 'MulmoCastの基本機能とインターフェースを学習' : 'Learn the basic features and interface of MulmoCast',
      availableModes: ['movie', 'pdf', 'html', 'podcast', 'slide']
    },
    { 
      id: 2, 
      title: language === 'jp' ? '初めてのポッドキャスト作成' : 'Creating Your First Podcast',
      type: 'pdf', 
      duration: '10 min',
      level: 'beginner',
      description: language === 'jp' ? 'ポッドキャストプロジェクトの作成から公開まで' : 'From creating a podcast project to publishing',
      availableModes: ['movie', 'pdf', 'podcast', 'slide']
    },
    { 
      id: 3, 
      title: language === 'jp' ? '高度な動画編集テクニック' : 'Advanced Video Editing Techniques',
      type: 'html', 
      duration: '15 min',
      level: 'advanced',
      description: language === 'jp' ? 'プロレベルの動画編集機能の活用方法' : 'How to utilize professional-level video editing features',
      availableModes: ['movie', 'html', 'slide']
    },
    { 
      id: 4, 
      title: language === 'jp' ? 'テンプレートのカスタマイズ' : 'Template Customization',
      type: 'podcast', 
      duration: '8 min',
      level: 'intermediate',
      description: language === 'jp' ? 'テンプレートを好みに合わせてカスタマイズする方法' : 'How to customize templates to your preferences',
      availableModes: ['pdf', 'html', 'podcast']
    },
    { 
      id: 5, 
      title: language === 'jp' ? 'MulmoScriptの書き方' : 'Writing MulmoScript',
      type: 'slide', 
      duration: '12 min',
      level: 'intermediate',
      description: language === 'jp' ? 'MulmoScriptの基本的な構文と使用例' : 'Basic syntax and usage examples of MulmoScript',
      availableModes: ['movie', 'pdf', 'html', 'slide']
    },
    { 
      id: 6, 
      title: language === 'jp' ? '多言語コンテンツの作成' : 'Creating Multilingual Content',
      type: 'movie', 
      duration: '7 min',
      level: 'intermediate',
      description: language === 'jp' ? '複数の言語でコンテンツを作成する方法' : 'How to create content in multiple languages',
      availableModes: ['movie', 'podcast', 'slide']
    }
  ];

  const categories = [
    { id: 'all', label: language === 'jp' ? 'すべて' : 'All', icon: BookOpen },
    { id: 'movie', label: language === 'jp' ? '動画' : 'Movie', icon: Film },
    { id: 'pdf', label: 'PDF', icon: FileType },
    { id: 'html', label: 'HTML', icon: Code },
    { id: 'podcast', label: language === 'jp' ? 'ポッドキャスト' : 'Podcast', icon: Mic },
    { id: 'slide', label: language === 'jp' ? 'スライド' : 'Slide', icon: Presentation }
  ];

  const viewerModes = [
    { 
      id: 'movie', 
      label: language === 'jp' ? '動画' : 'Movie',
      icon: Film, 
      description: language === 'jp' ? '映像で学習' : 'Learn with full video'
    },
    { 
      id: 'pdf', 
      label: 'PDF',
      icon: FileType, 
      description: language === 'jp' ? 'PDF形式で学習' : 'PDF format learning'
    },
    { 
      id: 'html', 
      label: 'HTML',
      icon: Code, 
      description: language === 'jp' ? 'ウェブ形式で学習' : 'Web format learning'
    },
    { 
      id: 'podcast', 
      label: language === 'jp' ? 'ポッドキャスト' : 'Podcast',
      icon: Mic, 
      description: language === 'jp' ? '音声のみで学習' : 'Audio-only learning'
    },
    { 
      id: 'slide', 
      label: language === 'jp' ? 'スライド' : 'Slide',
      icon: Presentation, 
      description: language === 'jp' ? 'スライド形式で学習' : 'Slide format learning'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'movie': return <Film className="w-5 h-5 text-blue-600" />;
      case 'pdf': return <FileType className="w-5 h-5 text-red-600" />;
      case 'html': return <Code className="w-5 h-5 text-green-600" />;
      case 'podcast': return <Mic className="w-5 h-5 text-purple-600" />;
      case 'slide': return <Presentation className="w-5 h-5 text-orange-600" />;
      default: return <Play className="w-5 h-5" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return language === 'jp' ? '初級' : 'Beginner';
      case 'intermediate': return language === 'jp' ? '中級' : 'Intermediate';
      case 'advanced': return language === 'jp' ? '上級' : 'Advanced';
      default: return level;
    }
  };

  const filteredGuides = selectedCategory === 'all' 
    ? guides 
    : guides.filter(guide => guide.type === selectedCategory);

  const handleModeClick = (guideId: number, mode: string) => {
    setSelectedModes(prev => ({
      ...prev,
      [guideId]: mode
    }));
    console.log(`Selected ${mode} mode for guide ${guideId}`);
  };

  const getSelectedMode = (guideId: number) => {
    return selectedModes[guideId] || 'movie'; // Default to movie mode
  };

  const getModePreview = (mode: string) => {
    switch (mode) {
      case 'movie':
        return {
          title: language === 'jp' ? '動画モード' : 'Movie Mode',
          description: language === 'jp' ? '視覚的なデモンストレーション付きの完全な動画を視聴' : 'Watch full instructional videos with visual demonstrations',
          icon: Film,
          color: 'bg-blue-50 border-blue-200'
        };
      case 'pdf':
        return {
          title: language === 'jp' ? 'PDFモード' : 'PDF Mode',
          description: language === 'jp' ? 'PDF形式でのドキュメント学習' : 'Learn with PDF format documents',
          icon: FileType,
          color: 'bg-red-50 border-red-200'
        };
      case 'html':
        return {
          title: language === 'jp' ? 'HTMLモード' : 'HTML Mode',
          description: language === 'jp' ? 'インタラクティブなウェブ形式で学習' : 'Interactive web format learning',
          icon: Code,
          color: 'bg-green-50 border-green-200'
        };
      case 'podcast':
        return {
          title: language === 'jp' ? 'ポッドキャストモード' : 'Podcast Mode',
          description: language === 'jp' ? 'ハンズフリーでの音声学習' : 'Listen to audio-only narration for hands-free learning',
          icon: Mic,
          color: 'bg-purple-50 border-purple-200'
        };
      case 'slide':
        return {
          title: language === 'jp' ? 'スライドモード' : 'Slide Mode',
          description: language === 'jp' ? 'テキスト付きのスライドをナビゲート' : 'Navigate through slides with accompanying text',
          icon: Presentation,
          color: 'bg-orange-50 border-orange-200'
        };
      default:
        return {
          title: language === 'jp' ? '動画モード' : 'Movie Mode',
          description: language === 'jp' ? '視覚的なデモンストレーション付きの完全な動画を視聴' : 'Watch full instructional videos with visual demonstrations',
          icon: Film,
          color: 'bg-blue-50 border-blue-200'
        };
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'jp' ? 'ガイド' : 'Guides'}
              </h1>
              <p className="text-gray-600">
                {language === 'jp' 
                  ? 'インタラクティブなガイドでMulmoCastの使い方を学習' 
                  : 'Learn how to use MulmoCast with our interactive guides'
                }
              </p>
            </div>
            <Button
              onClick={() => setLanguage(language === 'jp' ? 'en' : 'jp')}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'jp' ? 'EN' : 'JP'}</span>
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'jp' ? 'カテゴリー' : 'Categories'}
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getIcon(guide.type)}
                    <div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {guide.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{guide.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getLevelColor(guide.level)} variant="secondary">
                    {getLevelLabel(guide.level)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {guide.description}
                </p>
                <Tabs 
                  value={getSelectedMode(guide.id)} 
                  onValueChange={(value) => {
                    if (guide.availableModes.includes(value)) {
                      handleModeClick(guide.id, value);
                    }
                  }}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-5 h-8 p-0.5 bg-gray-100">
                    {viewerModes.map((mode) => {
                      const isAvailable = guide.availableModes.includes(mode.id);
                      return (
                        <TabsTrigger 
                          key={mode.id} 
                          value={mode.id}
                          disabled={!isAvailable}
                          className={`text-xs py-1 px-2 transition-all ${
                            isAvailable 
                              ? "data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-gray-50 text-gray-900" 
                              : "opacity-20 cursor-not-allowed text-gray-300 bg-gray-100 pointer-events-none"
                          }`}
                        >
                          {mode.label}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                  
                  {viewerModes.map((mode) => {
                    const isAvailable = guide.availableModes.includes(mode.id);
                    const preview = getModePreview(mode.id);
                    const PreviewIcon = preview.icon;
                    return (
                      <TabsContent key={mode.id} value={mode.id} className="mt-3">
                        {isAvailable ? (
                          <div 
                            className={`${preview.color} rounded-lg p-3 cursor-pointer hover:shadow-sm transition-all`}
                            onClick={() => {
                              console.log(`Starting guide ${guide.id} in ${mode.id} mode`);
                            }}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="p-1.5 bg-white rounded-md">
                                <PreviewIcon className="w-4 h-4 text-gray-700" />
                              </div>
                              <span className="font-medium text-sm text-gray-800">{preview.title}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">{preview.description}</p>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-xs text-gray-500">Click to start</span>
                              <Button 
                                size="sm" 
                                className="h-7 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(`Starting guide ${guide.id} in ${mode.id} mode`);
                                }}
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Start
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-25 border border-gray-100 rounded-lg p-4 text-center opacity-30">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                              <PreviewIcon className="w-5 h-5 text-gray-300" />
                              <span className="font-medium text-sm text-gray-400">{preview.title}</span>
                            </div>
                            <p className="text-xs text-gray-300 mb-3">Not available for this guide</p>
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled
                              className="h-7 text-xs opacity-40 border-gray-200 text-gray-300"
                            >
                              Not Available
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MulmoViewer Section */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 flex items-center space-x-3">
              <Eye className="w-7 h-7" />
              <span>MulmoViewer</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Multi-modal Viewer
              </Badge>
            </CardTitle>
            <p className="text-blue-700 text-lg">
              View guides created with MulmoScript in multiple formats. Switch between display formats and languages to match your preferred learning style.
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="modes" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="modes">Display Modes</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              <TabsContent value="modes" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {viewerModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <Card key={mode.id} className="bg-white border-blue-100 hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <CardTitle className="text-base">
                              {mode.label}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            {mode.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-900">Language Switching</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Real-time language switching</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Switch while maintaining progress</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Supported: Japanese, English (more coming)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-900">Navigation</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center space-x-2">
                        <ChevronLeft className="w-4 h-4 text-blue-500" />
                        <ChevronRight className="w-4 h-4 text-blue-500" />
                        <span>Previous/Next slide navigation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Keyboard shortcut support</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Progress tracking and saving</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Guides;