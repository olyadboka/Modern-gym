const axios = require("axios");

async function testTrainerAPI() {
  try {
    console.log("Testing trainer API...");

    // Test trainer endpoint
    const response = await axios.get(
      "https://modern-gym-backend.onrender.com/api/trainers"
    );
    console.log("✅ Trainer API Response:", response.data);

    if (response.data.success && response.data.trainers) {
      console.log(`✅ Found ${response.data.trainers.length} trainers`);
      response.data.trainers.forEach((trainer, index) => {
        console.log(
          `${index + 1}. ${trainer.name} - ${trainer.specialization}`
        );
      });
    } else {
      console.log("❌ No trainers found or API error");
    }
  } catch (error) {
    console.error("❌ Trainer API test failed:", error.message);
    if (error.code === "ECONNREFUSED") {
      console.log("💡 Make sure the server is running on port 3000");
    }
  }
}

testTrainerAPI();
