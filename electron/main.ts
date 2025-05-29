import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn, ChildProcess } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow: BrowserWindow | null = null;
let serverProcess: ChildProcess | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'default',
    show: false,
  });

  // 開発モードかプロダクションモードかを判定
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    // 開発モードではlocalhost:5000を使用
    mainWindow.loadURL('http://localhost:5000');
    mainWindow.webContents.openDevTools();
  } else {
    // プロダクションモードでは静的ファイルを提供
    mainWindow.loadFile(join(__dirname, '../dist/client/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const startServer = () => {
  if (process.env.NODE_ENV === 'development') {
    // 開発モードでは既存のサーバーを使用
    return;
  }

  // プロダクションモードでExpressサーバーを起動
  serverProcess = spawn('node', [join(__dirname, '../dist/index.js')], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  serverProcess.on('error', (error) => {
    console.error('Server process error:', error);
  });
};

app.whenReady().then(() => {
  startServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
});

// IPCハンドラーの例
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});