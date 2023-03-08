const EmptyList = () => {
  return (
    <div className="text-xl flex justify-center font-bold mt-8 text-center py-2 px-1 sm:border rounded-lg sm:w-4/5  sm:py-8 sm:justify-center">
      <div>
        <p className="pb-3">Your list is empty...</p>

        <p>Start adding your tasks!</p>
      </div>
    </div>
  );
};

export default EmptyList;
