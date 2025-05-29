import { useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export default function SocketChat() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("ユーザー");
  const { isConnected, messages, sendMessage, clearMessages } = useSocket({
    autoConnect: true,
    room: "general",
  });

  const handleSendMessage = () => {
    if (message.trim() && username.trim()) {
      sendMessage(message, username);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          (開発中テスト用) Socket.io リアルタイムチャット
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? "接続中" : "切断"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ユーザー名設定 */}
        <div className="flex gap-2">
          <Input
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="max-w-32"
          />
          <Button variant="outline" size="sm" onClick={clearMessages}>
            メッセージクリア
          </Button>
        </div>

        {/* メッセージ表示エリア */}
        <div className="h-64 overflow-y-auto border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">メッセージがありません</p>
          ) : (
            <div className="space-y-2">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {msg.user}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm bg-white dark:bg-gray-800 p-2 rounded border">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* メッセージ入力エリア */}
        <div className="flex gap-2">
          <Input
            placeholder="メッセージを入力..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isConnected}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!isConnected || !message.trim()}
          >
            送信
          </Button>
        </div>

        {/* 接続状態表示 */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {isConnected ? (
            <p>✅ Socket.ioサーバーに接続されています</p>
          ) : (
            <p>❌ Socket.ioサーバーに接続できません</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
