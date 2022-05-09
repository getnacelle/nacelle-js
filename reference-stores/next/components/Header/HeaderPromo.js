const HeaderPromo = ({ content }) => {
  return (
    content && (
      <div className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
        {content.text}
      </div>
    )
  );
};

export default HeaderPromo;
