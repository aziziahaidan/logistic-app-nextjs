'use client';
import DashboardCharts from '../../components/DashboardCharts';

export default function Dashboard() {

    return (
        <div className='my-2 mx-5'>
            <div className='greetings-container mb-5'>
                <p className='text-3xl'>👋🏻 Hello Timmy !</p>
                <p className='text-sm'>Here is the summary of your company</p>
            </div>
            <div className="flex flex-row justify-between bg-base-300 p-4 rounded-lg mb-5">
                <div className="w-1/4 p-4">
                    <h2 className="text-lg text-gray-400">Total Shipments</h2>
                    <p className="text-xl text-white font-bold">120 shipments</p>
                    <p className="text-green-400 mt-2">
                        <span className="text-sm">↑ 15%</span> <br />
                        <span className="text-gray-400 text-sm">compared to last month</span>
                    </p>
                </div>
                <div className="w-1/4 p-4 border-l border-gray-600">
                    <h2 className="text-lg text-gray-400">Pending Shipments</h2>
                    <p className="text-xl text-white font-bold">15 shipments pending</p>
                    <p className="text-white mt-2">
                        <span className="text-sm">0%</span> <br />
                        <span className="text-gray-400 text-sm">compared to last month</span>
                    </p>
                </div>
                <div className="w-1/4 p-4 border-l border-gray-600">
                    <h2 className="text-lg text-gray-400">Payment Billed</h2>
                    <p className="text-xl text-white font-bold">$200,500.00</p>
                    <p className="text-green-400 mt-2">
                        <span className="text-sm">↑ 10%</span> <br />
                        <span className="text-gray-400 text-sm">compared to last month</span>
                    </p>
                </div>
                <div className="w-1/4 p-4 border-l border-gray-600">
                    <h2 className="text-lg text-gray-400">Payment Received</h2>
                    <p className="text-xl text-white font-bold">$180,250.00</p>
                    <p className="text-red-400 mt-2">
                        <span className="text-sm">↓ 5%</span> <br />
                        <span className="text-gray-400 text-sm">compared to last month</span>
                    </p>
                </div>
            </div>
            <div className='flex flex-row'>
                <DashboardCharts />
            </div>
        </div>
    )
}