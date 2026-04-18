export const mockUsers = {
  household: { id: "h1", role: "household", name: "Sarah Jenkins", email: "sarah@example.com" },
  helper: { id: "w1", role: "helper", name: "Maria Garcia", email: "maria@example.com" },
  admin: { id: "a1", role: "admin", name: "Admin User", email: "admin@maidnanny.com" }
};

export const mockHelpers = [
  {
    id: "w1",
    name: "Maria Garcia",
    type: "Maid",
    experience: "5 Years",
    rating: 4.8,
    reviews: 124,
    verified: true,
    availability: "Available",
    location: "New York, NY",
    skills: ["Cleaning", "Laundry", "Cooking"],
    about: "Reliable and detail-oriented maid with 5 years of experience in residential cleaning and home management.",
    plans: {
      hourly: "$25/hr",
      monthly: "$800/mo",
      yearly: "$9000/yr"
    },
    avatar: "https://i.pravatar.cc/150?u=maria"
  },
  {
    id: "w2",
    name: "Jane Smith",
    type: "Nanny",
    experience: "8 Years",
    rating: 4.9,
    reviews: 89,
    verified: true,
    availability: "Unavailable",
    location: "Brooklyn, NY",
    skills: ["Childcare", "First Aid", "Tutoring"],
    about: "Certified nanny with comprehensive experience in newborn and toddler care. CPR certified.",
    plans: {
      hourly: "$35/hr",
      monthly: "$1200/mo",
      yearly: "$13000/yr"
    },
    avatar: "https://i.pravatar.cc/150?u=jane"
  },
  {
    id: "w3",
    name: "Elena Rodriguez",
    type: "Babysitter",
    experience: "2 Years",
    rating: 4.5,
    reviews: 32,
    verified: false,
    availability: "Available",
    location: "Queens, NY",
    skills: ["Childcare", "Pet Care"],
    about: "Energetic college student looking for part-time babysitting jobs.",
    plans: {
      hourly: "$20/hr",
      monthly: null,
      yearly: null
    },
    avatar: "https://i.pravatar.cc/150?u=elena"
  }
];

export const mockBookings = [
  {
    id: "b1",
    userId: "h1",
    helperId: "w1",
    status: "Active",
    plan: "Monthly",
    startDate: "2026-04-01",
    amount: "$800"
  },
  {
    id: "b2",
    userId: "h1",
    helperId: "w2",
    status: "Completed",
    plan: "Hourly",
    startDate: "2026-03-15",
    amount: "$140"
  }
];

export const mockAnalytics = {
  registeredHouseholds: 1240,
  verifiedHelpers: 843,
  activeBookings: 512,
  satisfactionRate: "94%"
};
