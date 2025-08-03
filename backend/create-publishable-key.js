const axios = require('axios')
const { randomBytes } = require('crypto')
const fs = require('fs')
const path = require('path')

// Configuration
const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000'
const ADMIN_TOKEN = process.env.MEDUSA_ADMIN_TOKEN || 'your_admin_token_here'

// Generate a publishable key token
const generatePublishableKey = () => {
  const prefix = 'pk_'
  const randomPart = randomBytes(32).toString('hex')
  return prefix + randomPart
}

// Create publishable API key via Medusa Admin API
const createPublishableKey = async () => {
  try {
    console.log('🔑 Creating publishable API key...')
    
    const response = await axios.post(
      `${BACKEND_URL}/admin/api-keys`,
      {
        title: 'FROSTLORD Storefront Key',
        type: 'publishable'
      },
      {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    const apiKey = response.data.api_key
    console.log('✅ Publishable API key created successfully!')
    console.log('📋 Key Details:')
    console.log(`   ID: ${apiKey.id}`)
    console.log(`   Title: ${apiKey.title}`)
    console.log(`   Type: ${apiKey.type}`)
    console.log(`   Token: ${apiKey.token}`)
    
    return apiKey
    
  } catch (error) {
    console.error('❌ Error creating publishable key:', error.response?.data || error.message)
    
    if (error.response?.status === 401) {
      console.log('\n💡 To fix this, you need to:')
      console.log('1. Create an admin user: npx medusa user -e admin@frostlord.com -p yourpassword')
      console.log('2. Get your admin token from the admin dashboard')
      console.log('3. Set MEDUSA_ADMIN_TOKEN environment variable')
    }
    
    return null
  }
}

// Add sales channels to the publishable key
const addSalesChannels = async (apiKeyId) => {
  try {
    console.log('\n🛍️  Adding sales channels to API key...')
    
    // First, get available sales channels
    const channelsResponse = await axios.get(
      `${BACKEND_URL}/admin/sales-channels`,
      {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    const salesChannels = channelsResponse.data.sales_channels
    if (salesChannels.length === 0) {
      console.log('⚠️  No sales channels found. Creating default sales channel...')
      
      // Create a default sales channel
      const channelResponse = await axios.post(
        `${BACKEND_URL}/admin/sales-channels`,
        {
          name: 'Default Store',
          description: 'Default sales channel for FROSTLORD'
        },
        {
          headers: {
            'Authorization': `Bearer ${ADMIN_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      )
      
      salesChannels.push(channelResponse.data.sales_channel)
    }
    
    // Add all sales channels to the API key
    const channelIds = salesChannels.map(channel => channel.id)
    
    await axios.post(
      `${BACKEND_URL}/admin/api-keys/${apiKeyId}/sales-channels`,
      {
        add: channelIds
      },
      {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('✅ Sales channels added to API key!')
    console.log(`   Channels: ${salesChannels.map(c => c.name).join(', ')}`)
    
  } catch (error) {
    console.error('❌ Error adding sales channels:', error.response?.data || error.message)
  }
}

// Update environment files
const updateEnvironmentFiles = (apiKey) => {
  console.log('\n📝 Updating environment files...')
  
  // Update root .env file
  try {
    const rootEnvPath = path.join(__dirname, '..', '.env')
    let rootEnvContent = ''
    
    try {
      rootEnvContent = fs.readFileSync(rootEnvPath, 'utf8')
    } catch (error) {
      console.log('Creating new root .env file...')
    }
    
    const lines = rootEnvContent.split('\n')
    let keyFound = false
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=')) {
        lines[i] = `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${apiKey.token}`
        keyFound = true
        break
      }
    }
    
    if (!keyFound) {
      lines.push(`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${apiKey.token}`)
    }
    
    fs.writeFileSync(rootEnvPath, lines.join('\n'))
    console.log('✅ Updated root .env file')
    
  } catch (error) {
    console.error('❌ Error updating root .env:', error.message)
  }
  
  // Update backend .env file
  try {
    const backendEnvPath = path.join(__dirname, '.env')
    let backendEnvContent = ''
    
    try {
      backendEnvContent = fs.readFileSync(backendEnvPath, 'utf8')
    } catch (error) {
      console.log('Creating new backend .env file...')
    }
    
    const lines = backendEnvContent.split('\n')
    let keyFound = false
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('MEDUSA_PUBLISHABLE_KEY=')) {
        lines[i] = `MEDUSA_PUBLISHABLE_KEY=${apiKey.token}`
        keyFound = true
        break
      }
    }
    
    if (!keyFound) {
      lines.push(`MEDUSA_PUBLISHABLE_KEY=${apiKey.token}`)
    }
    
    fs.writeFileSync(backendEnvPath, lines.join('\n'))
    console.log('✅ Updated backend .env file')
    
  } catch (error) {
    console.error('❌ Error updating backend .env:', error.message)
  }
}

// Main execution
const main = async () => {
  console.log('🚀 FROSTLORD Publishable API Key Creator\n')
  
  if (!ADMIN_TOKEN || ADMIN_TOKEN === 'your_admin_token_here') {
    console.log('❌ MEDUSA_ADMIN_TOKEN not set or invalid')
    console.log('\n💡 To get your admin token:')
    console.log('1. Start your Medusa backend: npm run backend:dev')
    console.log('2. Create admin user: npx medusa user -e admin@frostlord.com -p yourpassword')
    console.log('3. Login to admin dashboard: http://localhost:9000/app')
    console.log('4. Go to Settings → API Keys')
    console.log('5. Copy your admin token')
    console.log('6. Set environment variable: export MEDUSA_ADMIN_TOKEN=your_token')
    console.log('\nOr run this script with: MEDUSA_ADMIN_TOKEN=your_token node create-publishable-key.js')
    return
  }
  
  const apiKey = await createPublishableKey()
  
  if (apiKey) {
    await addSalesChannels(apiKey.id)
    updateEnvironmentFiles(apiKey)
    
    console.log('\n🎉 Setup complete!')
    console.log('\n📋 Next steps:')
    console.log('1. Add this key to your Railway/Vercel environment variables:')
    console.log(`   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${apiKey.token}`)
    console.log('2. Restart your frontend application')
    console.log('3. Test your storefront connection')
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { createPublishableKey, addSalesChannels }
