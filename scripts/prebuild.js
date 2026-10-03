const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Pre-build script to ensure a clean build environment on Windows
try {
  const serverDir = path.join(process.cwd(), '.next', 'server');
  if (fs.existsSync(serverDir)) {
    // Check if there are any orphaned or corrupted .segments folders
    try {
      const items = fs.readdirSync(serverDir);
      for (const item of items) {
        if (item.endsWith('.segments')) {
          const target = path.join(serverDir, item);
          try {
            fs.rmSync(target, { recursive: true, force: true });
          } catch (e) {
            // If locked or corrupted on Windows, move it out to temp directory
            const tempDest = path.join(os.tmpdir(), `next_seg_${Date.now()}`);
            try {
              execSync(`cmd /c move "${target}" "${tempDest}"`, { stdio: 'ignore' });
            } catch (_) {}
          }
        }
      }
    } catch (e) {
      // If serverDir itself has corrupted entries, move it out to temp
      const tempDest = path.join(os.tmpdir(), `next_server_${Date.now()}`);
      try {
        execSync(`cmd /c move "${serverDir}" "${tempDest}"`, { stdio: 'ignore' });
      } catch (_) {}
    }
  }
} catch (_) {}
