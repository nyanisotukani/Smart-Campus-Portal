import { useState } from 'react';
import axios from 'axios'; // Make sure you installed this with `npm install axios`
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'student',
    });

    const { firstName, lastName, email, password, role } = formData;
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://smart-campus-backend-gz8b.onrender.com/api/auth/register', formData);
            console.log(response.data);
            alert(response.data.message);
            navigate('/login')
        } catch (err) {
            alert(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>Create Your Account</h2>
                    <p>Join us by filling out the form below</p>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="name-fields">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
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
                            value={password}
                            onChange={handleChange}
                            placeholder="Create a password (min 6 characters)"
                            minLength="6"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={handleChange}
                            className="role-select"
                        >
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="register-button">
                        Create Account
                    </button>
                </form>
                <div className="register-footer">
                    <p>Already have an account? <a href="/login" className="login-link">Sign in</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;


// CSS Styles
const styles = `
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7fa;
    padding: 20px;
}

.register-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 480px;
    padding: 40px;
    transition: transform 0.3s ease;
}

.register-card:hover {
    transform: translateY(-5px);
}

.register-header {
    text-align: center;
    margin-bottom: 30px;
}

.register-header h2 {
    color: #2d3748;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
}

.register-header p {
    color: #718096;
    font-size: 14px;
}

.register-error {
    background-color: #fff5f5;
    color: #e53e3e;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 14px;
    border: 1px solid #fed7d7;
}

.register-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.name-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
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

.form-group input, .form-group select {
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s ease;
}

.form-group input:focus, .form-group select:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.role-select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
}

.register-button {
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

.register-button:hover {
    background-color: #3182ce;
}

.register-footer {
    text-align: center;
    margin-top: 24px;
    color: #718096;
    font-size: 14px;
}

.login-link {
    color: #4299e1;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
}

.login-link:hover {
    color: #3182ce;
    text-decoration: underline;
}

@media (max-width: 500px) {
    .name-fields {
        grid-template-columns: 1fr;
    }
    
    .register-card {
        padding: 30px 20px;
    }
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);