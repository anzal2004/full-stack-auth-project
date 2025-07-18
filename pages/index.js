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

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>🚀 Fullstack Auth System</h1>
        <p style={styles.subtitle}>Secure your data with futuristic auth</p>

        {message && <div style={styles.message}>{message}</div>}

        <div style={styles.grid}>
          <div style={styles.box}>
            <h2 style={styles.boxTitle}>🔐 Register</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={styles.input}
            />
            <button onClick={register} style={styles.button}>
              Register
            </button>
          </div>

          <div style={styles.box}>
            <h2 style={styles.boxTitle}> Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              style={styles.input}
            />
            <button onClick={login} style={styles.button}>
              Login
            </button>
          </div>
        </div>

        

        <div style={styles.box}>
          <h2 style={styles.boxTitle}>👥 Users</h2>
          {users.length === 0 ? (
            <p style={styles.noUsers}>No users found</p>
          ) : (
            <ul style={styles.userList}>
              {users.map((user) => (
                <li key={user._id} style={styles.userItem}>
                  <div>
                    <div style={styles.userName}>{user.name}</div>
                    <div style={styles.userEmail}>{user.email}</div>
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0F0F23, #2d1b69)",
    padding: "40px 20px",
    fontFamily: "'Orbitron', sans-serif",
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    color: "#E6E6FA",
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  subtitle: {
    textAlign: "center",
    color: "#B0C4DE",
    fontSize: "18px",
    marginBottom: "30px",
  },
  message: {
    background: "#1e1e3c",
    color: "#E6E6FA",
    textAlign: "center",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "30px",
  },
  box: {
    background: "rgba(30,30,60,0.8)",
    padding: "20px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  boxTitle: {
    color: "#E6E6FA",
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    background: "rgba(15,15,35,0.7)",
    color: "#E6E6FA",
  },
  button: {
    padding: "12px",
    background: "linear-gradient(135deg, #4169E1, #00BFFF)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
  },
  protected: {
    marginTop: "10px",
    background: "#111",
    color: "#0f0",
    padding: "10px",
    borderRadius: "10px",
  },
  noUsers: {
    color: "#B0C4DE",
    textAlign: "center",
  },
  userList: {
    listStyle: "none",
    padding: 0,
  },
  userItem: {
    background: "rgba(15,15,35,0.6)",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    color: "#E6E6FA",
    fontSize: "18px",
    fontWeight: "600",
  },
  userEmail: {
    color: "#B0C4DE",
    fontSize: "14px",
  },
  deleteButton: {
    background: "#DC143C",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
