import React, { useState } from 'react';
import { useLoginMutation } from '../redux/api/authSlice';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'jobseeker' | 'company'>('jobseeker');
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password, role }).unwrap();
      // Store token in local storage or state
      localStorage.setItem('token', result.token);
      alert('Login successful!');
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value as 'jobseeker' | 'company')}>
          <option value="jobseeker">Job Seeker</option>
          <option value="company">Company</option>
        </select>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default Login;
