cat > create-user.js << 'EOF'
const { MedusaContainer } = require("@medusajs/medusa");

const createUser = async () => {
  const container = MedusaContainer.getInstance();
  const userService = container.resolve("userService");
  
  try {
    const user = await userService.create({
      email: "admin@frostlord.com",
      password: "admin123",
      role: "admin"
    });
    console.log("User created:", user.email);
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
};

createUser();
EOF