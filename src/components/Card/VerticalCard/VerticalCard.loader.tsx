const VerticalCardLoader = () => {
  return (
    <div className="elementToFadeInAndOut transition-all duration-300 ease-in-out">
      <div className="aspect-w-3 aspect-h-4 rounded-md bg-accent-gray-darkest drop-shadow-xl"></div>

      <div className="mt-2">
        <p className="h-8 truncate rounded bg-accent-gray-darker text-xs font-semibold text-gray-500 md:text-sm"></p>
      </div>
    </div>
  );
};

export default VerticalCardLoader;
