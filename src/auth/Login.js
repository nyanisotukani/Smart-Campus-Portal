import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                const role = data.role?.toLowerCase();
                if (role === 'admin') navigate('/admin', { state: data });
                else if (role === 'lecturer') navigate('/lecturer', { state: data });
                else if (role === 'student') navigate('/student', { state: data });
                else alert("Unknown role");
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }   
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Please enter your credentials to login</p>
                </div>
                
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;


// CSS Styles
const styles = `
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7fa;
    padding: 20px;
}

.login-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 420px;
    padding: 40px;
    transition: transform 0.3s ease;
}

.login-card:hover {
    transform: translateY(-5px);
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.login-header h2 {
    color: #2d3748;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
}

.login-header p {
    color: #718096;
    font-size: 14px;
}

.login-error {
    background-color: #fff5f5;
    color: #e53e3e;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 14px;
    border: 1px solid #fed7d7;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    color: #4a5568;
    font-size: 14px;
    font-weight: 600;
}

.form-group input {
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.login-button {
    background-color: #4299e1;
    color: white;
    border: none;
    padding: 14px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: 10px;
}

.login-button:hover {
    background-color: #3182ce;
}

.login-footer {
    text-align: center;
    margin-top: 24px;
    color: #718096;
    font-size: 14px;
}

.register-link {
    color: #4299e1;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
}

.register-link:hover {
    color: #3182ce;
    text-decoration: underline;
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);