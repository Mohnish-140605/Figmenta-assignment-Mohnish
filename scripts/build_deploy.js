const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const clientDir = path.join(rootDir, 'client-app');
const publicDir = path.join(rootDir, 'public');
const clientDistDir = path.join(clientDir, 'dist');

console.log('🚀 Starting Build Process...');

try {
    // 1. Install Client Dependencies
    console.log('📦 Installing Client Dependencies...');
    execSync('npm install', { cwd: clientDir, stdio: 'inherit' });

    // 2. Build Client
    console.log('🏗️  Building Client...');
    execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });

    // 3. Prepare Public Directory
    console.log('📂 Preparing Public Directory...');
    if (fs.existsSync(publicDir)) {
        fs.rmSync(publicDir, { recursive: true, force: true });
    }
    fs.mkdirSync(publicDir);

    // 4. Copy Build Artifacts
    console.log('📋 Copying Artifacts to Public...');
    fs.cpSync(clientDistDir, publicDir, { recursive: true });

    console.log('✅ Build Complete! Artifacts in /public');
} catch (error) {
    console.error('❌ Build Failed:', error);
    process.exit(1);
}
