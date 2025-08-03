#!/usr/bin/env node

const { createPublishableKey, addSalesChannels } = require('./create-publishable-key.js')
const fs = require('fs')
const path = require('path')

console.log('🔑 FROSTLORD Publishable API Key Setup\n')

// Check if backend is running
const checkBackendStatus = async () => {
  const axios = require('axios')
  const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000'
  
  try {
    await axios.get(`${BACKEND_URL}/health`)
    console.log('✅ Backend is running')
    return true
  } catch (error) {
    console.log('❌ Backend is not running')
    console.log('💡 Start your backend with: npm run backend:dev')
    return false
  }
}

// Check if admin user exists
const checkAdminUser = async () => {
  const axios = require('axios')
  const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000'
  const ADMIN_TOKEN = process.env.MEDUSA_ADMIN_TOKEN
  
  if (!ADMIN_TOKEN || ADMIN_TOKEN === 'your_admin_token_here') {
    console.log('❌ MEDUSA_ADMIN_TOKEN not set')
    console.log('\n💡 To get your admin token:')
    console.log('1. Start your Medusa backend: npm run backend:dev')
    console.log('2. Create admin user: npx medusa user -e admin@frostlord.com -p yourpassword')
    console.log('3. Login to admin dashboard: http://localhost:9000/app')
    console.log('4. Go to Settings → API Keys')
    console.log('5. Copy your admin token')
    console.log('6. Set environment variable: export MEDUSA_ADMIN_TOKEN=your_token')
    return false
  }
  
  try {
    await axios.get(`${BACKEND_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('✅ Admin token is valid')
    return true
  } catch (error) {
    console.log('❌ Admin token is invalid')
    console.log('💡 Please check your MEDUSA_ADMIN_TOKEN')
    return false
  }
}

// Create example environment files
const createExampleEnvFiles = () => {
  console.log('\n📝 Creating example environment files...')
  
  // Root .env.example
  const rootEnvExample = `# Frontend Environment Variables
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:8000

# Optional: Strapi CMS
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_READ_TOKEN=your_strapi_token
STRAPI_WEBHOOK_REVALIDATION_SECRET=your_webhook_secret

# Optional: Digital Ocean Spaces
NEXT_PUBLIC_CDN_SPACE_DOMAIN=your_space_domain
NEXT_PUBLIC_SPACE_DOMAIN=your_space_domain
NEXT_PUBLIC_SPACE_ENDPOINT=your_space_endpoint
`
  
  // Backend .env.example
  const backendEnvExample = `# Backend Environment Variables
DATABASE_URL=postgres://postgres:postgres@localhost:5432/frostlord_store
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_here
COOKIE_SECRET=your_cookie_secret_here
NODE_ENV=development

# Medusa Configuration
MEDUSA_BACKEND_URL=http://localhost:9000
MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key_here

# CORS Settings
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:7001,http://localhost:7000
AUTH_CORS=http://localhost:8000

# Admin Token (for API key creation)
MEDUSA_ADMIN_TOKEN=your_admin_token_here
`
  
  try {
    fs.writeFileSync(path.join(__dirname, '..', '.env.example'), rootEnvExample)
    fs.writeFileSync(path.join(__dirname, '.env.example'), backendEnvExample)
    console.log('✅ Created .env.example files')
  } catch (error) {
    console.error('❌ Error creating example files:', error.message)
  }
}

// Main setup function
const main = async () => {
  console.log('🚀 Starting FROSTLORD publishable key setup...\n')
  
  // Check backend status
  const backendRunning = await checkBackendStatus()
  if (!backendRunning) {
    console.log('\n💡 Please start your backend first, then run this script again.')
    return
  }
  
  // Check admin user
  const adminValid = await checkAdminUser()
  if (!adminValid) {
    console.log('\n💡 Please set up your admin user and token first.')
    return
  }
  
  // Create example files
  createExampleEnvFiles()
  
  // Create publishable key
  console.log('\n🔑 Creating publishable API key...')
  const apiKey = await createPublishableKey()
  
  if (apiKey) {
    await addSalesChannels(apiKey.id)
    
    console.log('\n🎉 Setup complete!')
    console.log('\n📋 Your publishable key has been created and configured.')
    console.log('\n🔧 Next steps:')
    console.log('1. Add this key to your Railway/Vercel environment variables:')
    console.log(`   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${apiKey.token}`)
    console.log('2. Restart your frontend application')
    console.log('3. Test your storefront connection')
    console.log('\n📚 Available scripts:')
    console.log('   npm run backend:dev      - Start backend')
    console.log('   npm run dev              - Start frontend')
    console.log('   node create-publishable-key.js - Recreate key')
  }
}

// Run the setup
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main } 