//! Ürün detay sayfası yüklenme sırasındaki iskelet

const Skeletons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-8">
      <div className="sm:w-1/2">
        <div className="bg-zinc-300 animate-pulse h-[400px]  rounded-xl" />
        <div className="flex gap-6 xs:gap-12 mt-6">
          <div className="w-20 md:w-24 h-20 md:h-24 rounded-lg bg-zinc-300 animate-pulse" />
          <div className="w-20 md:w-24 h-20 md:h-24 rounded-lg bg-zinc-300 animate-pulse" />
          <div className="w-20 md:w-24 h-20 md:h-24 rounded-lg bg-zinc-300 animate-pulse" />
        </div>
      </div>
      <div className="sm:w-1/2 flex flex-col gap-4">
        <div className="w-full h-12 bg-zinc-300 rounded-lg animate-pulse" />
        <div className="w-16 h-6 bg-zinc-300 rounded-lg animate-pulse" />
        <div className="w-32 h-6 bg-zinc-300 rounded-lg animate-pulse" />
        <div className="w-1/2 h-6 bg-zinc-300 rounded-lg animate-pulse" />
        <div className="w-full h-24 bg-zinc-300 rounded-lg animate-pulse" />
        <div className="w-1/2 h-8 bg-zinc-300 rounded-lg animate-pulse" />
        <div className="w-full flex gap-2">
          <div className="w-1/2 h-8 bg-zinc-300 rounded-lg animate-pulse" />
          <div className="w-1/2 h-8 bg-zinc-300 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Skeletons;
