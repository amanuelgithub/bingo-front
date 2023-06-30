function FailedToConnect() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div>
        <div className="flex justify-center gap-10">
          <h1 className="py-3 text-6xl font-bold text-red-600">Error</h1>
          <div className="border-r-2 border-gray-200" />
          <div>
            <p className="py-3 text-6xl font-bold  text-red-600">
              Failed To Connect
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-10">{/* <div></div> */}</div>
      </div>
    </div>
  );
}

export default FailedToConnect;
