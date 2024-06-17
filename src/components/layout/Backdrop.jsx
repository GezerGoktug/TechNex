export const Backdrop = ({ children }) => {
  return (
    <div className="backdrop fixed top-0 left-0 h-screen w-full bg-black/50 z-30">
      {children}
    </div>
  );
};
