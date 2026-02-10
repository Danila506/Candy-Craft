export function Footer() {
  return (
    <footer className="border-t mt-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Бренд */}
        <div>
          <h3 className="text-lg font-semibold">CandyCraft</h3>
          <p className="text-sm text-gray-500 mt-2">
            Sweet gifts and chocolate cake sets made with care.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h4 className="font-medium mb-3">Information</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="/privacy" className="hover:text-black">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/contacts" className="hover:text-black">
                Contacts
              </a>
            </li>
            <li>
              <a href="/delivery" className="hover:text-black">
                Delivery & Payment
              </a>
            </li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="font-medium mb-3">Contact</h4>
          <p className="text-sm text-gray-600">Email: your@email.com</p>
          <p className="text-sm text-gray-600">Phone: +972 XX XXX XXXX</p>
        </div>
      </div>

      <div className="border-t text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} CandyCraft. All rights reserved.
      </div>
    </footer>
  );
}
