import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('/home page1.jpg')` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Recipe App</h1>
          <p className="text-lg mb-6">Discover delicious recipes and enjoy cooking!</p>
          <button 
            className="bg-yellow-500 text-black py-2 px-4 rounded-full hover:bg-yellow-600 transition"
            onClick={() => window.location.href='/recipes'}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
