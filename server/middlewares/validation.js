import { body } from "express-validator";

// User validation rules
export const validateUserRegistration = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("phone")
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 characters"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
];

export const validateUserLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),
];

export const validateProfileUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 characters"),

  body("membershipType")
    .optional()
    .isIn(["basic", "premium", "vip"])
    .withMessage("Invalid membership type"),
];

// Trainer validation rules
export const validateTrainer = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Trainer name must be between 2 and 50 characters"),

  body("specialization")
    .trim()
    .notEmpty()
    .withMessage("Specialization is required"),

  body("image").isURL().withMessage("Please provide a valid image URL"),

  body("socialLinks.facebook")
    .optional()
    .isURL()
    .withMessage("Please provide a valid Facebook URL"),

  body("socialLinks.instagram")
    .optional()
    .isURL()
    .withMessage("Please provide a valid Instagram URL"),

  body("socialLinks.twitter")
    .optional()
    .isURL()
    .withMessage("Please provide a valid Twitter URL"),
];

// Contact validation rules
export const validateContactForm = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 characters"),

  body("subject")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Subject must be between 5 and 100 characters"),

  body("message")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters"),
];

// Membership validation rules
export const validateMembership = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Membership name must be between 2 and 50 characters"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  body("price")
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("duration")
    .isIn(["monthly", "quarterly", "yearly"])
    .withMessage("Duration must be monthly, quarterly, or yearly"),

  body("features")
    .isArray({ min: 1 })
    .withMessage("At least one feature is required"),

  body("features.*")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Each feature must be between 3 and 100 characters"),

  body("maxUsers")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Max users must be a positive integer"),
];

// Schedule validation rules
export const validateSchedule = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  body("trainer").isMongoId().withMessage("Valid trainer ID is required"),

  body("dayOfWeek")
    .isIn([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
    .withMessage("Valid day of week is required"),

  body("startTime")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Start time must be in HH:MM format"),

  body("endTime")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("End time must be in HH:MM format"),

  body("maxParticipants")
    .isInt({ min: 1, max: 100 })
    .withMessage("Max participants must be between 1 and 100"),

  body("room")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Room must be between 2 and 50 characters"),

  body("difficulty")
    .isIn(["Beginner", "Intermediate", "Advanced", "All Levels"])
    .withMessage("Valid difficulty level is required"),

  body("category")
    .isIn([
      "Yoga",
      "Pilates",
      "HIIT",
      "Strength Training",
      "Cardio",
      "Dance",
      "Martial Arts",
      "Swimming",
    ])
    .withMessage("Valid category is required"),
];

// Booking validation rules
export const validateBooking = [
  body("scheduleId").isMongoId().withMessage("Valid schedule ID is required"),

  body("bookingDate")
    .isISO8601()
    .withMessage("Valid booking date is required")
    .custom((value) => {
      const bookingDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (bookingDate < today) {
        throw new Error("Booking date cannot be in the past");
      }

      return true;
    }),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),
];

// Service validation rules
export const validateService = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Service title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  body("icon").trim().notEmpty().withMessage("Icon is required"),

  body("features")
    .isArray({ min: 1 })
    .withMessage("At least one feature is required"),

  body("features.*")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Each feature must be between 3 and 100 characters"),

  body("price").trim().notEmpty().withMessage("Price is required"),

  body("category")
    .isIn([
      "Personal Training",
      "Group Classes",
      "Cardio Training",
      "Strength Training",
      "HIIT & CrossFit",
      "Flexibility & Recovery",
    ])
    .withMessage("Valid category is required"),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a non-negative integer"),
];
