import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const eventPlannerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  contact: z.string().regex(/^[6-9]\d{9}$/, "Invalid contact number"),
  password: z.string().min(6, "Minimum 6 characters"),
  company: z.string(),
  services: z.string(),
  experience: z.string(),
});

type EventPlannerFormData = z.infer<typeof eventPlannerSchema>;

const EventPlannerRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventPlannerFormData>({
    resolver: zodResolver(eventPlannerSchema),
  });

  const onSubmit = (data: EventPlannerFormData) => {
    console.log("Event Planner Registered:", data);
    // You can call a mutation here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7eefd] px-4 py-10">
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Event Planner</h2>
        <p className="text-center text-gray-600">Sign up to organize amazing events</p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            {...register("fullName")}
            placeholder="Full Name"
            className="input-style"
          />
          <input
            {...register("email")}
            placeholder="Email"
            className="input-style"
          />
          <input
            {...register("contact")}
            placeholder="Phone Number"
            className="input-style"
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input-style"
          />
          <input
            {...register("company")}
            placeholder="Company Name"
            className="input-style"
          />
          <select {...register("services")} className="input-style">
            <option value="">Select Services</option>
            <option value="wedding">Wedding Planning</option>
            <option value="corporate">Corporate Events</option>
            <option value="birthday">Birthday / Private</option>
          </select>
          <select {...register("experience")} className="input-style">
            <option value="">Experience Level</option>
            <option value="beginner">0–2 years</option>
            <option value="intermediate">2–5 years</option>
            <option value="expert">5+ years</option>
          </select>

          <div className="col-span-1 sm:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-[#5a3eff] text-white py-3 rounded-xl hover:bg-[#4c35e6]"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input-style {
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default EventPlannerRegister;
