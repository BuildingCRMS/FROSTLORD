#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 FROSTLORD Medusa Setup Verification\n');

// Check if required files exist
const requiredFiles = [
  '.env',
  'medusa-config.js',
  'backend/.env',
  'backend/medusa-config.js',
  'backend/package.json',
  'backend/tsconfig.json'
];

const missingFiles = [];
const existingFiles = [];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    existingFiles.push(file);
  } else {
    missingFiles.push(file);
  }
});

console.log('✅ Existing Files:');
existingFiles.forEach(file => console.log(`   ${file}`));

if (missingFiles.length > 0) {
  console.log('\n❌ Missing Files:');
  missingFiles.forEach(file => console.log(`   ${file}`));
}

// Check backend directory structure
console.log('\n🏗️  Backend Directory Structure:');
const backendDirs = ['src', 'src/api', 'src/workflows', 'src/subscribers'];
backendDirs.forEach(dir => {
  const fullPath = path.join('backend', dir);
  if (fs.existsSync(fullPath)) {
    console.log(`   ✅ ${dir}/`);
  } else {
    console.log(`   ❌ ${dir}/`);
  }
});

// Check environment variables
console.log('\n🔧 Environment Configuration:');
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const requiredEnvVars = [
    'DATABASE_URL',
    'REDIS_URL',
    'JWT_SECRET',
    'COOKIE_SECRET',
    'NEXT_PUBLIC_MEDUSA_BACKEND_URL'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (envContent.includes(envVar)) {
      console.log(`   ✅ ${envVar}`);
    } else {
      console.log(`   ❌ ${envVar}`);
    }
  });
}

console.log('\n🚀 Next Steps:');
console.log('1. Update the JWT_SECRET and COOKIE_SECRET in .env files');
console.log('2. Ensure PostgreSQL and Redis are running');
console.log('3. Run: npm run backend:migrate');
console.log('4. Run: npm run backend:seed');
console.log('5. Start backend: npm run backend:dev');
console.log('6. Start frontend: npm run dev');

console.log('\n📚 Available Scripts:');
console.log('   npm run backend:dev      - Start Medusa backend');
console.log('   npm run backend:migrate  - Run database migrations');
console.log('   npm run backend:seed     - Seed database');
console.log('   npm run dev              - Start Next.js frontend');
console.log('   npm run docker:up        - Start with Docker');
