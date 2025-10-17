import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user_model.js";
import Trainer from "./models/trainer_model.js";
import Service from "./models/service_model.js";
import Schedule from "./models/schedule_model.js";

const seedData = async () => {
  try {
    console.log("🌱 Seeding database with default data...");

    // Seed default trainers
    const defaultTrainers = [
      {
        name: "Sarah Johnson",
        specialization: "Strength Training",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        experience: "8 years",
        clients: 150,
        rating: 4.9,
        bio: "Sarah is a certified strength and conditioning specialist with a passion for helping clients build functional strength and confidence.",
        specialties: ["Weight Training", "Powerlifting", "Bodybuilding"],
        certifications: ["CSCS", "NASM-CPT", "Olympic Lifting"],
        availability: "Mon-Fri: 6AM-8PM, Sat: 8AM-6PM",
        socialLinks: {
          instagram: "https://instagram.com/sarahjohnson",
          facebook: "https://facebook.com/sarahjohnson",
          twitter: "https://twitter.com/sarahjohnson",
        },
      },
      {
        name: "Mike Chen",
        specialization: "Cardio & HIIT",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        experience: "6 years",
        clients: 120,
        rating: 4.8,
        bio: "Mike specializes in high-intensity interval training and cardiovascular fitness, helping clients achieve their weight loss and endurance goals.",
        specialties: ["HIIT", "Cardio", "Weight Loss"],
        certifications: ["ACSM-CPT", "HIIT Specialist"],
        availability: "Mon-Fri: 5AM-9PM, Sun: 9AM-5PM",
        socialLinks: {
          instagram: "https://instagram.com/mikechen",
          facebook: "https://facebook.com/mikechen",
          twitter: "https://twitter.com/mikechen",
        },
      },
      {
        name: "Emma Rodriguez",
        specialization: "Yoga & Pilates",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        experience: "10 years",
        clients: 200,
        rating: 4.9,
        bio: "Emily is a certified yoga instructor and Pilates specialist, focusing on flexibility, balance, and mindful movement.",
        specialties: ["Yoga", "Pilates", "Meditation", "Flexibility"],
        certifications: ["RYT-500", "Pilates Certified", "Meditation Teacher"],
        availability: "Mon-Sat: 7AM-7PM",
        socialLinks: {
          instagram: "https://instagram.com/emmarodriguez",
          facebook: "https://facebook.com/emmarodriguez",
          twitter: "https://twitter.com/emmarodriguez",
        },
      },
    ];

    // Seed default schedules
    const defaultSchedules = [
      {
        title: "Morning Yoga",
        description:
          "Start your day with gentle yoga poses and breathing exercises",
        trainer: null, // Will be set after trainers are created
        dayOfWeek: "Monday",
        startTime: "06:00",
        endTime: "07:00",
        maxParticipants: 20,
        room: "Studio A",
        difficulty: "All Levels",
        category: "Yoga",
        isActive: true,
      },
      {
        title: "HIIT Workout",
        description:
          "High-intensity interval training for maximum calorie burn",
        trainer: null,
        dayOfWeek: "Tuesday",
        startTime: "18:00",
        endTime: "19:00",
        maxParticipants: 15,
        room: "Studio B",
        difficulty: "Intermediate",
        category: "HIIT",
        isActive: true,
      },
      {
        title: "Strength Training",
        description:
          "Build muscle and strength with progressive resistance training",
        trainer: null,
        dayOfWeek: "Wednesday",
        startTime: "19:00",
        endTime: "20:00",
        maxParticipants: 12,
        room: "Weight Room",
        difficulty: "Advanced",
        category: "Strength Training",
        isActive: true,
      },
      {
        title: "Pilates Core",
        description: "Strengthen your core with controlled Pilates movements",
        trainer: null,
        dayOfWeek: "Thursday",
        startTime: "07:00",
        endTime: "08:00",
        maxParticipants: 18,
        room: "Studio A",
        difficulty: "Beginner",
        category: "Pilates",
        isActive: true,
      },
      {
        title: "Cardio Dance",
        description:
          "Fun and energetic dance workout to get your heart pumping",
        trainer: null,
        dayOfWeek: "Friday",
        startTime: "17:30",
        endTime: "18:30",
        maxParticipants: 25,
        room: "Studio B",
        difficulty: "All Levels",
        category: "Dance",
        isActive: true,
      },
      {
        title: "Weekend Yoga",
        description: "Relaxing weekend yoga session to unwind and destress",
        trainer: null,
        dayOfWeek: "Saturday",
        startTime: "10:00",
        endTime: "11:00",
        maxParticipants: 20,
        room: "Studio A",
        difficulty: "All Levels",
        category: "Yoga",
        isActive: true,
      },
    ];

    // Seed default services
    const defaultServices = [
      {
        title: "Personal Training",
        description:
          "One-on-one training sessions with certified personal trainers tailored to your fitness goals.",
        icon: "Dumbbell",
        features: [
          "Customized workout plans",
          "Nutrition guidance",
          "Progress tracking",
          "Flexible scheduling",
        ],
        price: "From $80/session",
        category: "Personal Training",
        order: 1,
      },
      {
        title: "Group Classes",
        description:
          "Join our energetic group fitness classes designed for all fitness levels.",
        icon: "Users",
        features: [
          "Variety of class types",
          "Experienced instructors",
          "Motivating atmosphere",
          "All fitness levels welcome",
        ],
        price: "Included in membership",
        category: "Group Classes",
        order: 2,
      },
      {
        title: "Cardio Training",
        description:
          "State-of-the-art cardio equipment and programs to improve your cardiovascular health.",
        icon: "Heart",
        features: [
          "Latest cardio machines",
          "Personalized programs",
          "Heart rate monitoring",
          "Group cardio sessions",
        ],
        price: "Included in membership",
        category: "Cardio Training",
        order: 3,
      },
    ];

    // Clear existing data
    await Trainer.deleteMany({});
    await Service.deleteMany({});
    await Schedule.deleteMany({});

    // Insert default data
    const trainers = await Trainer.insertMany(defaultTrainers);
    const services = await Service.insertMany(defaultServices);

    // Assign trainers to schedules (round-robin assignment)
    const schedulesWithTrainers = defaultSchedules.map((schedule, index) => ({
      ...schedule,
      trainer: trainers[index % trainers.length]._id,
    }));

    const schedules = await Schedule.insertMany(schedulesWithTrainers);

    console.log(`✅ Seeded ${trainers.length} trainers`);
    console.log(`✅ Seeded ${services.length} services`);
    console.log(`✅ Seeded ${schedules.length} schedules`);
    console.log("🎉 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const mongoURI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/gymwebsite";

  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
      return seedData();
    })
    .then(() => {
      console.log("Seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}

export default seedData;
