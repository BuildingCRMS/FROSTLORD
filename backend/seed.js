const { Container } = require("@medusajs/medusa/dist/container")

async function seed() {
  try {
    console.log("Starting seed...")
    
    const container = new Container()
    await container.load()
    
    const userService = container.resolve("userService")
    
    console.log("Creating admin user...")
    
    const user = await userService.create({
      email: "admin@frostlord.com",
      password: "admin123",
      role: "admin"
    })
    
    console.log("✅ Admin user created successfully!")
    console.log("Email:", user.email)
    console.log("Role:", user.role)
    
    process.exit(0)
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

seed() 