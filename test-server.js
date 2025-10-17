const axios = require("axios");

async function testServer() {
  try {
    console.log("Testing server connection...");

    // Test health endpoint
    const healthResponse = await axios.get("http://localhost:3000/health");
    console.log("✅ Health check:", healthResponse.data);

    // Test API root
    const apiResponse = await axios.get("http://localhost:3000/");
    console.log("✅ API root:", apiResponse.data);

    // Test login endpoint
    try {
      const loginResponse = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: "admin@fitfatgym.com",
          password: "Admin123",
        }
      );
      console.log(
        "✅ Admin login test:",
        loginResponse.data.success ? "SUCCESS" : "FAILED"
      );
    } catch (loginError) {
      console.log(
        "❌ Admin login test failed:",
        loginError.response?.data?.message || loginError.message
      );
    }
  } catch (error) {
    console.error("❌ Server test failed:", error.message);
    if (error.code === "ECONNREFUSED") {
      console.log("💡 Make sure the server is running on port 3000");
    }
  }
}

testServer();
