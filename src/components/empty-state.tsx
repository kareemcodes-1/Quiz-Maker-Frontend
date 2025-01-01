

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <picture>
        <source
          srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.webp"
          type="image/webp"
        />
        <img
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.gif"
          alt="😭"
          width="32"
          height="32"
          className="w-[8rem] flex items-center justify-center"
        />
      </picture>
      <h1 className="text-[2rem]">Here is empty.</h1>
    </div>
  );
};

export default EmptyState;
