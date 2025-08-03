const { createUser } = require("@medusajs/medusa/dist/services/user")

async function createAdminUser() {
  try {
    const user = await createUser({
      email: "admin@frostlord.com",
      password: "admin123",
      role: "admin"
    })
    console.log("User created successfully:", user.email)
  } catch (error) {
    console.error("Error creating user:", error)
  }
}

createAdminUser() 