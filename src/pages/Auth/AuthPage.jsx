import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AuthPage() {

  const navigate = useNavigate();

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

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= PASSWORD VALIDATION =================
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

  }, [
    formData.password,
    formData.confirm_password,
    isLogin,
  ]);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    // password validation
    if (
      !isLogin &&
      formData.password !== formData.confirm_password
    ) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {

      // ======================================================
      // LOGIN
      // ======================================================
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
            }),
          }
        );

        const data = await response.json();

        console.log("Login Response:", data);

        // error handling
        if (
          !response.ok ||
          data.status_code !== 200
        ) {
          throw new Error(
            data.message || "Login failed"
          );
        }

        // save token
        localStorage.setItem(
          "access_token",
          data.data.access_token
        );

        // save user details
        localStorage.setItem(
          "user",
          JSON.stringify(data.data.user)
        );

        // redirect
        navigate("/dashboard");
      }

      // ======================================================
      // SIGNUP
      // ======================================================
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

        // error handling
        if (
          !response.ok ||
          data.status_code !== 200
        ) {
          throw new Error(
            data.message || "Signup failed"
          );
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

      setError(
        err.message || "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-container">

      <div className={isLogin ? "login-card" : "signup-card"}>

        <h2>
          {isLogin ? "Login" : "Sign Up"}
        </h2>

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

          {/* PHONE */}
          <input
            type="text"
            name="phone_number"
            placeholder="Mobile Number"
            className="input"
            value={formData.phone_number}
            onChange={handleChange}
          />

          {/* PASSWORD */}
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
          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="button"
            disabled={
              loading ||
              (!isLogin && error)
            }
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
          className="toggle"
          onClick={() => {

            setIsLogin(!isLogin);

            setError("");

            setFormData({
              first_name: "",
              last_name: "",
              phone_number: "",
              password: "",
              confirm_password: "",
            });
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

      </div>

    </div>
  );
}

export default AuthPage;