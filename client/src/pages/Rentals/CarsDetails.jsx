import React from 'react'
import Navbar from '../../components/Navbar'

import Image10 from '../../assets/RentalsImages/Cars/premio.png'

const ImageList1 = [
    {
        id: 10,
        href: "../../pages/Rentals/CarsDetails",
        title: "Vehicle Model - Premio",
        color: "Color - White",
        price: "Distance Price - 100km/Rs:3500/=",
        passengers: "Four (04)"
    },
]


export const CarsDetails = () => {
    return (
        <>
            <Navbar />

            <div className='container px-4 mx-auto max-w-3xl py-32'>
                <div className='flex justify-between'>
                    <div className=' mt-10 h-10  flex justify-start'>
                        <a
                            href="#"
                            className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                        >
                            Delete Vehicle
                        </a>
                    </div>
                    <div>
                        <div className=' mt-10 h-10  flex justify-start'>
                            <a
                                href="#"
                                className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                            >
                                Update the Vehicle Details
                            </a>
                        </div>

                    </div>
                </div>
                <div className=' mt-8 flex justify-between'>
                    <div className="mt-5 px-4 sm:px-0">
                        <div className="text-base font-semibold leading-7 text-gray-900">Premio KW-1256</div>
                        <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Details of the vehicle</div>
                    </div>
                    <div>
                        {ImageList1.map((Car1) => (
                            <div key={Car1.id} className=" group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-64">
                                    <img
                                        src={Image10}

                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Vehicle Location</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Moratuwa</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">No of Tyres</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Four (04)</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">No of Doors</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Four (04)</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Child Seat</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Available</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">The Rental Price for the distance</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Rs.4500 for 100km</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Rental Terms and Conditions</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                After exceeding every additional 1km will be charged of the amount Rs.250/=
                                <br></br>
                                The conditions must be maintained as it is until the vehicle is returned.
                                <br></br>
                                If any damage caused a fine will be charged accordingly.
                            </dd>
                        </div>

                        {/* Documents download */}

                        {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
                    </dl>
                </div>
            </div>

        </>
    )
}
