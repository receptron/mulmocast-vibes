import { spawn } from 'child_process';

console.log('Electronアプリケーションを起動しています...');

// まず開発サーバーを起動
const devServer = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// サーバーが起動するまで待機してからElectronを起動
setTimeout(() => {
  console.log('Electronを起動中...');
  const electron = spawn('npx', ['electron', '.'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NODE_ENV: 'development' }
  });

  electron.on('close', () => {
    console.log('Electronアプリケーションが終了しました');
    devServer.kill();
    process.exit(0);
  });
}, 3000);

process.on('SIGINT', () => {
  devServer.kill();
  process.exit(0);
});