const { MedusaApp } = require("@medusajs/medusa")

async function createPublishableKey() {
  try {
    console.log("Creating and registering publishable key in database...")
    
    // Initialize Medusa with database connection
    const { container } = await MedusaApp({
      projectDir: __dirname,
    })
    
    // Get the manager (database connection)
    const manager = container.resolve("manager")
    
    // Create publishable key directly in database
    const publishableKey = `pk_${require('crypto').randomBytes(32).toString('hex')}`
    
    await manager.query(`
      INSERT INTO api_key (id, title, token, type, created_at, updated_at)
      VALUES (
        gen_random_uuid(),
        'FROSTLORD Store Frontend Key',
        $1,
        'publishable',
        NOW(),
        NOW()
      )
    `, [publishableKey])
    
    console.log("✅ Publishable key created successfully!")
    console.log("Key:", publishableKey)
    console.log("\nUpdating .env file...")
    
    // Update .env file
    const fs = require('fs')
    const path = require('path')
    const envPath = path.join(__dirname, '..', '.env')
    
    let envContent = fs.readFileSync(envPath, 'utf8')
    const lines = envContent.split('\n')
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=')) {
        lines[i] = `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${publishableKey}`
        break
      }
    }
    
    fs.writeFileSync(envPath, lines.join('\n'))
    console.log("✅ Updated .env file")
    console.log("\nRestart your servers for changes to take effect.")
    
    process.exit(0)
    
  } catch (error) {
    console.error("❌ Error:", error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

createPublishableKey()
