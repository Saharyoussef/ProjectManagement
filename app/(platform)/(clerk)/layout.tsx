const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  };
  
  export default ClerkLayout;
  