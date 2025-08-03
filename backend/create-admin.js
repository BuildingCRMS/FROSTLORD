const { Container } = require("@medusajs/medusa/dist/container")
const { UserService } = require("@medusajs/medusa/dist/services/user")

async function createAdminUser() {
  try {
    const container = new Container()
    await container.load()
    
    const userService = container.resolve("userService")
    
    const user = await userService.create({
      email: "admin@frostlord.com",
      password: "admin123",
      role: "admin"
    })
    
    console.log("Admin user created successfully:", user.email)
    process.exit(0)
  } catch (error) {
    console.error("Error creating admin user:", error.message)
    process.exit(1)
  }
}

createAdminUser() 