const { MedusaApp } = require('@medusajs/framework')

async function createPublishableKey() {
  try {
    console.log('Creating publishable key...')
    
    const app = await MedusaApp({
      workerMode: 'shared'
    })
    
    const container = app.scope.container
    const apiKeyModuleService = container.resolve('api_key')
    
    // Create a publishable API key
    const publishableKey = await apiKeyModuleService.createApiKeys({
      title: 'FROSTLORD Store Frontend',
      type: 'publishable',
      created_by: 'system'
    })
    
    console.log('✅ Publishable key created successfully!')
    console.log('Key:', publishableKey.token)
    
    await app.shutdown()
    process.exit(0)
    
  } catch (error) {
    console.error('❌ Error creating publishable key:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

createPublishableKey()
