import React from "react";
import { useParams } from "wouter";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  Code2,
  FileText,
  Settings,
  Image,
  Volume2,
  Languages,
  Video,
  FileImage,
  Play,
  Save,
  Undo,
  Redo,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eye,
  RefreshCw,
  List,
  Calendar,
  Clock,
  Monitor,
  Globe,
  Lightbulb,
  MessageSquare,
  Copy,
  AlertTriangle,
  Download,
  Send,
  Bot,
  User,
} from "lucide-react";
import { Link } from "wouter";

// Mock data - will be fetched from API in actual implementation
const mockProject = {
  id: 1,
  title: "Podcast: AI Technology Fundamentals",
  description:
    "A comprehensive guide to understanding artificial intelligence basics",
  status: "in_progress",
  mulmoScript: `{
  "metadata": {
    "title": "AI Technology Fundamentals",
    "description": "A comprehensive guide to understanding artificial intelligence basics"
  },
  "speakers": {
    "host": { "name": "Dr. Sarah Johnson", "voice": "female" },
    "guest": { "name": "Mike Chen", "voice": "male" }
  },
  "beats": [
    {
      "id": "intro",
      "speaker": "host",
      "text": "Welcome to AI Fundamentals. Today we'll explore the fascinating world of artificial intelligence.",
      "media": { "type": "image", "prompt": "AI technology concept with neural networks" }
    },
    {
      "id": "definition",
      "speaker": "guest",
      "text": "Thanks for having me, Sarah. Let's start with what AI actually means.",
      "media": { "type": "image", "prompt": "Brain and computer connection illustration" }
    },
    {
      "id": "history",
      "speaker": "host",
      "text": "The history of AI dates back to the 1950s with Alan Turing's groundbreaking work.",
      "media": { "type": "image", "prompt": "Timeline of AI development from 1950s to present" }
    },
    {
      "id": "types",
      "speaker": "guest",
      "text": "There are three main types of AI: narrow AI, general AI, and superintelligence.",
      "media": { "type": "chart", "data": "AI types comparison chart" }
    },
    {
      "id": "applications",
      "speaker": "host",
      "text": "Today, AI is everywhere - from smartphones to self-driving cars.",
      "media": { "type": "video", "prompt": "Montage of AI applications in daily life" }
    },
    {
      "id": "machine_learning",
      "speaker": "guest",
      "text": "Machine learning is a subset of AI that learns from data without explicit programming.",
      "media": { "type": "diagram", "prompt": "Machine learning workflow diagram" }
    },
    {
      "id": "future",
      "speaker": "host",
      "text": "The future of AI holds incredible potential for solving global challenges.",
      "media": { "type": "image", "prompt": "Futuristic AI technology helping humanity" }
    },
    {
      "id": "conclusion",
      "speaker": "guest",
      "text": "Understanding AI is crucial for everyone in our increasingly digital world.",
      "media": { "type": "image", "prompt": "People collaborating with AI technology" }
    }
  ]
}`,
};

