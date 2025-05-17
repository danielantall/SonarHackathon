import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-green-50 py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-teal-500"></div>
            <span className="text-xl font-semibold text-green-800">SolaceAI</span>
          </Link>

          <div className="flex space-x-6">
            <Link href="#" className="text-green-700 hover:text-green-500 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-green-700 hover:text-green-500 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-green-700 hover:text-green-500 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="border-t border-green-200 mt-6 pt-6 text-center md:text-left">
          <p className="text-green-700 text-sm">
            &copy; {new Date().getFullYear()} SolaceAI. Built for the Wellness Hackathon.
          </p>
        </div>
      </div>
    </footer>
  )
}
