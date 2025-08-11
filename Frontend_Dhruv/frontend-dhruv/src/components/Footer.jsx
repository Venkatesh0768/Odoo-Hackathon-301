// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white px-6 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div>
//           <h3 className="font-bold text-lg">QuickCourt</h3>
//           <p className="mt-2 text-sm">
//             Your trusted platform for booking sports venues. Play more, worry less.
//           </p>
//         </div>
//         <div>
//           <h4 className="font-semibold mb-2">Quick Links</h4>
//           <ul className="space-y-1 text-sm">
//             <li>About</li>
//             <li>Contact</li>
//             <li>Help</li>
//             <li>Terms</li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="font-semibold mb-2">Contact</h4>
//           <p className="text-sm">support@quickcourt.com</p>
//           <p className="text-sm">+1 (555) 123-4567</p>
//           <p className="text-sm">123 Sports Ave, City</p>
//         </div>
//       </div>
//       <div className="mt-6 text-center text-xs border-t border-gray-700 pt-4">
//         © 2024 QuickCourt. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div>
          <h3 className="font-bold text-lg">QuickCourt</h3>
          <p className="mt-2 text-sm max-w-sm">
            Your trusted platform for booking sports venues. Play more, worry less.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-500 cursor-pointer">About</li>
            <li className="hover:text-green-500 cursor-pointer">Contact</li>
            <li className="hover:text-green-500 cursor-pointer">Help</li>
            <li className="hover:text-green-500 cursor-pointer">Terms</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm">support@quickcourt.com</p>
          <p className="text-sm">+1 (555) 123-4567</p>
          <p className="text-sm">123 Sports Ave, City</p>
        </div>
      </div>
      <div className="mt-10 text-center text-xs border-t border-gray-700 pt-6 max-w-7xl mx-auto">
        © 2024 QuickCourt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
