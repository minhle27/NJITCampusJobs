import logo from '../../../assets/NJIT Campus Job-logos_transparent.svg';

interface LoginPageLayoutProps {
  children: React.ReactNode;
  type: 'login' | 'register';
}

const LoginPageLayout = ({ children, type }: LoginPageLayoutProps) => {
  return (
    <div className="font-montserat flex justify-center items-center h-screen">
      <section className="w-5/12 bg-gradient-to-b from-gray-700 h-full flex items-center">
        <img src={logo} className="" />
      </section>
      <section className="w-7/12 flex flex-col items-center">
        <div className="mb-10">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {type === 'login' ? 'Sign in to your account' : "Let's get started"}
          </h3>
        </div>
        {children}
      </section>
    </div>
  );
};

export default LoginPageLayout;
