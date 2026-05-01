import { useState, useEffect } from "react";
import "./AuthPage.css";
import bgImage from "../assets/login/background.png";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Single handler for all inputs
  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Password validation
  useEffect(() => {
    if (!isLogin) {
      if (
        formData.confirm_password &&
        formData.password !== formData.confirm_password
      ) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  }, [formData.password, formData.confirm_password, isLogin]);

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (!isLogin) {
        // 🔥 SIGNUP API
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/signup/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name: formData.first_name,
              last_name: formData.last_name,
              phone_number: formData.phone_number,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Signup failed");
        }

        alert("Signup successful! Please login.");

        setFormData({
          first_name: "",
          last_name: "",
          phone_number: "",
          password: "",
          confirm_password: "",
        });

        setIsLogin(true);
      } else {
        // 🔥 LOGIN (replace with your API later)
        console.log("Login data:", {
          phone_number: formData.phone_number,
          password: formData.password,
        });

        alert("Login API not connected yet");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay">
        <div className="card">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>

          <form onSubmit={handleSubmit}>
            {/* SIGNUP FIELDS */}
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="input"
                  value={formData.first_name}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="input"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </>
            )}

            {/* COMMON FIELDS */}
            <input
              type="text"
              name="phone_number"
              placeholder="Mobile Number"
              className="input"
              value={formData.mobile}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              value={formData.password}
              onChange={handleChange}
            />

            {/* CONFIRM PASSWORD */}
            {!isLogin && (
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                className="input"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            )}

            {/* ERROR */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* BUTTON */}
            <button
              type="submit"
              className="button"
              disabled={loading || (!isLogin && error)}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Sign Up"}
            </button>
          </form>

          {/* TOGGLE */}
          <p
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="toggle"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;