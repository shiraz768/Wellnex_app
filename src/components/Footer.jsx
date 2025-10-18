import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-12 bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <div className="font-semibold">Wellnex Systems</div>
          <div className="text-sm text-gray-500 mt-2">Empowering Wellness Through Technology</div>
        </div>

        <div className="text-sm text-gray-600">
          <div>📧 info@wellnexsystems.com</div>
          <div className="mt-1">🌐 www.wellnexsystems.com</div>
        </div>

        <div className="text-sm text-gray-500">© 2025 Wellnex Systems. All rights reserved.</div>
      </div>
    </footer>
  )
}
