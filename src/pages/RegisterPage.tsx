import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchRoles } from "../api/roles";
import useRegister from "../hooks/useRegister";

const registerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  company: z.string().optional(),
  category: z.string().optional(),
  service: z.string().optional(),
  subscription: z.string().min(1, "Subscription is required"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [availableRoles, setAvailableRoles] = useState<{ id: string; name: string }[]>([]);
  const [step, setStep] = useState<number>(1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contact: "",
      password: "",
      company: "",
      category: "",
      service: "",
      subscription: "",
    },
  });

  const { mutate: registerMutate, isPending } = useRegister();

  useEffect(() => {
    fetchRoles().then((roles) => setAvailableRoles(roles));
  }, []);

  useEffect(() => {
    if (role) {
      localStorage.setItem("userRole", role);
      const matchedRole = availableRoles.find((r) => r.name.toLowerCase() === role.toLowerCase());
      if (matchedRole) setRoleId(Number(matchedRole.id));
    }
  }, [role, availableRoles]);

  const onSubmit = (data: RegisterFormData) => {
    if (!roleId) return;
    registerMutate({
      username: data.fullName,
      email: data.email,
      password: data.password,
      role: roleId as any,
    }, {
      onSuccess: () => navigate(`/dashboard/${role.toLowerCase()}-dashboard`)
    });
  };

  const renderStepper = (labels: string[]) => (
    <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-700 mb-6">
      {labels.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${step === i + 2 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}`}>{i + 1}</div>
          <span className="ml-1 mr-3 text-sm">{label}</span>
          {i < labels.length - 1 && <div className="w-4 h-0.5 bg-gray-300" />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7eefd] py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-6 sm:p-10 relative">
        {step === 1 && (
          <>
            <button
              className="absolute top-4 right-5 text-xl font-bold text-gray-400 hover:text-gray-600"
              onClick={() => navigate("/")}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Sign up</h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Which option describes you best?
            </p>
            <div className="space-y-4">
              {[
                { key: "user", title: "Individual", description: "If you are planning an event" },
                { key: "vendor", title: "Vendor", description: "If you are a service provider like a venue, caterer, etc" },
                { key: "freelancer", title: "Freelancer", description: "If you are an individual service provider like a photographer, DJ, driver, etc" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setRole(item.key);
                    setTimeout(() => setStep(2), 0);
                  }}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                    role === item.key
                      ? "bg-[#5a3eff] text-white border-[#5a3eff] shadow-lg"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-base font-semibold">{item.title}</div>
                  <div className="text-sm mt-1 opacity-80">{item.description}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && role === "user" && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Individual</h2>
            <p className="text-center text-gray-600">Sign up to plan your event</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" {...register("email")} className="input-style" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" {...register("password")} className="input-style" />
              <p className="text-xs text-gray-500">Must be at least 8 characters</p>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full bg-[#5a3eff] hover:bg-[#4c35e6] text-white py-3 rounded-xl font-medium text-lg" disabled={isPending}>
              {isPending ? "Signing up..." : "Sign up"}
            </button>
          </form>
        )}

        {step === 2 && (role === "vendor" || role === "freelancer") && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <h2 className="text-2xl font-bold text-center capitalize">{role}</h2>
            {renderStepper(role === "vendor"
              ? ["Personal Details", "Venue Details", "Services", "Subscription"]
              : ["Personal Details", "Services", "Subscription"]
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input {...register("fullName")} placeholder="Full Name" className="input-style" />
              <input {...register("email")} placeholder="Email" className="input-style" />
              <input {...register("contact")} placeholder="Contact Number" className="input-style" />
              <input {...register("password")} placeholder="Password" type="password" className="input-style" />
              <input {...register("company")} placeholder="Company Name (optional)" className="input-style" />
              <select {...register("category")} className="input-style">
                <option value="">Select Category</option>
                <option value="catering">Catering</option>
                <option value="photography">Photography</option>
                <option value="decoration">Decoration</option>
              </select>
              <select {...register("service")} className="input-style">
                <option value="">Select Service</option>
                <option value="food-service">Food Service</option>
                <option value="venue-decoration">Venue Decoration</option>
                <option value="photo-shoot">Photo Shoot</option>
              </select>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button type="button" onClick={() => setStep(1)} className="text-pink-600 text-sm underline">
                Back
              </button>
              <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg">
                Continue
              </button>
            </div>
          </form>
        )}
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

export default Register;
