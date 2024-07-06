import Features from "./_components/features";
import { Header } from "./_components/header";
import { Mockup } from "./_components/mockup";

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <Header />

      {/* Flexbox container for Features and Mockup */}
      <div
        className="flex mt-12 flex-col md:flex-row sm:flex-row rounded-[52px]"
        style={{
          background: '#f3eff8',
          boxShadow: 'inset -26px -26px 39px #b1aeb5, inset 26px 26px 39px #ffffff',
        }}
      >
        {/* Mockup Component */}
        <div className="flex flex-1 items-center justify-center md:justify-start md:pr-12 max-w-[400px] md:max-w-[500px]">
          <Mockup />
        </div>

        {/* Features Component */}
        <div className="flex-1">
          <Features />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
