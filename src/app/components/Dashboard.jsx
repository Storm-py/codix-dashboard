import Image from 'next/image'
import { ShoppingBag, DollarSign } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-6 flex-1 flex items-center">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-700">Congratulations Muneeb</h2>
          <p className="text-4xl font-bold mt-2 text-black">$39,358 <span className="text-green-500 text-lg font-normal">+9%</span></p>
          <button className="mt-4 px-5 py-2 bg-[#E67E5F] text-white rounded-lg hover:bg-coral-500 transition-colors hover:opacity-50">
            Download
          </button>
        </div>
        <div className="hidden md:block">
          <Image src="https://flexy-react-main.netlify.app/assets/welcome-bg2-2x-svg-14e3163f.svg" alt="3D illustration" width={150} height={150} />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Purchases</h2>
          <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center">
            <ShoppingBag className="text-white hover:opacity-50 cursor-pointer" size={24} />
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-500">2,367</p>
        <p className=" mt-1 text-gray-300">Monthly Sales</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Total Earnings</h2>
          <div className="w-10 h-10 bg-coral-400 rounded-full flex items-center justify-center">
            <DollarSign className="text-white bg-[#E67E5F] rounded-full hover:opacity-50 cursor-pointer" size={34} />
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-500">$93,438.78</p>
        <p className="text-gray-300 mt-1">Monthly Revenue</p>
      </div>
    </div>
  )
}