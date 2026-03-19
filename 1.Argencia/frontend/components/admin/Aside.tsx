"use client"
import { useState } from 'react';

export function Aside() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <aside className={`flex w-full h-screen top-0 transition-all duration-700 ease-in-out ${isOpen ? ' max-w-96' : 'max-w-30'} `}>

            <ul className={`flex flex-col gap-6 w-full bg-blue-500 text-center pb-10 overflow-hidden transition-all duration-700 ease-in-out `}>
                <div className='bg-gray-500 py-8.5'>
                    {isOpen ? 
                    <h1 className='font-bold text-white text-4xl'>RM.Code</h1>:
                    <h1 className='font-bold text-white text-4xl'>RM</h1>
                    }
                    
                </div>
                <h2>Menu</h2>
                <li className='px-8'><a href="" className='flex items-center gap-2 bg-amber-300 rounded-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 640"><path fill="#31475e" d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" /></svg>
                    <p className={`${isOpen?"block opacity-100":"hidden opacity-0"}`}>Home</p></a></li>
                <li className='px-8'><a href="" className='flex items-center gap-2 bg-amber-300 rounded-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 640"><path fill="#31475e" d="M416 208C416 305.2 330 384 224 384C197.3 384 171.9 379 148.8 370L67.2 413.2C57.9 418.1 46.5 416.4 39 409C31.5 401.6 29.8 390.1 34.8 380.8L70.4 313.6C46.3 284.2 32 247.6 32 208C32 110.8 118 32 224 32C330 32 416 110.8 416 208zM416 576C321.9 576 243.6 513.9 227.2 432C347.2 430.5 451.5 345.1 463 229.3C546.3 248.5 608 317.6 608 400C608 439.6 593.7 476.2 569.6 505.6L605.2 572.8C610.1 582.1 608.4 593.5 601 601C593.6 608.5 582.1 610.2 572.8 605.2L491.2 562C468.1 571 442.7 576 416 576z" /></svg>
                    <p className={`${isOpen?"block":"hidden "}`}>Depoimento</p></a></li>
                <li className='px-8'><a href="" className='flex items-center gap-2 bg-amber-300 rounded-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 640"><path fill="#31475e" d="M64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L360 512C354.8 512 349.8 513.7 345.6 516.8L230.4 603.2C226.2 606.3 221.2 608 216 608C202.7 608 192 597.3 192 584L192 512L160 512C107 512 64 469 64 416z" /></svg>
                    <p className={`${isOpen?"block":"hidden"}`}>Mensagem</p></a></li>
            </ul>

            <div className="my-10">
                <button onClick={() => setIsOpen(!isOpen)} className={`hover:text-blue-600 focus:outline-none text-black`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

        </aside>
    )
}
