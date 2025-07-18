import { useState, useEffect } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [protectedData, setProtectedData] = useState(null);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const register = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || "✅ Registered");
    setForm({ name: "", email: "", password: "" });
    fetchUsers();
  };

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      setMessage("✅ Login successful");
    } else {
      setMessage("❌ Login failed");
    }
  };

  const getProtected = async () => {
    const res = await fetch("/api/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProtectedData(data);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setMessage("❌ User deleted");
    } else {
      setMessage(data.message || "Failed to delete");
    }
  };

  const boxStyle = {
    background: "linear-gradient(135deg, rgba(30,30,60,0.9) 0%, rgba(20,20,40,0.8) 100%)",
    backdropFilter: "blur(20px)",
    border: "2px solid rgba(100,149,237,0.3)",
    padding: "35px",
    borderRadius: "25px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(100,149,237,0.1)",
    marginBottom: "35px",
    transition: "all 0.4s ease",
    position: "relative",
    overflow: "hidden",
  };

  const inputStyle = {
    padding: "16px 20px",
    borderRadius: "15px",
    border: "2px solid rgba(100,149,237,0.4)",
    width: "100%",
    fontSize: "16px",
    background: "rgba(15,15,35,0.7)",
    color: "#E6E6FA",
    transition: "all 0.3s ease",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Orbitron', 'Courier New', monospace",
    fontWeight: "400",
  };

  const buttonStyle = {
    padding: "16px 28px",
    background: "linear-gradient(135deg, #4169E1 0%, #6495ED 50%, #00BFFF 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 25px rgba(65, 105, 225, 0.4), 0 0 20px rgba(100,149,237,0.2)",
    fontFamily: "'Orbitron', 'Courier New', monospace",
    textTransform: "none",
    letterSpacing: "0px",
  };

  const deleteButtonStyle = {
    padding: "10px 18px",
    background: "linear-gradient(135deg, #DC143C 0%, #B22222 50%, #8B0000 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 20px rgba(220, 20, 60, 0.3)",
    fontFamily: "'Orbitron', 'Courier New', monospace",
    textTransform: "none",
    letterSpacing: "0px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0F0F23 0%, #1a1a3e 25%, #2d1b69 50%, #0F0F23 100%)",
        padding: "40px 20px",
        fontFamily: "'Orbitron', 'Courier New', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated stars background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #fff, transparent)
          `,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 100px",
          animation: "twinkle 3s linear infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&display=swap');
      `}</style>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1 style={{ 
          textAlign: "center", 
          color: "#E6E6FA",
          fontSize: "42px",
          fontWeight: "700",
          marginBottom: "20px",
          textShadow: "0 0 20px rgba(100,149,237,0.8), 0 0 40px rgba(100,149,237,0.4)",
          letterSpacing: "2px",
          fontFamily: "'Orbitron', 'Courier New', monospace"
        }}>
          🚀 Fullstack Auth App
        </h1>

        <p style={{
          textAlign: "center",
          color: "#B0C4DE",
          fontSize: "18px",
          marginBottom: "40px",
          fontWeight: "300",
          fontFamily: "'Orbitron', 'Courier New', monospace",
          letterSpacing: "1px",
          textShadow: "0 0 10px rgba(176,196,222,0.5)"
        }}>
          Modern authentication system with beautiful UI
        </p>

        {message && (
          <div
            style={{
              marginBottom: "35px",
              color: "#E6E6FA",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "18px",
              padding: "20px",
              background: "rgba(30,30,60,0.8)",
              borderRadius: "15px",
              backdropFilter: "blur(15px)",
              border: "2px solid rgba(100,149,237,0.4)",
              boxShadow: "0 0 30px rgba(100,149,237,0.2)",
              fontFamily: "'Orbitron', 'Courier New', monospace",
              letterSpacing: "1px",
            }}
          >
            {message}
          </div>
        )}

        <div style={boxStyle}>
          <h2 style={{ 
            color: "#E6E6FA", 
            marginBottom: "25px", 
            fontSize: "24px", 
            fontWeight: "600",
            fontFamily: "'Orbitron', 'Courier New', monospace",
            textShadow: "0 0 15px rgba(100,149,237,0.6)"
          }}>
            🔐               Create Account
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={inputStyle}
            />
            <button 
              type="submit" 
              style={buttonStyle}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 12px 35px rgba(65, 105, 225, 0.6), 0 0 30px rgba(100,149,237,0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(65, 105, 225, 0.4), 0 0 20px rgba(100,149,237,0.2)";
              }}
              onClick={register}
            >
              INITIATE REGISTRATION
            </button>
          </div>
        </div>

        <div style={boxStyle}>
          <h2 style={{ 
            color: "#E6E6FA", 
            marginBottom: "25px", 
            fontSize: "24px", 
            fontWeight: "600",
            fontFamily: "'Orbitron', 'Courier New', monospace",
            textShadow: "0 0 15px rgba(100,149,237,0.6)"
          }}>
            🔑 Sign In
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <input
              type="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
              style={inputStyle}
            />
            <button 
              type="submit" 
              style={buttonStyle}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 12px 35px rgba(65, 105, 225, 0.6), 0 0 30px rgba(100,149,237,0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(65, 105, 225, 0.4), 0 0 20px rgba(100,149,237,0.2)";
              }}
              onClick={login}
            >
              Sign In
            </button>
          </div>
        </div>

        <div style={boxStyle}>
          <h2 style={{ 
            color: "#E6E6FA", 
            marginBottom: "25px", 
            fontSize: "24px", 
            fontWeight: "600",
            fontFamily: "'Orbitron', 'Courier New', monospace",
            textShadow: "0 0 15px rgba(100,149,237,0.6)"
          }}>
            🔒 Protected Content
          </h2>
          <button 
            onClick={getProtected} 
            disabled={!token} 
            style={{
              ...buttonStyle,
              opacity: !token ? 0.4 : 1,
              cursor: !token ? "not-allowed" : "pointer"
            }}
            onMouseOver={(e) => {
              if (token) {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 12px 35px rgba(65, 105, 225, 0.6), 0 0 30px rgba(100,149,237,0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (token) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(65, 105, 225, 0.4), 0 0 20px rgba(100,149,237,0.2)";
              }
            }}
          >
            Access Protected Data
          </button>
          {protectedData && (
            <pre
              style={{
                marginTop: "25px",
                background: "rgba(15,15,35,0.9)",
                padding: "25px",
                borderRadius: "15px",
                color: "#00FF00",
                fontSize: "14px",
                overflow: "auto",
                border: "2px solid rgba(0,255,0,0.3)",
                boxShadow: "0 0 20px rgba(0,255,0,0.2)",
                fontFamily: "'Courier New', monospace",
                textShadow: "0 0 5px rgba(0,255,0,0.5)",
              }}
            >
              {JSON.stringify(protectedData, null, 2)}
            </pre>
          )}
        </div>

        <div style={boxStyle}>
          <h2 style={{ 
            color: "#E6E6FA", 
            marginBottom: "25px", 
            fontSize: "24px", 
            fontWeight: "600",
            fontFamily: "'Orbitron', 'Courier New', monospace",
            textShadow: "0 0 15px rgba(100,149,237,0.6)"
          }}>
            👥 User Management
          </h2>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {users.length === 0 ? (
              <p style={{ 
                color: "#B0C4DE", 
                textAlign: "center", 
                fontSize: "16px",
                fontFamily: "'Orbitron', 'Courier New', monospace"
              }}>
                No users found
              </p>
            ) : (
              <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
                {users.map((user) => (
                  <li
                    key={user._id}
                    style={{
                      padding: "25px",
                      borderBottom: "1px solid rgba(100,149,237,0.2)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "rgba(15,15,35,0.6)",
                      marginBottom: "15px",
                      borderRadius: "15px",
                      transition: "all 0.3s ease",
                      border: "1px solid rgba(100,149,237,0.3)",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = "rgba(30,30,60,0.8)";
                      e.target.style.boxShadow = "0 5px 20px rgba(100,149,237,0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = "rgba(15,15,35,0.6)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ color: "#E6E6FA" }}>
                      <div style={{ 
                        fontSize: "18px", 
                        fontWeight: "600", 
                        marginBottom: "8px",
                        fontFamily: "'Orbitron', 'Courier New', monospace",
                        letterSpacing: "1px"
                      }}>
                        {user.name}
                      </div>
                      <div style={{ 
                        fontSize: "14px", 
                        color: "#B0C4DE",
                        fontFamily: "'Orbitron', 'Courier New', monospace"
                      }}>
                        {user.email}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(user._id)}
                      style={deleteButtonStyle}
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 8px 25px rgba(220, 20, 60, 0.5)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 6px 20px rgba(220, 20, 60, 0.3)";
                      }}
                    >
                      TERMINATE
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}