const { randomBytes } = require('crypto')

// Generate a simple publishable key
const generateKey = () => {
  const prefix = 'pk_'
  const randomPart = randomBytes(32).toString('hex')
  return prefix + randomPart
}

const publishableKey = generateKey()

console.log('Generated Publishable Key:', publishableKey)
console.log('\nAdd this to your .env file:')
console.log(`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${publishableKey}`)

// Let's also update the .env file directly
const fs = require('fs')
const path = require('path')

try {
  const envPath = path.join(__dirname, '..', '.env')
  let envContent = ''
  
  try {
    envContent = fs.readFileSync(envPath, 'utf8')
  } catch (error) {
    console.log('Creating new .env file...')
  }
  
  // Update or add the publishable key
  const lines = envContent.split('\n')
  let keyFound = false
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=')) {
      lines[i] = `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${publishableKey}`
      keyFound = true
      break
    }
  }
  
  if (!keyFound) {
    lines.push(`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${publishableKey}`)
  }
  
  fs.writeFileSync(envPath, lines.join('\n'))
  console.log('✅ Updated .env file with new publishable key')
  
} catch (error) {
  console.error('❌ Error updating .env file:', error.message)
}
