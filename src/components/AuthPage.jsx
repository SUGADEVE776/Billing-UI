import { useState } from "react";
import "./AuthPage.css";
import bgImage from "../assets/login/background.png";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* <div className="overlay">
        <div className="card">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>

          <form>
            {!isLogin && (
              <input type="text" placeholder="Full Name" className="input" />
            )}

            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />

            <button type="submit" className="button">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p
            onClick={() => setIsLogin(!isLogin)}
            className="toggle"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default AuthPage;