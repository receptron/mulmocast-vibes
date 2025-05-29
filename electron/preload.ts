import { contextBridge, ipcRenderer } from 'electron';

// Electronの機能をフロントエンドに安全に公開
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  // 必要に応じて他のAPI関数を追加
});

// 型定義をフロントエンドで使用するため
declare global {
  interface Window {
    electronAPI: {
      getAppVersion: () => Promise<string>;
    };
  }
}