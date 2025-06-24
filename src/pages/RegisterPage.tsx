import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBicycle, FaCar, FaPlane } from "react-icons/fa";
import { fetchRoles } from "../api/roles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../hooks/useRegister";

const steps = ["Select Role", "Enter Details", "Review", "Subscription"];

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
  type RoleType = { id: string; name: string };
  const [availableRoles, setAvailableRoles] = useState<RoleType[]>([]);
  const [step, setStep] = useState<number>(1);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
    reset,
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
      const matchedRole = availableRoles.find(
        (r) => r.name.toLowerCase() === role.toLowerCase()
      );
      if (matchedRole) setRoleId(Number(matchedRole.id));
    }
  }, [role, availableRoles]);

  const validateStep2 = () => {
    const values = getValues();
    if (!values.fullName || !values.email || !values.contact || !values.password)
      return false;
    if (role === "vendor" || role === "freelancer") {
      if (!values.category || !values.service) return false;
    }
    return true;
  };

  const validateCurrentStep = () => {
    if (step === 1 && !role) return false;
    if (step === 2 && !validateStep2()) return false;
    if (step === 4 && !getValues().subscription) return false;
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      setDialogMessage("Please fill all required fields correctly.");
      setShowDialog(true);
      return;
    }
    if (step < steps.length) setStep((prev) => prev + 1);
  };

  const prevStep = () => step > 1 && setStep((prev) => prev - 1);

  const onSubmit = (data: RegisterFormData) => {
    if (!roleId) {
      setDialogMessage("Unable to fetch role ID. Try again later.");
      setShowDialog(true);
      return;
    }
    registerMutate(
      {
        username: data.fullName,
        email: data.email,
        password: data.password,
        role: roleId as any, // typecast for mutation
      },
      {
        onSuccess: () => {
          setDialogMessage("Registration successful! Redirecting...");
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
            navigate(`/dashboard/${role.toLowerCase()}-dashboard`);
          }, 1500);
        },
        onError: () => {
          setDialogMessage("Registration failed. Please try again.");
          setShowDialog(true);
        },
      }
    );
  };

  const plans = [
    {
      name: "Start-Up",
      price: "Free",
      icon: <FaBicycle size={36} className="text-purple-500 mx-auto mb-2" />,
      features: ["Unlimited Downloads", "Email Support", "Lifetime Access"],
      value: "start-up",
    },
    {
      name: "Pro",
      price: "$49",
      icon: <FaCar size={36} className="text-pink-500 mx-auto mb-2" />,
      features: ["Everything in Free", "Custom Call Support", "1 Year Access"],
      value: "pro",
    },
    {
      name: "Enterprise",
      price: "$99",
      icon: <FaPlane size={36} className="text-blue-500 mx-auto mb-2" />,
      features: ["Everything in Pro", "Priority Support", "Lifetime Access"],
      value: "enterprise",
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-pink-50 overflow-hidden">
      {/* Background Blur Elements */}
      <div className="absolute inset-0 animate-softGradient bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 blur-2xl opacity-60" />
      <div className="absolute w-72 h-72 bg-pink-200 rounded-full blur-2xl opacity-40 animate-float1 top-10 left-10" />
      <div className="absolute w-64 h-64 bg-purple-200 rounded-full blur-2xl opacity-40 animate-float2 bottom-10 right-10" />
      <div className="absolute w-56 h-56 bg-blue-200 rounded-full blur-2xl opacity-30 animate-float1 bottom-20 left-1/2 -translate-x-1/2" />

      {showDialog && (
        <div className="fixed inset-0 bg-pink-200 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg px-6 py-5 text-center max-w-sm w-full">
            <p className="text-lg font-semibold text-gray-800">
              {dialogMessage}
            </p>
            <button
              className="mt-4 bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700"
              onClick={() => setShowDialog(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl px-6 py-10 w-Screen max-w-4xl h-Screen max-h-Screen border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
  {step === 1
    ? "Sign Up "
    : `${role.charAt(0).toUpperCase() + role.slice(1)} `}
</h2>

        

        {step !== 1 && (
  <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm font-semibold text-gray-600">
    {steps.map((s, i) => (
      <div key={i} className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            i + 1 === step
              ? "bg-pink-600 text-white border-pink-600"
              : "border-gray-300"
          }`}
        >
          {i + 1}
        </div>
        <span className="mx-2">{s}</span>
        {i < steps.length - 2 && <div className="w-6 h-1 bg-gray-300" />}
      </div>
    ))}
  </div>
)}


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && (
  <div className="flex flex-col items-center gap-6">
    {[
      {
        key: "Individual",
        label: "Individual",
        description: "If you planning an event.",
      },
      {
        key: "vendor",
        label: "Vendor",
        description: "If you are a service provider like a venue,caterer etc...",
      },
      {
        key: "freelancer",
        label: "Freelancer",
        description: "If you are an individual provider like DJ ,driver etc..",
      },
    ].map(({ key, label, description }) => (
      <button
        key={key}
        type="button"
        onClick={() => {
          setRole(key);
          setTimeout(() => setStep(2), 0);
        }}
        className={`w-100 px-6 py-4 rounded-xl border text-left transition-all duration-300 shadow-md ${
          role === key
            ? "bg-blue-600 text-gray border-pink-700"
            : " text-gray-700 border border-pink-400 hover:bg-pink-50"
        }`}
      >
        <h3 className="text-xl font-bold mb-1">{label}</h3>
        <p className="text-sm font-normal text-black-600 dark:text-black-300">
          {description}
        </p>
      </button>
    ))}
  </div>
)}


          

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                className="p-3 rounded-lg border shadow-sm w-full"
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs">
                  {errors.fullName.message}
                </span>
              )}
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="p-3 rounded-lg border shadow-sm w-full"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
              <input
                type="tel"
                placeholder="Contact Number"
                {...register("contact")}
                className="p-3 rounded-lg border shadow-sm w-full"
              />
              {errors.contact && (
                <span className="text-red-500 text-xs">
                  {errors.contact.message}
                </span>
              )}
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="p-3 rounded-lg border shadow-sm w-full"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}

              {(role === "vendor" || role === "freelancer") && (
                <>
                  <input
                    type="text"
                    placeholder="Company Name (optional)"
                    {...register("company")}
                    className="p-3 rounded-lg border shadow-sm w-full"
                  />
                  <select
                    {...register("category")}
                    className="p-3 rounded-lg border shadow-sm w-full bg-pink-50"
                  >
                    <option value="">Select Category</option>
                    <option value="catering">Catering</option>
                    <option value="photography">Photography</option>
                    <option value="decoration">Decoration</option>
                  </select>
                  <select
                    {...register("service")}
                    className="p-3 rounded-lg border shadow-sm w-full bg-pink-50"
                  >
                    <option value="">Select Service</option>
                    <option value="food-service">Food Service</option>
                    <option value="venue-decoration">Venue Decoration</option>
                    <option value="photo-shoot">Photo Shoot</option>
                  </select>
                </>
              )}

              <div className="sm:col-span-2 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-pink-700 underline"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-gray-700 space-y-3 text-sm sm:text-base">
              <p><strong>Role:</strong> {role}</p>
              <p><strong>Full Name:</strong> {watch("fullName")}</p>
              <p><strong>Email:</strong> {watch("email")}</p>
              <p><strong>Contact:</strong> {watch("contact")}</p>
              {(role === "vendor" || role === "freelancer") && (
                <>
                  <p><strong>Company:</strong> {watch("company")}</p>
                  <p><strong>Category:</strong> {watch("category")}</p>
                  <p><strong>Service:</strong> {watch("service")}</p>
                </>
              )}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-pink-700 underline"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <h2 className="text-xl sm:text-2xl font-bold text-center text-pink-700">
                Choose Your Plan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`rounded-xl p-6 border-2 text-center cursor-pointer transition-all ${
                      watch("subscription") === plan.value
                        ? "border-pink-600 bg-pink-100"
                        : "border-gray-300 bg-white hover:shadow-lg"
                    }`}
                    onClick={() => setValue("subscription", plan.value)}
                  >
                    {plan.icon}
                    <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                    <p className="text-pink-700 font-semibold mb-2">
                      {plan.price}
                    </p>
                    <ul className="text-gray-600 text-sm mb-4 space-y-1">
                      {plan.features.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className={`px-4 py-2 mt-2 rounded-lg text-white ${
                        watch("subscription") === plan.value
                          ? "bg-pink-700"
                          : "bg-pink-500 hover:bg-pink-600"
                      }`}
                    >
                      Choose
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-pink-700 underline"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md"
                  disabled={isPending}
                >
                  {isPending ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <style>{`
        .animate-softGradient {
          background-size: 300% 300%;
          animation: gradientShift 15s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float1 {
          animation: float1 10s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 14s ease-in-out infinite;
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(25px) translateX(15px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Register;