const Project: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [validationStatus, setValidationStatus] = React.useState<
    "valid" | "warning" | "error"
  >("valid");
  const [validationMessage, setValidationMessage] = React.useState("");

  // Developer mode states
  const [isDevMode, setIsDevMode] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState<
    "classic" | "compact" | "timeline-focus" | "beginner" | "developer-debug"
  >("beginner");

  // Presentation style selection
  const [selectedPresentationStyle, setSelectedPresentationStyle] =
    React.useState<"ghibli" | "dilbert" | "japanese">("ghibli");

  // 初期設定（ビギナーモード以外では通常の設定）
  const [isScriptViewerOpen, setIsScriptViewerOpen] = React.useState(false);
  const [isGenerationOpen, setIsGenerationOpen] = React.useState(false);
  const [isBeatsViewerOpen, setIsBeatsViewerOpen] = React.useState(false);
  const [beatsViewMode, setBeatsViewMode] = React.useState<"list" | "timeline">(
    "list",
  );
  const [captionEnabled, setCaptionEnabled] = React.useState(true);

  // Beginner mode - simplified for now

  // Timeline specific states
  const [currentBeatIndex, setCurrentBeatIndex] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [timelinePosition, setTimelinePosition] = React.useState(0);
  const [isPreviewAreaVisible, setIsPreviewAreaVisible] = React.useState(false);

  // Helper functions for timeline
  const convertTimeToSeconds = (timeString: string) => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const getTotalDuration = () => {
    if (beatsData.length === 0) return 0;
    return convertTimeToSeconds(beatsData[beatsData.length - 1].timestamp) + 15; // Add 15 seconds for last beat
  };

  const getBeatDuration = (index: number) => {
    if (index === beatsData.length - 1) return 15; // Last beat duration
    return (
      convertTimeToSeconds(beatsData[index + 1].timestamp) -
      convertTimeToSeconds(beatsData[index].timestamp)
    );
  };

  const getBeatWidthPercentage = (index: number) => {
    const totalDuration = getTotalDuration();
    const beatDuration = getBeatDuration(index);
    return (beatDuration / totalDuration) * 100;
  };

  const getBeatStartPercentage = (index: number) => {
    const totalDuration = getTotalDuration();
    const startTime = convertTimeToSeconds(beatsData[index].timestamp);
    return (startTime / totalDuration) * 100;
  };

  const getCurrentBeatFromPosition = (position: number) => {
    const totalDuration = getTotalDuration();
    const currentTime = (position / 100) * totalDuration;

    for (let i = 0; i < beatsData.length; i++) {
      const beatStart = convertTimeToSeconds(beatsData[i].timestamp);
      const beatEnd =
        i === beatsData.length - 1
          ? beatStart + 15
          : convertTimeToSeconds(beatsData[i + 1].timestamp);

      if (currentTime >= beatStart && currentTime < beatEnd) {
        return i;
      }
    }
    return 0;
  };

  // Timeline event handlers
  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = ((event.clientX - rect.left) / rect.width) * 100;
    setTimelinePosition(position);
    const newBeatIndex = getCurrentBeatFromPosition(position);
    setCurrentBeatIndex(newBeatIndex);
    // Show preview area when timeline is clicked
    setIsPreviewAreaVisible(true);
  };

  const handleTimelineDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const position = Math.max(
      0,
      Math.min(100, ((event.clientX - rect.left) / rect.width) * 100),
    );
    setTimelinePosition(position);
    const newBeatIndex = getCurrentBeatFromPosition(position);
    setCurrentBeatIndex(newBeatIndex);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const navigateToBeat = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? Math.max(0, currentBeatIndex - 1)
        : Math.min(beatsData.length - 1, currentBeatIndex + 1);
    setCurrentBeatIndex(newIndex);
    setTimelinePosition(getBeatStartPercentage(newIndex));
  };

  // Helper function to get current time from timeline position
  const getCurrentTimeFromPosition = (position: number) => {
    const totalDuration = getTotalDuration();
    const currentSeconds = (position / 100) * totalDuration;
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = Math.floor(currentSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Update timeline position when currentBeatIndex changes
  React.useEffect(() => {
    if (!isDragging) {
      setTimelinePosition(getBeatStartPercentage(currentBeatIndex));
    }
  }, [currentBeatIndex, isDragging]);

  // テーマ変更時の設定更新
  React.useEffect(() => {
    if (selectedTheme === "beginner") {
      // ビギナーモード: デフォルトで開く
      setIsScriptViewerOpen(true);
      setIsBeatsViewerOpen(true);
      setBeatsViewMode("timeline");
    } else {
      // その他のモード: デフォルトで閉じる
      setIsScriptViewerOpen(false);
      setIsBeatsViewerOpen(false);
      setBeatsViewMode("list");
    }
  }, [selectedTheme]);

  // Theme-based styling helpers
  const getCardPadding = () => {
    switch (selectedTheme) {
      case "compact":
        return "p-3";
      default:
        return "p-6";
    }
  };

  const getCardSpacing = () => {
    switch (selectedTheme) {
      case "compact":
        return "space-y-3";
      default:
        return "space-y-6";
    }
  };

  const getHeaderSize = () => {
    switch (selectedTheme) {
      case "compact":
        return "text-lg";
      default:
        return "text-2xl";
    }
  };

  const getContainerSpacing = () => {
    switch (selectedTheme) {
      case "compact":
        return "space-y-4";
      case "timeline-focus":
        return "space-y-8";
      default:
        return "space-y-6";
    }
  };

  // Timeline Focus テーマのスタイル
  const getTimelineFocusClass = () => {
    if (selectedTheme === "timeline-focus") {
      return "hidden";
    }
    return "";
  };

  // Sample beats data with varied durations for visual demonstration
  const beatsData = [
    {
      id: "intro",
      speaker: "Dr. Sarah Johnson",
      text: "Welcome to AI Fundamentals. Today we'll explore the fascinating world of artificial intelligence.",
      image: {
        status: "generating",
        prompt: "AI technology concept with neural networks",
      },
      audio: { status: "generating" },
      timestamp: "00:00", // Duration: 10 seconds (short)
    },
    {
      id: "definition",
      speaker: "Mike Chen",
      text: "Thanks for having me, Sarah. Let's start with what AI actually means.",
      image: {
        status: "ready",
        prompt: "Brain and computer connection illustration",
      },
      audio: { status: "generating" },
      timestamp: "00:10", // Duration: 25 seconds (long)
    },
    {
      id: "history",
      speaker: "Dr. Sarah Johnson",
      text: "The history of AI dates back to the 1950s with Alan Turing's groundbreaking work.",
      image: {
        status: "ready",
        prompt: "Timeline of AI development from 1950s to present",
      },
      audio: { status: "ready" },
      timestamp: "00:35", // Duration: 8 seconds (very short)
    },
    {
      id: "types",
      speaker: "Mike Chen",
      text: "There are three main types of AI: narrow AI, general AI, and superintelligence.",
      image: { status: "ready", prompt: "AI types comparison chart" },
      audio: { status: "ready" },
      timestamp: "00:43", // Duration: 30 seconds (very long)
    },
    {
      id: "applications",
      speaker: "Dr. Sarah Johnson",
      text: "Today, AI is everywhere - from smartphones to self-driving cars.",
      image: {
        status: "generating",
        prompt: "Montage of AI applications in daily life",
      },
      audio: { status: "generating" },
      timestamp: "01:13", // Duration: 12 seconds (short)
    },
    {
      id: "future",
      speaker: "Mike Chen",
      text: "The future of AI holds incredible potential for solving global challenges.",
      image: {
        status: "ready",
        prompt: "Futuristic AI solutions for global problems",
      },
      audio: { status: "ready" },
      timestamp: "01:25", // Duration: 20 seconds (medium)
    },
    {
      id: "conclusion",
      speaker: "Dr. Sarah Johnson",
      text: "Understanding AI is crucial for everyone in our increasingly digital world.",
      image: {
        status: "ready",
        prompt: "People collaborating with AI technology",
      },
      audio: { status: "ready" },
      timestamp: "01:45", // Duration: 15 seconds (final beat)
    },
  ];

  if (!id) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                The specified project could not be found.
              </p>
              <Link href="/">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <TooltipProvider>
      <Layout>
        <div
          className={`max-w-7xl mx-auto ${getCardPadding()} ${getContainerSpacing()}`}
        >
          {/* Developer Mode Toggle - Always at the top */}
          <div className="bg-gray-50 dark:bg-gray-900 border rounded-lg p-3">
            <div className="flex items-center justify-between space-x-2 text-sm">
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Developer Mode</span>
              </div>
              <Switch checked={isDevMode} onCheckedChange={setIsDevMode} />
            </div>
            {isDevMode && (
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                  <span className="text-sm font-medium">Design Theme</span>
                  <RadioGroup
                    value={selectedTheme}
                    onValueChange={(value) =>
                      setSelectedTheme(
                        value as
                          | "classic"
                          | "compact"
                          | "timeline-focus"
                          | "beginner"
                          | "developer-debug",
                      )
                    }
                    className="grid grid-cols-2 gap-2 text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label htmlFor="beginner">Beginner Mode</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="classic" id="classic" />
                      <Label htmlFor="classic">Classic Layout</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="compact" />
                      <Label htmlFor="compact">Compact View</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="timeline-focus"
                        id="timeline-focus"
                      />
                      <Label htmlFor="timeline-focus">Timeline Focus</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="developer-debug"
                        id="developer-debug"
                      />
                      <Label htmlFor="developer-debug">Developer Debug</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>

          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className={`font-bold ${getHeaderSize()}`}>
                  {mockProject.title}
                </h1>
                <p
                  className={`text-gray-600 ${selectedTheme === "compact" ? "text-sm" : ""}`}
                >
                  {mockProject.description}
                </p>
              </div>
            </div>
          </div>

          {/* AI Assistant Section */}
          <Card
            className={`bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 ${getTimelineFocusClass()}`}
          >
            <CardHeader className={selectedTheme === "compact" ? "pb-3" : ""}>
              <CardTitle
                className={`flex items-center space-x-2 text-blue-700 ${selectedTheme === "compact" ? "text-base" : ""}`}
              >
                {selectedTheme === "beginner" ? (
                  <Bot className="w-5 h-5" />
                ) : (
                  <Lightbulb className="w-5 h-5" />
                )}
                <span>
                  {selectedTheme === "beginner"
                    ? "AI Assistant Chat"
                    : "AI-Powered MulmoScript Generation Guide"}
                </span>
              </CardTitle>
              <p
                className={`text-blue-600 ${selectedTheme === "compact" ? "text-xs" : "text-sm"}`}
              >
                {selectedTheme === "beginner"
                  ? "Let's Create Scripts Through Conversation with AI Assistants"
                  : "Use ChatGPT or other AI tools to generate your Script content with these proven prompts"}
              </p>
            </CardHeader>
            <CardContent className={selectedTheme === "compact" ? "pt-0" : ""}>
              {selectedTheme === "beginner" ? (
                // ビギナーモード: AIチャット画面（モックアップ）
                <div className="space-y-4">
                  {/* チャット履歴 */}
                  <div className="bg-white border rounded-lg p-4 h-80 overflow-y-auto space-y-4">
                    {/* AIの最初のメッセージ */}
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg inline-block max-w-md">
                          <p className="text-sm">
                            Let's create scripts through conversation with AI
                            Assistants
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">14:30</p>
                      </div>
                    </div>

                    {/* ユーザーのメッセージ */}
                    <div className="flex items-start space-x-3 flex-row-reverse space-x-reverse">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 text-right">
                        <div className="bg-blue-500 text-white p-3 rounded-lg inline-block max-w-md">
                          <p className="text-sm">
                            AIについてのポッドキャストを作りたいです
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">14:31</p>
                      </div>
                    </div>

                    {/* AIの返答 */}
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg inline-block max-w-md">
                          <p className="text-sm">
                            素晴らしいですね！AIポッドキャストについて、どのような聴衆を想定していますか？初心者向けですか、それとも技術者向けでしょうか？
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">14:31</p>
                      </div>
                    </div>

                    {/* ユーザーの返答 */}
                    <div className="flex items-start space-x-3 flex-row-reverse space-x-reverse">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 text-right">
                        <div className="bg-blue-500 text-white p-3 rounded-lg inline-block max-w-md">
                          <p className="text-sm">
                            初心者向けで、15分程度の長さにしたいです
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">14:32</p>
                      </div>
                    </div>

                    {/* AIの最新返答 */}
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg inline-block max-w-md">
                          <p className="text-sm">
                            完璧です！初心者向けのAIポッドキャスト（15分）のMulmoScriptを作成します。
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">14:33</p>
                      </div>
                    </div>

                    {/* テンプレート選択 */}
                    {/* <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg inline-block max-w-md">
                          <p className="text-sm mb-3">
                            以下からテンプレートを選択してください：
                          </p>
                          <div className="flex space-x-2">
                            <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option value="">テンプレートを選択</option>
                              <option value="ghibli">ジブリ</option>
                              <option value="american-comic">アメコミ</option>
                              <option value="sensei-taro">先生&太郎</option>
                            </select>
                            <Button
                              size="sm"
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4"
                            >
                              クリエイト
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">14:34</p>
                      </div>
                    </div> */}
                  </div>

                  {/* チャット入力エリア - Slack風デザイン */}
                  <div className="space-y-4">
                    {/* メッセージ入力欄 */}
                    <div className="chat-input-wrapper">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Enter your message:
                      </label>
                      <div className="chat-input-container border-2 border-gray-200 rounded-lg bg-white focus-within:border-blue-500 focus-within:border-2 transition-colors duration-200 justify-between">
                        <input
                          type="text"
                          placeholder="ex) Thank you very much! Please proceed with the creation."
                          className="flex-1 border-none outline-none px-3 py-2 text-sm bg-transparent min-w-0"
                        />
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 m-1 rounded-md"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* テンプレート選択セクション */}
                    <div className="template-section">
                      <div className="rounded-lg p-1">
                        <label className="text-sm font-medium text-gray-700 mb-3 block">
                          To create a script with the content so far, please
                          select a template and press the Create button.
                        </label>

                        {/* テンプレートプルダウンと作成ボタン */}
                        <div className="template-dropdown-container flex items-center gap-4">
                          <select className="template-dropdown border-2 border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200">
                            <option value="solo-with-images">
                              一人でプレゼン。画像生成あり。imagePromptなし
                            </option>
                            <option value="dialogue-custom-images">
                              二人の会話。画像生成あり。imagePromptあり。
                            </option>
                            <option value="storytelling">
                              一人で読む物語（紙芝居、絵本）
                            </option>
                            <option value="business-only">
                              ビジネスプレゼン（画像生成なし）
                            </option>
                          </select>
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                          >
                            Create Script
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // 通常モード: プロンプトガイド
                <Tabs defaultValue="beginner" className="w-full">
                  <TabsList
                    className={`grid w-full grid-cols-3 ${selectedTheme === "compact" ? "h-8" : ""}`}
                  >
                    <TabsTrigger
                      value="beginner"
                      className={selectedTheme === "compact" ? "text-xs" : ""}
                    >
                      Basic Prompt
                    </TabsTrigger>
                    <TabsTrigger
                      value="advanced"
                      className={selectedTheme === "compact" ? "text-xs" : ""}
                    >
                      Advanced Prompt
                    </TabsTrigger>
                    <TabsTrigger
                      value="examples"
                      className={selectedTheme === "compact" ? "text-xs" : ""}
                    >
                      Examples
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="beginner"
                    className={selectedTheme === "compact" ? "mt-2" : "mt-4"}
                  >
                    <div
                      className={
                        selectedTheme === "compact" ? "space-y-2" : "space-y-4"
                      }
                    >
                      <div
                        className={`bg-white rounded-lg border border-blue-200 ${selectedTheme === "compact" ? "p-2" : "p-4"}`}
                      >
                        <h4
                          className={`font-semibold text-gray-800 flex items-center ${selectedTheme === "compact" ? "text-sm mb-1" : "mb-2"}`}
                        >
                          <MessageSquare
                            className={`mr-2 text-blue-500 ${selectedTheme === "compact" ? "w-3 h-3" : "w-4 h-4"}`}
                          />
                          Simple ChatGPT Prompt Template
                        </h4>
                        <div
                          className={`bg-gray-50 rounded border font-mono ${selectedTheme === "compact" ? "p-2 text-xs" : "p-3 text-sm"}`}
                        >
                          {`Create a MulmoScript in YAML format for a [TOPIC] podcast/video.

Requirements:
- 2 speakers: host and guest
- 6-8 beats (conversation segments)
- Include image prompts for each beat
- Duration: approximately 5-10 minutes
- Target audience: [AUDIENCE]

Topic: [YOUR_TOPIC_HERE]
Audience: [YOUR_AUDIENCE_HERE]

Please format the output as valid YAML with metadata, speakers, and beats sections.`}
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${selectedTheme === "compact" ? "mt-2" : "mt-3"}`}
                        >
                          <Button
                            size={selectedTheme === "compact" ? "sm" : "sm"}
                            variant="outline"
                            className={
                              selectedTheme === "compact"
                                ? "text-xs h-6"
                                : "text-xs"
                            }
                          >
                            <Copy
                              className={
                                selectedTheme === "compact"
                                  ? "w-2 h-2 mr-1"
                                  : "w-3 h-3 mr-1"
                              }
                            />
                            Copy Template
                          </Button>
                          <span
                            className={
                              selectedTheme === "compact"
                                ? "text-xs text-gray-500"
                                : "text-xs text-gray-500"
                            }
                          >
                            Replace [TOPIC] and [AUDIENCE] with your content
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="mt-4">
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <Settings className="w-4 h-4 mr-2 text-blue-500" />
                          Detailed ChatGPT Prompt Template
                        </h4>
                        <div className="bg-gray-50 p-3 rounded border font-mono text-sm">
                          {`Create a comprehensive MulmoScript in YAML format for multimedia content generation.

CONTENT DETAILS:
- Topic: [YOUR_TOPIC]
- Format: [podcast/video/presentation]
- Duration: [X] minutes
- Target audience: [SPECIFIC_AUDIENCE]
- Tone: [professional/casual/educational/entertaining]

TECHNICAL REQUIREMENTS:
- 2 speakers with distinct personalities
- 8-12 conversation beats
- Each beat should include:
  * Speaker dialogue (natural, conversational)
  * Descriptive image prompts for AI generation
  * Optional: media type specifications (image/chart/video)

CONTENT STRUCTURE:
1. Engaging introduction
2. Core concept explanation
3. Practical examples or applications
4. Interactive discussion between speakers
5. Conclusion with key takeaways

YAML FORMAT REQUIREMENTS:
- metadata: title, description
- speakers: host (name, voice), guest (name, voice)
- beats: id, speaker, text, media (type, prompt)

Please ensure the dialogue flows naturally and image prompts are detailed enough for AI image generation.`}
                        </div>
                        <div className="mt-3 flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy Advanced Template
                          </Button>
                          <span className="text-xs text-gray-500">
                            Customize all bracketed sections for your needs
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="mt-4">
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                          <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                            Educational Content Example
                          </h4>
                          <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                            "Create a MulmoScript for a 7-minute educational
                            video about renewable energy for high school
                            students. Include visual prompts for solar panels,
                            wind turbines, and energy statistics."
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                          <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                            Business Presentation Example
                          </h4>
                          <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                            "Generate a MulmoScript for a 10-minute startup
                            pitch presentation about AI-powered healthcare,
                            including charts and product mockup visuals."
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                          <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                            Tutorial Content Example
                          </h4>
                          <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                            "Create a MulmoScript for a cooking tutorial showing
                            how to make sushi, with step-by-step images and
                            ingredient close-ups."
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                          <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                            Interview Style Example
                          </h4>
                          <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                            "Generate a MulmoScript for an interview-style
                            podcast about digital marketing trends, with
                            infographic-style visuals for statistics."
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h5 className="font-medium text-amber-800 mb-2 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Pro Tips for Better Results
                        </h5>
                        <ul className="text-sm text-amber-700 space-y-1">
                          <li>
                            • Be specific about your target audience and tone
                          </li>
                          <li>
                            • Include desired duration and number of segments
                          </li>
                          <li>
                            • Specify visual style preferences for image prompts
                          </li>
                          <li>• Ask for natural, conversational dialogue</li>
                          <li>
                            • Request varied media types (images, charts,
                            videos) when appropriate
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>

          <Separator className={getTimelineFocusClass()} />

          {/* MulmoScript Viewer Section */}
          <Collapsible
            open={isScriptViewerOpen}
            onOpenChange={setIsScriptViewerOpen}
            className={getTimelineFocusClass()}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Code2 className="w-5 h-5" />
                    <span>Script</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {/* Validation Status */}
                    <div className="flex items-center space-x-2">
                      {validationStatus === "valid" && (
                        <div className="group relative">
                          <CheckCircle className="w-4 h-4 text-green-500 group-hover:text-green-600 cursor-pointer" />
                          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            Validation Status
                          </span>
                        </div>
                      )}
                      {validationStatus === "warning" && (
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      )}
                      {validationStatus === "error" && (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      {validationStatus !== "valid" && (
                        <span className="text-sm text-gray-600">
                          {validationMessage}
                        </span>
                      )}
                    </div>
                    {/* Undo/Redo buttons */}
                    <Button variant="ghost" size="sm">
                      <Undo className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Redo className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                    </Button>
                    {/* Collapse/Expand Button */}
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {isScriptViewerOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </CardHeader>
              <CollapsibleContent
                className={`transition-all duration-300 overflow-hidden ${
                  isScriptViewerOpen ? "max-h-[800px]" : "max-h-[180px]"
                }`}
              >
                <CardContent>
                  <Tabs defaultValue="plain" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="plain">Plain Text</TabsTrigger>
                      <TabsTrigger value="yaml">YAML</TabsTrigger>
                      <TabsTrigger value="json">JSON</TabsTrigger>
                      <TabsTrigger value="media">Media</TabsTrigger>
                      <TabsTrigger value="params">Parameters</TabsTrigger>
                    </TabsList>

                    <TabsContent value="plain" className="mt-4">
                      <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px]">
                        <p className="text-sm text-gray-500 mb-2">
                          Plain Text Mode - Speaker and dialogue editing only
                        </p>
                        <div className="font-mono text-sm space-y-2">
                          <div>
                            Dr. Sarah Johnson: Welcome to AI Fundamentals. Today
                            we'll explore the fascinating world of artificial
                            intelligence.
                          </div>
                          <div>
                            Mike Chen: Thanks for having me, Sarah. Let's start
                            with what AI actually means.
                          </div>
                          <div>
                            Dr. Sarah Johnson: The history of AI dates back to
                            the 1950s with Alan Turing's groundbreaking work.
                          </div>
                          <div>
                            Mike Chen: There are three main types of AI: narrow
                            AI, general AI, and superintelligence.
                          </div>
                          <div>
                            Dr. Sarah Johnson: Today, AI is everywhere - from
                            smartphones to self-driving cars.
                          </div>
                          <div>
                            Mike Chen: Machine learning is a subset of AI that
                            learns from data without explicit programming.
                          </div>
                          <div>
                            Dr. Sarah Johnson: The future of AI holds incredible
                            potential for solving global challenges.
                          </div>
                          <div>
                            Mike Chen: Understanding AI is crucial for everyone
                            in our increasingly digital world.
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="yaml" className="mt-4">
                      <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px]">
                        <p className="text-sm text-gray-500 mb-2">
                          YAML Mode - Complete MulmoScript editing
                        </p>
                        <pre className="text-sm font-mono">
                          {`# MulmoScript YAML Format
metadata:
  title: "AI Technology Fundamentals"
  description: "A comprehensive guide to understanding artificial intelligence basics"

speakers:
  host:
    name: "Dr. Sarah Johnson"
    voice: "female"
  guest:
    name: "Mike Chen"
    voice: "male"

beats:
  - id: "intro"
    speaker: "host"
    text: "Welcome to AI Fundamentals. Today we'll explore the fascinating world of artificial intelligence."
    media:
      type: "image"
      prompt: "AI technology concept with neural networks"
  - id: "definition"
    speaker: "guest"
    text: "Thanks for having me, Sarah. Let's start with what AI actually means."
    media:
      type: "image"
      prompt: "Brain and computer connection illustration"
  - id: "history"
    speaker: "host"
    text: "The history of AI dates back to the 1950s with Alan Turing's groundbreaking work."
    media:
      type: "image"
      prompt: "Timeline of AI development from 1950s to present"`}
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="json" className="mt-4">
                      <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px]">
                        <p className="text-sm text-gray-500 mb-2">
                          JSON Mode - Complete MulmoScript editing
                        </p>
                        <pre className="text-sm font-mono">
                          {mockProject.mulmoScript}
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="media" className="mt-4">
                      <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] max-h-[600px] overflow-y-auto">
                        <p className="text-sm text-gray-500 mb-2">
                          Media Mode - Beat-by-beat media editing and preview
                        </p>
                        <div className="space-y-4">
                          <Card className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Beat: intro</h4>
                              <Badge variant="outline">image</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Dr. Sarah Johnson: Welcome to AI Fundamentals.
                              Today we'll explore the fascinating world of
                              artificial intelligence.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Image Prompt:
                                </label>
                                <input
                                  className="w-full mt-1 p-2 border rounded text-sm"
                                  defaultValue="AI technology concept with neural networks"
                                />
                              </div>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <FileImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">
                                  Image Preview
                                </p>
                              </div>
                            </div>
                          </Card>

                          <Card className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Beat: definition</h4>
                              <Badge variant="outline">image</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Mike Chen: Thanks for having me, Sarah. Let's
                              start with what AI actually means.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Image Prompt:
                                </label>
                                <input
                                  className="w-full mt-1 p-2 border rounded text-sm"
                                  defaultValue="Brain and computer connection illustration"
                                />
                              </div>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <FileImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">
                                  Image Preview
                                </p>
                              </div>
                            </div>
                          </Card>

                          <Card className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Beat: history</h4>
                              <Badge variant="outline">image</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Dr. Sarah Johnson: The history of AI dates back to
                              the 1950s with Alan Turing's groundbreaking work.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Image Prompt:
                                </label>
                                <input
                                  className="w-full mt-1 p-2 border rounded text-sm"
                                  defaultValue="Timeline of AI development from 1950s to present"
                                />
                              </div>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <FileImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">
                                  Image Preview
                                </p>
                              </div>
                            </div>
                          </Card>

                          <Card className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Beat: types</h4>
                              <Badge variant="outline">chart</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Mike Chen: There are three main types of AI:
                              narrow AI, general AI, and superintelligence.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Chart Data:
                                </label>
                                <textarea
                                  className="w-full mt-1 p-2 border rounded text-sm"
                                  rows={3}
                                  defaultValue="AI types comparison chart"
                                />
                              </div>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <FileImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">
                                  Chart Preview
                                </p>
                              </div>
                            </div>
                          </Card>

                          <Card className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">
                                Beat: applications
                              </h4>
                              <Badge variant="outline">video</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Dr. Sarah Johnson: Today, AI is everywhere - from
                              smartphones to self-driving cars.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Video Prompt:
                                </label>
                                <textarea
                                  className="w-full mt-1 p-2 border rounded text-sm"
                                  rows={3}
                                  defaultValue="Montage of AI applications in daily life"
                                />
                              </div>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <Video className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">
                                  Video Preview
                                </p>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="params" className="mt-4">
                      <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px]">
                        <p className="text-sm text-gray-500 mb-2">
                          Parameters Mode - Image, Speech, and Audio parameter
                          editing
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          <Card className="p-4">
                            <h4 className="font-medium mb-2">
                              Image Parameters
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>Style: Realistic</div>
                              <div>Aspect Ratio: 16:9</div>
                              <div>Quality: High</div>
                            </div>
                          </Card>
                          <Card className="p-4">
                            <h4 className="font-medium mb-2">
                              Speech Parameters
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>Speed: 1.0x</div>
                              <div>Pitch: Normal</div>
                              <div>Voice: Natural</div>
                            </div>
                          </Card>
                          <Card className="p-4">
                            <h4 className="font-medium mb-2">
                              Audio Parameters
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>Background Music: Soft</div>
                              <div>Volume: 0.3</div>
                              <div>Fade: Enabled</div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Content Generation Section - Always visible */}
          {/* <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="flex flex-col items-center space-y-2 h-auto py-4">
                <Image className="w-6 h-6" />
                <span>Generate Images</span>
              </Button>
              <Button className="flex flex-col items-center space-y-2 h-auto py-4">
                <Volume2 className="w-6 h-6" />
                <span>Generate Audio</span>
              </Button>
              <Button className="flex flex-col items-center space-y-2 h-auto py-4">
                <Languages className="w-6 h-6" />
                <span>Translate (EN/JP)</span>
              </Button>
            </div>
          </Card>
           */}
          {/* Output Section */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Select Presentation Style */}
                <div className="space-y-4">
                  <div className="flex flex-col text-sm font-medium mb-2">
                    Presentation Style
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {/* Studio Ghibli Style */}
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedPresentationStyle("ghibli")}
                    >
                      <div
                        className={`border-2 rounded-lg p-2 hover:border-blue-400 transition-all duration-200 hover:shadow-md bg-white ${
                          selectedPresentationStyle === "ghibli"
                            ? "border-blue-400 shadow-md"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="aspect-video bg-gradient-to-br bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <div className="text-center">
                            <FileImage className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              Image placeholder
                            </p>
                            <p className="text-xs text-gray-500">
                              - to be replaced
                            </p>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm text-gray-900 mb-1">
                          Studio Ghibli Style
                        </h3>
                      </div>
                      <div
                        className={`absolute top-2 right-2 transition-opacity ${
                          selectedPresentationStyle === "ghibli"
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                      </div>
                    </div>
                    {/* Dilbert Comic Style */}
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedPresentationStyle("dilbert")}
                    >
                      <div
                        className={`border-2 rounded-lg p-2 hover:border-blue-400 transition-all duration-200 hover:shadow-md bg-white ${
                          selectedPresentationStyle === "dilbert"
                            ? "border-blue-400 shadow-md"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="aspect-video bg-gradient-to-br bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <div className="text-center">
                            <FileImage className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              Image placeholder
                            </p>
                            <p className="text-xs text-gray-500">
                              - to be replaced
                            </p>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm text-gray-900 mb-1">
                          Dilbert Comic Style
                        </h3>
                      </div>
                      <div
                        className={`absolute top-2 right-2 transition-opacity ${
                          selectedPresentationStyle === "dilbert"
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                      </div>
                    </div>
                    {/* Japanese Picture Book Style */}
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedPresentationStyle("japanese")}
                    >
                      <div
                        className={`border-2 rounded-lg p-2 hover:border-blue-400 transition-all duration-200 hover:shadow-md bg-white ${
                          selectedPresentationStyle === "japanese"
                            ? "border-blue-400 shadow-md"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="aspect-video bg-gradient-to-br bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <div className="text-center">
                            <FileImage className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              Image placeholder
                            </p>
                            <p className="text-xs text-gray-500">
                              - to be replaced
                            </p>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm text-gray-900 mb-1">
                          Japanese Picture Book
                        </h3>
                      </div>
                      <div
                        className={`absolute top-2 right-2 transition-opacity ${
                          selectedPresentationStyle === "japanese"
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Caption Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex flex-col">
                    <Label
                      htmlFor="caption-toggle"
                      className="text-sm font-medium"
                    >
                      Caption Display
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Show captions in video and HTML outputs
                    </p>
                  </div>
                  <Switch
                    id="caption-toggle"
                    checked={captionEnabled}
                    onCheckedChange={setCaptionEnabled}
                  />
                </div>

                {/* Output Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="flex flex-col items-center space-y-2 h-auto py-4">
                    <Monitor className="w-6 h-6" />
                    <span>Generate Movie</span>
                  </Button>
                  <Button className="flex flex-col items-center space-y-2 h-auto py-4">
                    <FileText className="w-6 h-6" />
                    <span>Generate PDF</span>
                  </Button>
                  <Button className="flex flex-col items-center space-y-2 h-auto py-4">
                    <Globe className="w-6 h-6" />
                    <span>Generate Podcast</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Beats Viewer Section */}
          <Collapsible
            open={isBeatsViewerOpen}
            onOpenChange={setIsBeatsViewerOpen}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Beats</span>
                    <Badge variant="secondary" className="ml-2">
                      {beatsData.length} beats
                    </Badge>
                  </CardTitle>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {isBeatsViewerOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </CardHeader>
              <CollapsibleContent>
                <CardContent>
                  {/* View Mode Toggle */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">View:</span>
                      <div className="flex border rounded-lg">
                        <Button
                          variant={
                            beatsViewMode === "list" ? "default" : "ghost"
                          }
                          size="sm"
                          onClick={() => setBeatsViewMode("list")}
                          className="rounded-r-none"
                        >
                          <List className="w-4 h-4 mr-1" />
                          List
                        </Button>
                        <Button
                          variant={
                            beatsViewMode === "timeline" ? "default" : "ghost"
                          }
                          size="sm"
                          onClick={() => setBeatsViewMode("timeline")}
                          className="rounded-l-none"
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          Timeline
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Total duration:{" "}
                      {beatsData[beatsData.length - 1]?.timestamp || "00:00"}
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <ScrollArea className="max-h-[600px] w-full rounded-md border p-4 overflow-auto">
                    {beatsViewMode === "list" ? (
                      <div className="space-y-4">
                        {beatsData.map((beat, index) => (
                          <div
                            key={beat.id}
                            className="border-b border-gray-200 p-3 last:border-b-0"
                          >
                            <div
                              className="grid gap-4 items-start"
                              style={{ gridTemplateColumns: "80px 80px 1fr" }}
                            >
                              {/* Image Status */}
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <FileImage
                                    className={`w-4 h-4 ${beat.image.status === "ready" ? "text-green-500" : "text-gray-400"}`}
                                  />
                                  {beat.image.status === "generating" && (
                                    <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                                  )}
                                </div>
                                <p
                                  className={`text-xs mb-2 ${beat.image.status === "ready" ? "text-green-600" : "text-gray-500"}`}
                                >
                                  {beat.image.status === "ready"
                                    ? "Image ready"
                                    : "Generating..."}
                                </p>
                                {beat.image.status === "ready" && (
                                  <div className="flex justify-center space-x-1">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="w-6 h-6 p-0"
                                        >
                                          <Eye className="w-3 h-3" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Preview</p>
                                      </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="w-6 h-6 p-0"
                                        >
                                          <RefreshCw className="w-3 h-3" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Regenerate</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                )}
                              </div>

                              {/* Audio Status */}
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <Volume2
                                    className={`w-4 h-4 ${beat.audio.status === "ready" ? "text-green-500" : "text-gray-400"}`}
                                  />
                                  {beat.audio.status === "generating" && (
                                    <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                                  )}
                                </div>
                                <p
                                  className={`text-xs mb-2 ${beat.audio.status === "ready" ? "text-green-600" : "text-gray-500"}`}
                                >
                                  {beat.audio.status === "ready"
                                    ? "Audio ready"
                                    : "Generating..."}
                                </p>
                                {beat.audio.status === "ready" && (
                                  <div className="flex justify-center space-x-1">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="w-6 h-6 p-0"
                                        >
                                          <Play className="w-3 h-3" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Play</p>
                                      </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="w-6 h-6 p-0"
                                        >
                                          <RefreshCw className="w-3 h-3" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Regenerate</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                )}
                              </div>

                              {/* Beat Content */}
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    Beat {index + 1}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {beat.timestamp}
                                  </span>
                                  <span className="text-xs font-medium text-blue-600">
                                    {beat.speaker}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-800">
                                  {beat.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Preview Area - Only shown when timeline is clicked */}
                        {isPreviewAreaVisible && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Image/Media Preview */}
                            <div className="space-y-4">
                              <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                                {beatsData[currentBeatIndex]?.image.status ===
                                "ready" ? (
                                  <div className="text-center">
                                    <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">
                                      Image Preview
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {
                                        beatsData[currentBeatIndex]?.image
                                          .prompt
                                      }
                                    </p>
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">
                                      Generating Image...
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Media Controls */}
                              <div className="flex items-center justify-center gap-4">
                                <Button size="lg" className="px-8">
                                  <Play className="w-5 h-5 mr-2" />
                                  Play from{" "}
                                  {getCurrentTimeFromPosition(timelinePosition)}
                                </Button>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <RefreshCw className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Content Preview */}
                            <div className="space-y-4">
                              <Card className="p-6">
                                <div className="space-y-4">
                                  {/* Beat Info */}
                                  <div className="flex items-center gap-2 pb-3 border-b">
                                    <Badge variant="outline">
                                      Beat {currentBeatIndex}
                                    </Badge>
                                    <span className="text-sm font-medium text-blue-600">
                                      {beatsData[currentBeatIndex]?.speaker}
                                    </span>
                                    <span className="text-xs text-gray-500 font-mono ml-auto">
                                      {formatTime(
                                        getBeatDuration(currentBeatIndex),
                                      )}
                                      s
                                    </span>
                                  </div>

                                  {/* Text Content */}
                                  <div className="space-y-3">
                                    <p className="text-lg leading-relaxed text-gray-800">
                                      {beatsData[currentBeatIndex]?.text}
                                    </p>
                                  </div>

                                  {/* Status Indicators */}
                                  <div className="flex items-center gap-4 pt-3 border-t">
                                    <div className="flex items-center gap-2">
                                      <FileImage
                                        className={`w-4 h-4 ${beatsData[currentBeatIndex]?.image.status === "ready" ? "text-green-500" : "text-gray-400"}`}
                                      />
                                      <span
                                        className={`text-xs ${beatsData[currentBeatIndex]?.image.status === "ready" ? "text-green-600" : "text-gray-500"}`}
                                      >
                                        {beatsData[currentBeatIndex]?.image
                                          .status === "ready"
                                          ? "Image Ready"
                                          : "Generating..."}
                                      </span>
                                      {beatsData[currentBeatIndex]?.image
                                        .status === "generating" && (
                                        <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Volume2
                                        className={`w-4 h-4 ${beatsData[currentBeatIndex]?.audio.status === "ready" ? "text-green-500" : "text-gray-400"}`}
                                      />
                                      <span
                                        className={`text-xs ${beatsData[currentBeatIndex]?.audio.status === "ready" ? "text-green-600" : "text-gray-500"}`}
                                      >
                                        {beatsData[currentBeatIndex]?.audio
                                          .status === "ready"
                                          ? "Audio Ready"
                                          : "Generating..."}
                                      </span>
                                      {beatsData[currentBeatIndex]?.audio
                                        .status === "generating" && (
                                        <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          </div>
                        )}

                        {/* Horizontal Timeline */}
                        <div className="relative">
                          {/* Timeline Track */}
                          <div
                            className="relative h-16 bg-gray-100 rounded-lg cursor-pointer select-none"
                            onClick={handleTimelineClick}
                            onMouseMove={handleTimelineDrag}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                          >
                            {/* Beat Segments */}
                            {beatsData.map((beat, index) => (
                              <div
                                key={beat.id}
                                className={`absolute top-0 h-full border-r border-gray-300 flex flex-col justify-center items-center transition-colors ${
                                  index === currentBeatIndex
                                    ? "bg-blue-200"
                                    : "bg-gray-50 hover:bg-gray-100"
                                }`}
                                style={{
                                  left: `${getBeatStartPercentage(index)}%`,
                                  width: `${getBeatWidthPercentage(index)}%`,
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentBeatIndex(index);
                                  setTimelinePosition(
                                    getBeatStartPercentage(index),
                                  );
                                  setIsPreviewAreaVisible(true);
                                }}
                              >
                                {/* Beat Number */}
                                <div className="text-xs font-semibold text-gray-600">
                                  {index}
                                </div>
                                {/* Duration */}
                                <div className="text-xs text-gray-500 font-mono">
                                  {formatTime(getBeatDuration(index))}s
                                </div>
                              </div>
                            ))}

                            {/* Timeline Cursor */}
                            <div
                              className="absolute top-0 h-full w-1 bg-blue-500 cursor-grab active:cursor-grabbing z-10"
                              style={{ left: `${timelinePosition}%` }}
                              onMouseDown={handleMouseDown}
                            >
                              {/* Triangle pointing down */}
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-500 shadow-md"></div>
                              {/* Triangle pointing up */}
                              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-blue-500 shadow-md"></div>
                            </div>
                          </div>

                          {/* Navigation Controls */}
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex gap-2 -mr-20">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigateToBeat("prev")}
                              disabled={currentBeatIndex === 0}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigateToBeat("next")}
                              disabled={
                                currentBeatIndex === beatsData.length - 1
                              }
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Current Time Display Following Timeline Position - Only show when preview area is visible */}
                        {isPreviewAreaVisible && (
                          <div className="relative mt-2 mb-4 h-12">
                            <div
                              className="absolute text-center"
                              style={{
                                left: `${timelinePosition}%`,
                                transform:
                                  timelinePosition <= 5
                                    ? "translateX(0)"
                                    : timelinePosition >= 95
                                      ? "translateX(-100%)"
                                      : "translateX(-50%)",
                              }}
                            >
                              <div className="text-lg font-mono text-blue-600 font-semibold bg-white px-2 py-1 rounded shadow-sm border whitespace-nowrap">
                                {getCurrentTimeFromPosition(timelinePosition)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Product Section - Always visible */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Product</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="movie" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="movie">Movie</TabsTrigger>
                  <TabsTrigger value="pdf">PDF</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="podcast">Podcast</TabsTrigger>
                  <TabsTrigger value="slide">Slide</TabsTrigger>
                </TabsList>

                <TabsContent value="movie" className="mt-4">
                  <div className="border rounded-lg p-8 text-center bg-gray-50">
                    <Video className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium mb-2">Movie Preview</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Video content playback and preview
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                      <Button variant="outline">
                        <Video className="w-4 h-4 mr-2" />
                        Download MP4
                      </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      Duration: 12:34 | Resolution: 1920x1080 | Size: 145 MB
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pdf" className="mt-4">
                  <div className="border rounded-lg p-8 text-center bg-gray-50">
                    <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium mb-2">PDF Preview</p>
                    <p className="text-sm text-gray-600 mb-4">
                      PDF document display and download
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button>
                        <FileText className="w-4 h-4 mr-2" />
                        View PDF
                      </Button>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      8 pages | A4 format | Size: 2.1 MB
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="html" className="mt-4">
                  <div className="border rounded-lg p-8 text-center bg-gray-50">
                    <Globe className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium mb-2">HTML Preview</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Interactive web format display
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button>
                        <Eye className="w-4 h-4 mr-2" />
                        View HTML
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download HTML
                      </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      Interactive content | Responsive design
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="podcast" className="mt-4">
                  <div className="border rounded-lg p-8 text-center bg-gray-50">
                    <Volume2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium mb-2">Podcast Preview</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Audio content playback and preview
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                      <Button variant="outline">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Download MP3
                      </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      Duration: 12:34 | Size: 8.2 MB
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="slide" className="mt-4">
                  <div className="border rounded-lg p-8 text-center bg-gray-50">
                    <FileImage className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium mb-2">Slide Preview</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Slide format display and navigation
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        Start Slideshow
                      </Button>
                      <Button variant="outline">
                        <FileImage className="w-4 h-4 mr-2" />
                        Export Images
                      </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      8 slides | 1920x1080 resolution
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </TooltipProvider>
  );
};

export default Project;
