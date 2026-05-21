import { useState, useEffect } from "react";
import "./AuthPage.css";

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
  
    // password validation
    if (!isLogin && formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      // ================= LOGIN =================
      if (isLogin) {
        const response = await fetch(
          "http://localhost:8000/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone_number: formData.phone_number,
              password: formData.password,
            }),access_token
          }
        );
  
        const data = await response.json();
  
        console.log("Login Response:", data);
  
        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }
  
        // save token
        localStorage.setItem(
          "access_token",
          data.data.access_token
        );
  
        // save user
        localStorage.setItem(
          "user",
          JSON.stringify(data.data.user)
        );

  
        // redirect
        window.location.href = "/dashboard";
      }
  
      // ================= SIGNUP =================
      else {
        const response = await fetch(
          "http://localhost:8000/api/v1/auth/register",
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
  
        console.log("Signup Response:", data);
  
        if (!response.ok) {
          throw new Error(data.message || "Signup failed");
        }
  
        alert("Signup successful! Please login.");
  
        // clear form
        setFormData({
          first_name: "",
          last_name: "",
          phone_number: "",
          password: "",
          confirm_password: "",
        });
  
        // switch to login
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className="auth-container">
        <div className={isLogin ? "login-card" : "signup-card"}>
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>

          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="input"
                  value={formData.first_name}
                  onChange={handleChange} />

                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="input"
                  value={formData.last_name}
                  onChange={handleChange} />
              </>
            )}

            {/* COMMON FIELDS */}
            <input
              type="text"
              name="phone_number"
              placeholder="Mobile Number"
              className="input"
              value={formData.phone_number}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              value={formData.password}
              onChange={handleChange} />

            {/* CONFIRM PASSWORD */}
            {!isLogin && (
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                className="input"
                value={formData.confirm_password}
                onChange={handleChange} />
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
      </div></>
  );
}

export default AuthPage;