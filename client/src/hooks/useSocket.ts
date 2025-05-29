import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  autoConnect?: boolean;
  room?: string;
}

interface SocketMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
}

export const useSocket = (options: UseSocketOptions = {}) => {
  const { autoConnect = true, room } = options;
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<SocketMessage[]>([]);

  useEffect(() => {
    if (autoConnect && !socketRef.current) {
      // Socket.ioクライアントを初期化
      socketRef.current = io(window.location.origin, {
        transports: ['websocket', 'polling']
      });

      const socket = socketRef.current;

      // 接続イベント
      socket.on('connect', () => {
        setIsConnected(true);
        console.log('Socket.ioサーバーに接続されました');
        
        // ルームが指定されている場合は自動参加
        if (room) {
          socket.emit('join-room', room);
        }
      });

      // 切断イベント
      socket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Socket.ioサーバーから切断されました');
      });

      // メッセージ受信
      socket.on('message', (message: SocketMessage) => {
        setMessages(prev => [...prev, message]);
      });

      // 接続エラー
      socket.on('connect_error', (error) => {
        console.error('Socket.io接続エラー:', error);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    };
  }, [autoConnect, room]);

  // メッセージ送信
  const sendMessage = (message: string, user: string, targetRoom?: string) => {
    if (socketRef.current && isConnected) {
      const messageData = {
        room: targetRoom || room || 'default',
        message,
        user
      };
      socketRef.current.emit('message', messageData);
      
      // 自分のメッセージも表示に追加
      const newMessage: SocketMessage = {
        id: Date.now().toString(),
        user,
        message,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  // ルーム参加
  const joinRoom = (roomId: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('join-room', roomId);
    }
  };

  // ルーム退出
  const leaveRoom = (roomId: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('leave-room', roomId);
    }
  };

  // メッセージクリア
  const clearMessages = () => {
    setMessages([]);
  };

  return {
    socket: socketRef.current,
    isConnected,
    messages,
    sendMessage,
    joinRoom,
    leaveRoom,
    clearMessages
  };
};