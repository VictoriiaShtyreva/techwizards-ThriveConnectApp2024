import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [role, setRole] = useState<'jobseeker' | 'company'>('jobseeker');
   const [register, { isLoading, error }] = useLoginMutation();

   
   const navigate = useNavigate()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      if(!email || !password || !role) {
        alert('123')
      }
    
      if(existedEmail) {
        alert('A user with this email already exists')
      }
    
      try {
    
        const newUser: User = { email, password, role };
        ///
        await dispatch(userRegistration(newUser));
        alert('Your account has been created successfully')
        navigate('/');
      } catch (error) {
        alert('Something went wrong')
        return
      }
    };

  return (
    <div>
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
      {error && <p>Error: {error.message}</p>}//-
    </form>
      
    </div>
  )
}
