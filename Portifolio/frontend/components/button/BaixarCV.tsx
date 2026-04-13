import React from 'react'

export default function BaixarCV() {
    return (
        <a href="/cv.pdf" download className="px-8 py-4 rounded-lg text-black font-bold bg-[#00f2fe] hover:shadow-[0_0_20px_rgba(0,242,242,0.6)] transition-colors duration-300">
            Baixe meu currículo
        </a>
    )
}
