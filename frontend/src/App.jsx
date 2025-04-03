export default function App() {
  return (
    <>
    <section class="flex flex-col items-center text-center py-20 bg-blue-500 text-white">
  <h1 class="text-5xl font-bold">Welcome to FinFlow</h1>
  <p class="mt-4 text-lg">Banking Made Simple, Secure & Swift.</p>
  <div class="mt-6 flex gap-4">
    <button class="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold">Sign Up</button>
    <button class="px-6 py-3 border-2 border-white rounded-lg font-semibold">Login</button>
  </div>
</section>

<section class="py-16 bg-gray-100 text-center">
  <h2 class="text-4xl font-bold text-blue-600">Why Choose FinFlow?</h2>
  <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div class="p-6 bg-white shadow-lg rounded-lg">
      <h3 class="text-xl font-semibold text-blue-500">Instant Transfers</h3>
      <p class="mt-2 text-gray-600">Send money anytime, anywhere securely.</p>
    </div>
    <div class="p-6 bg-white shadow-lg rounded-lg">
      <h3 class="text-xl font-semibold text-blue-500">Secure KYC</h3>
      <p class="mt-2 text-gray-600">Easily verify identity & bank hassle-free.</p>
    </div>
  </div>
</section>

    </>
  )
}