function PageNotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div>
        <div className="flex justify-center gap-10">
          <h1 className="py-3 text-6xl font-bold text-blue-600">404</h1>
          <div className="border-r-2 border-gray-200" />
          <div>
            <p className="py-3 text-6xl font-bold text-blue-600">
              Page Not Found
            </p>
            <p className="py-3">
              Please check the URL in the address bar and try again
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-10">{/* <div></div> */}</div>
      </div>
    </div>
  );
}

export default PageNotFound;
