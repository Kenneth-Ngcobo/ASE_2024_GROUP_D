

export default function EditDetails() {
  return (
    <div class="flex h-screen">
      <div class="w-1/4 p-6 bg-blue-100 text-white">
        <h1 class="text-2xl font-bold mb-6">KWAMAIMAI</h1>
        <button class="bg-teal-600 text-white px-4 py-2 rounded-md">
          Back to Website
        </button>
        <p class="mt-4">ACCOUNT: signed in as</p>
      </div>

      <div class="w-3/4 p-6">
        <h2 class="text-3xl font-bold">Welcome Back!</h2>
        <div class="mt-6">
          <h3 class="text-xl">About You:</h3>
          <input
            type="text"
            placeholder="First Name"
            value=""
            className="w-full border rounded-md p-3 text-gray-700 mb-4"
          ></input>
          <input
            type="text"
            placeholder="Last Name"
            value=""
            className="w-full border rounded-md p-3 text-gray-700 mb-4"
          ></input>
            <input
            type="text"
            placeholder="Email"
            value=""
            className="w-full border rounded-md p-3 text-gray-700 mb-4"
          ></input>
        </div>
      </div>
    </div>
  );
}
