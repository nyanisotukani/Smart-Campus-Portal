import React, { useState, useEffect } from 'react';
import './UserDialogs.css';

// Add User Dialog Component
export const AddUserDialog = ({ isOpen, onClose, onSave }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!userData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = "Email format is invalid";
    }
    
    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(userData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <h2>Add New User</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "input-error" : ""}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "input-error" : ""}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={userData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          
          <div className="dialog-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit User Dialog Component
export const EditUserDialog = ({ isOpen, onClose, onSave, user }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '', // Optional for edit
    role: 'student',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});

  // Set form data when user prop changes
  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '', // Don't pre-fill password
        role: user.role || 'student',
        status: user.status || 'pending'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!userData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = "Email format is invalid";
    }
    
    // Password is optional when editing
    if (userData.password && userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Only include password if provided
      const updatedData = { ...userData };
      if (!updatedData.password) {
        delete updatedData.password;
      }
      
      onSave(updatedData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <h2>Edit User</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "input-error" : ""}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "input-error" : ""}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password (Leave blank to keep current)</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
              placeholder="Enter new password or leave blank"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={userData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          
          <div className="dialog-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Dialog Component
export const DeleteUserDialog = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content delete-dialog">
        <div className="dialog-header">
          <h2>Delete User</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <div className="dialog-body">
          <div className="warning-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <p>Are you sure you want to delete <strong>{userName}</strong>?</p>
          <p className="warning-text">This action cannot be undone.</p>
        </div>
        
        <div className="dialog-actions">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={onConfirm} className="delete-confirm-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

// Status Update Dialog Component
export const StatusUpdateDialog = ({ isOpen, onClose, onUpdate, user }) => {
  const [status, setStatus] = useState(user?.status || 'active');
  
  useEffect(() => {
    if (user) {
      setStatus(user.status);
    }
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content status-dialog">
        <div className="dialog-header">
          <h2>Update User Status</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <div className="dialog-body">
          <p>Update status for <strong>{user?.firstName} {user?.lastName}</strong></p>
          
          <div className="status-options">
            <div className="status-option">
              <input 
                type="radio" 
                id="status-active" 
                name="status" 
                value="active" 
                checked={status === 'active'} 
                onChange={() => setStatus('active')}
              />
              <label htmlFor="status-active">
                <span className="status-badge active">Active</span>
                <span className="status-desc">User has full access to the system</span>
              </label>
            </div>
            
            <div className="status-option">
              <input 
                type="radio" 
                id="status-inactive" 
                name="status" 
                value="inactive" 
                checked={status === 'inactive'} 
                onChange={() => setStatus('inactive')}
              />
              <label htmlFor="status-inactive">
                <span className="status-badge inactive">Inactive</span>
                <span className="status-desc">User cannot access the system</span>
              </label>
            </div>
            
            <div className="status-option">
              <input 
                type="radio" 
                id="status-pending" 
                name="status" 
                value="pending" 
                checked={status === 'pending'} 
                onChange={() => setStatus('pending')}
              />
              <label htmlFor="status-pending">
                <span className="status-badge pending">Pending</span>
                <span className="status-desc">User needs to complete registration</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="dialog-actions">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={() => onUpdate(status)} className="save-btn">Update Status</button>
        </div>
      </div>
    </div>
  );
};