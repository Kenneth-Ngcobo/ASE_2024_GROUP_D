
export default function Loading() {
  return (
      <div className="flex justify-center items-center h-screen">
          <div
              className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"
              role="status"
          ></div>
          <span className="ml-4 text-green-500 text-lg font-medium">
              Loading...
          </span>
      </div>
  );
}
