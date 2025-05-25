import LoginPageLayout from '../LoginPageLayout';
import { RegisterForm } from './RegisterForm';

const Register = () => {
  return (
    <LoginPageLayout type="register">
      <RegisterForm />
    </LoginPageLayout>
  );
};

export default Register;
