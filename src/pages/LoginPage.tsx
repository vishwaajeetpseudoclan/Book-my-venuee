import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import * as z from "zod/v3";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .nonempty("Email is required")
    .max(100, "Email must be at most 100 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must be at most 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() { 
  const { mutateAsync, isPending } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (formData: LoginFormData) => {
  const { email, password } = formData;
  try {
    const response = await mutateAsync({ email, password });

    const role = response.user?.role?.name;

    if (!role) {
      throw new Error("User role not found.");
    }

    // Normalize role (optional: map roles to route-safe formats if needed)
    const rolePath = role.toLowerCase();

    // Redirect to respective dashboard
    navigate(`/dashboard/${rolePath}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(`Login failed: ${error.message}`);
    } else {
      alert("Login failed due to an unknown error.");
    }
  }
};

  console.log("Form Errors:", errors);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-pink-50 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animate-softGradient bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 blur-2xl opacity-60"></div>

      {/* Floating Pastel Circles */}
      <div className="absolute w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float1 top-10 left-10" />
      <div className="absolute w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float2 bottom-10 right-10" />
      <div className="absolute w-56 h-56 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float1 bottom-20 left-1/2 transform -translate-x-1/2" />

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Login to BookMyVenue
        </h2>

        <label className="block text-sm font-medium mb-1 text-gray-700">
          Email
        </label>
        <input
          placeholder="Email"
          autoComplete="email"
          {...register("email")}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        {errors.email && (
          <span className="text-red-500 text-sm mb-2">
            {typeof errors.email?.message === "string"
              ? errors.email.message
              : "Invalid email"}
          </span>
        )}
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register("password")}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        {errors.password && (
          <span className="text-red-500 text-sm mb-2">
            {typeof errors.password?.message === "string"
              ? errors.password.message
              : "Password is required"}
          </span>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-lg font-semibold transition duration-300"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center justify-center my-6">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-sm text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="space-y-3">
          <SocialButton icon="/Images/google.png" text="Continue with Google" />
        </div>
      </form>

      {/* Animations */}
      <style>{`
        .animate-softGradient {
          background-size: 300% 300%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float1 {
          animation: float1 10s ease-in-out infinite;
        }

        .animate-float2 {
          animation: float2 14s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(25px) translateX(15px);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(-10px);
          }
        }
      `}</style>
    </div>
  );
}

function SocialButton({ icon, text }: { icon: string; text: string }) {
  return (
    <button
      type="button"
      className="w-full border border-gray-300 bg-white p-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition"
    >
      <img src={icon} alt={text} className="w-5 h-5" />
      <span className="text-gray-700">{text}</span>
    </button>
  );
}
