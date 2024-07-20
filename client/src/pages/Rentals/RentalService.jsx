//rafc

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer';
import axios from 'axios';


import Image1 from '../../assets/RentalsImages/Car.png'
import Image2 from '../../assets/RentalsImages/Jeep.png'
import Image3 from '../../assets/RentalsImages/Van.png'


const ImageList = [

  {
    id: 1,
    img: Image1,
    // title: MainCar,

  },
  {
    id: 2,
    img: Image2,
    // title: MainJeep,

  },
  {
    id: 3,
    img: Image3,
    // title: MainVan,

  },
]


export const RentalService = () => {
  return (
    <>
    
      
      
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Choose the Vehicle Category</h2>
          </div>
        <div >
          <div className='flex '>
            {
              <div className="pl-8 justify-between mt-6 grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">

                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-72">
                  <img
                    src={Image1}
                    alt={Image1}
                  />
                </div>
              </div>
            }
            <div className=' mt-28 flex h-10 px-8 '>
            <a
                href="../../rentalservice/CarsMain"
                className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
              >
               Cars
              </a>
            </div>

          </div>
          <div className='flex '>
            {
              <div className="pl-8 justify-between mt-6 grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">

                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-72">
                  <img
                    src={Image2}
                    alt={Image2}
                  />
                </div>
              </div>
            }
            <div className=' mt-28 flex h-10 px-8 '>
            <a
                href="../../rentalservice/JeepsMain"
                className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
              >
               Jeeps
              </a>
            </div>

          </div>
          <div className='flex '>
            {
              <div className="pl-8 justify-between mt-6 grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">

                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-72">
                  <img
                    src={Image3}
                    alt={Image3}
                  />
                </div>
              </div>
            }
            <div className=' mt-28 flex h-10 px-8 '>
            <a
                href="../../rentalservice/VansMain"
                className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
              >
               Vans
              </a>
            </div>

          </div>
          </div>

        </div>




       
      </div>
      

</>
)
}