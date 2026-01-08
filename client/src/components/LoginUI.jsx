export default function LoginUI({ auth }) {
  const { updateField, submitLogin, setMode } = auth;

  return (
    <div className="text-center text-white">
      <h1 className="text-2xl font-semibold">Log in</h1>

      <p className="text-sm text-white/70 mt-1">
        Don’t have an account?{" "}
        <button onClick={() => setMode("signup")} className="underline">
          Create one
        </button>
      </p>

      {/* Role Selector */}
      <div className="mt-6 flex justify-center">
        <div className="flex bg-white/20 backdrop-blur-md rounded-full p-1">
          {["user", "church", "admin"].map((role) => (
            <button
              key={role}
              onClick={() => updateField("role", role)}
              className="px-4 py-1.5 text-sm rounded-full transition
                         hover:bg-white/20
                         focus:outline-none"
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="w-full mt-8 px-4 py-3 rounded-md
                   bg-white/80 text-black outline-none
                   focus:ring-2 focus:ring-black/40"
        onChange={(e) => updateField("email", e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full mt-4 px-4 py-3 rounded-md
                   bg-white/80 text-black outline-none
                   focus:ring-2 focus:ring-black/40"
        onChange={(e) => updateField("password", e.target.value)}
      />

      {/* CTA */}
      <button
        onClick={submitLogin}
        className="w-full mt-6 py-3 rounded-full
                   bg-black text-white
                   hover:opacity-90 transition"
      >
        Log in
      </button>
    </div>
  );
}
