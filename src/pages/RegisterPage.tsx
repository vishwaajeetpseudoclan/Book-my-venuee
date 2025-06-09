import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBicycle, FaCar, FaPlane } from "react-icons/fa";
import { register } from "../api/auth";

const steps = ["Select Role", "Enter Details", "Review", "Subscription"];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    company: "",
    category: "",
    service: "",
    subscription: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!role) {
        alert("Please select a role before registering.");
        return;
      }

      const data = await register(
        formData.fullName,
        formData.email,
        formData.password
      );

      // ✅ Save local role
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("ROLE", JSON.stringify(role)); 
      localStorage.setItem("AUTH_TOKEN", data.jwt);

      navigate("/dashboard/dashboardpage");
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error(error);
    }
  };

  const plans = [
    {
      name: "Start-Up",
      price: "Free",
      icon: <FaBicycle size={40} className="text-purple-500 mx-auto mb-2" />,
      features: ["Unlimited Downloads", "Email Support", "Lifetime Access"],
      value: "start-up",
    },
    {
      name: "Pro",
      price: "49$",
      icon: <FaCar size={40} className="text-pink-500 mx-auto mb-2" />,
      features: [
        "Everything in Free, plus",
        "Custom Call Support",
        "1 Year Access",
      ],
      value: "pro",
    },
    {
      name: "Enterprise",
      price: "99$",
      icon: <FaPlane size={40} className="text-blue-500 mx-auto mb-2" />,
      features: [
        "Everything in Pro, plus",
        "Priority Support",
        "Lifetime Access",
      ],
      value: "enterprise",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Multi-Step Registration
      </h1>

      {/* Stepper */}
      <div className="flex justify-center mb-10">
        {steps.map((s, index) => (
          <div
            key={index}
            className={`flex items-center text-sm md:text-base ${
              index < step - 1 ? "text-green-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 ${
                index + 1 === step
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-gray-400"
              }`}
            >
              {index + 1}
            </div>
            <span className="mx-2">{s}</span>
            {index < steps.length - 1 && (
              <div className="w-8 md:w-16 h-1 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {step === 1 && (
          <div className="flex justify-center gap-6 flex-wrap">
            {["user", "vendor", "freelancer"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  nextStep();
                }}
                className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                  role === r
                    ? "bg-purple-700 text-white"
                    : "bg-white hover:bg-purple-200 text-purple-700 shadow-md"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="p-3 rounded-xl shadow w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="p-3 rounded-xl shadow w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="p-3 rounded-xl shadow w-full"
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="p-3 rounded-xl shadow w-full"
            />

            {(role === "vendor" || role === "freelancer") && (
              <>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="p-3 rounded-xl shadow w-full"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="p-3 rounded-xl shadow w-full"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="catering">Catering</option>
                  <option value="photography">Photography</option>
                  <option value="decoration">Decoration</option>
                </select>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="p-3 rounded-xl shadow w-full"
                  required
                >
                  <option value="">Select Service</option>
                  <option value="food-service">Food Service</option>
                  <option value="venue-decoration">Venue Decoration</option>
                  <option value="photo-shoot">Photo Shoot</option>
                </select>
              </>
            )}

            <div className="md:col-span-2 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="text-purple-700 underline"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-lg text-gray-700 space-y-3 px-4">
            <p>
              <strong>Role:</strong> {role}
            </p>
            <p>
              <strong>Full Name:</strong> {formData.fullName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Contact:</strong> {formData.contact}
            </p>
            {(role === "vendor" || role === "freelancer") && (
              <>
                <p>
                  <strong>Company:</strong> {formData.company}
                </p>
                <p>
                  <strong>Category:</strong> {formData.category}
                </p>
                <p>
                  <strong>Service:</strong> {formData.service}
                </p>
              </>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="text-purple-700 underline"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center text-purple-700">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl p-6 shadow-lg text-center transition-all duration-300 border-2 cursor-pointer ${
                    formData.subscription === plan.value
                      ? "border-purple-600 bg-purple-100"
                      : "border-gray-300 bg-white hover:shadow-xl"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      subscription: plan.value,
                    }))
                  }
                >
                  {plan.icon}
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-lg text-gray-600 mb-4">{plan.price}</p>
                  <ul className="text-sm text-gray-600 mb-4 space-y-1">
                    {plan.features.map((feature, i) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`px-4 py-2 mt-2 rounded-lg text-white font-semibold ${
                      formData.subscription === plan.value
                        ? "bg-purple-700"
                        : "bg-purple-500 hover:bg-purple-600"
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
                className="text-purple-700 underline"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
