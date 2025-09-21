import { useState } from 'react';
import { login as authLogin, signup as authSignup } from '../utils/auth';
import { useAuth } from '../contexts/AuthContext';

const AuthForm = ({ onClose, translations }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const data = await authLogin(username, password);
        login(data);
      } else {
        if (password !== confirmPassword) {
          setError(translations.passwordsDontMatch);
          setLoading(false);
          return;
        }
        const data = await authSignup(username, email, password);
        login(data);
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || (isLogin ? translations.loginFailed : translations.signupFailed));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-form">
        <h2>{isLogin ? translations.login : translations.signup}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={translations.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="email"
              placeholder={translations.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder={translations.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder={translations.confirmPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit" disabled={loading}>
            {loading 
              ? (isLogin ? translations.loggingIn : translations.signingUp)
              : (isLogin ? translations.login : translations.signup)
            }
          </button>
          <button type="button" onClick={onClose}>
            {translations.cancel}
          </button>
        </form>
        <div className="auth-toggle">
          <p>
            {isLogin ? translations.noAccount : translations.haveAccount}{' '}
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? translations.signup : translations.login}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;