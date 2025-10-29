/**
 * Electron Main Process
 * Handles window management, IPC, and native features
 */
import { app, BrowserWindow, Menu, ipcMain, shell } from 'electron';
import * as path from 'path';
import Store from 'electron-store';
import { autoUpdater } from 'electron-updater';

// Initialize persistent storage
const store = new Store();

// Development mode check
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';

let mainWindow: BrowserWindow | null = null;

/**
 * Create the main application window
 */
function createWindow(): void {
  // Get saved window bounds or use defaults
  const windowBounds = store.get('windowBounds', {
    width: 1400,
    height: 900,
  }) as { width: number; height: number; x?: number; y?: number };

  mainWindow = new BrowserWindow({
    ...windowBounds,
    minWidth: 1024,
    minHeight: 768,
    title: 'Onless.uz - Haydovchilik Nazariy Imtihoni',
    backgroundColor: '#F9FAFB',
    show: false, // Show window after ready-to-show event
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // Save window bounds on close
  mainWindow.on('close', () => {
    if (mainWindow && !mainWindow.isMaximized() && !mainWindow.isFullScreen()) {
      store.set('windowBounds', mainWindow.getBounds());
    }
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Create application menu
  createMenu();
}

/**
 * Create native application menu
 */
function createMenu(): void {
  const isMac = process.platform === 'darwin';

  const template: Electron.MenuItemConstructorOptions[] = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' as const },
              { type: 'separator' as const },
              { role: 'services' as const },
              { type: 'separator' as const },
              { role: 'hide' as const },
              { role: 'hideOthers' as const },
              { role: 'unhide' as const },
              { type: 'separator' as const },
              { role: 'quit' as const },
            ],
          },
        ]
      : []),
    {
      label: 'Fayl',
      submenu: [
        {
          label: 'Yangi Test',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow?.webContents.send('new-exam');
          },
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    {
      label: "Tahrirlash",
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'Ko\'rish',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        ...(isDev ? [{ type: 'separator' as const }, { role: 'toggleDevTools' as const }] : []),
      ],
    },
    {
      label: 'Yordam',
      submenu: [
        {
          label: 'Onless.uz saytiga o\'tish',
          click: async () => {
            await shell.openExternal('https://onless.uz');
          },
        },
        { type: 'separator' },
        {
          label: `Versiya: ${app.getVersion()}`,
          enabled: false,
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

/**
 * IPC Handlers for renderer process communication
 */
function setupIpcHandlers(): void {
  // Get app version
  ipcMain.handle('get-app-version', () => app.getVersion());

  // Store data persistently
  ipcMain.handle('store-get', (_event, key: string) => store.get(key));
  ipcMain.handle('store-set', (_event, key: string, value: any) => store.set(key, value));
  ipcMain.handle('store-delete', (_event, key: string) => store.delete(key));

  // Get exam results history
  ipcMain.handle('get-exam-history', () => {
    return store.get('examHistory', []);
  });

  // Save exam result
  ipcMain.handle('save-exam-result', (_event, result: any) => {
    const history = store.get('examHistory', []) as any[];
    history.unshift(result);
    // Keep only last 50 results
    store.set('examHistory', history.slice(0, 50));
    return true;
  });

  // Export exam results to file
  ipcMain.handle('export-exam-results', async (_event, data: any) => {
    const { dialog } = await import('electron');
    const { filePath } = await dialog.showSaveDialog({
      title: 'Natijalarni saqlash',
      defaultPath: `onless-results-${new Date().toISOString().split('T')[0]}.json`,
      filters: [{ name: 'JSON', extensions: ['json'] }],
    });

    if (filePath) {
      const fs = await import('fs/promises');
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return { success: true, path: filePath };
    }
    return { success: false };
  });
}

/**
 * Auto-updater setup
 */
function setupAutoUpdater(): void {
  if (isDev) return;

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', () => {
    mainWindow?.webContents.send('update-available');
  });

  autoUpdater.on('update-downloaded', () => {
    mainWindow?.webContents.send('update-downloaded');
  });
}

/**
 * App lifecycle events
 */
app.whenReady().then(() => {
  createWindow();
  setupIpcHandlers();
  setupAutoUpdater();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Quit when all windows are closed (except on macOS)
app.on('before-quit', () => {
  // Cleanup if needed
});
