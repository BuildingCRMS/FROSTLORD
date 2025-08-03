const { Client } = require('pg')
const crypto = require('crypto')

async function createPublishableKey() {
  const client = new Client({
    host: 'localhost',
    port: 5433,
    database: 'frostlord',
    user: 'postgres',
    password: '100801',
    ssl: false
  })
  
  try {
    console.log("Connecting to database...")
    await client.connect()
    
    console.log("Creating publishable key...")
    const publishableKey = `pk_${crypto.randomBytes(32).toString('hex')}`
    const keyId = crypto.randomUUID()
    
    await client.query(`
      INSERT INTO api_key (id, title, token, type, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
    `, [keyId, 'FROSTLORD Store Frontend Key', publishableKey, 'publishable'])
    
    console.log("✅ Publishable key created successfully!")
    console.log("Key:", publishableKey)
    
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
    
    await client.end()
    console.log("\nRestart your servers for changes to take effect.")
    
  } catch (error) {
    console.error("❌ Error:", error.message)
    console.error(error.stack)
    await client.end()
    process.exit(1)
  }
}

createPublishableKey()
