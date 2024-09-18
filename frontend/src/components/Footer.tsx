import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; 2023 ElectionAI. All rights reserved.
          </p>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
