import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "../../Layout/Drawer";
import { getAllInvoices } from "../../../api/transaction";
import moment from "moment";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function formatDate(dateString) {
  return moment(dateString).format("dddd, MMMM Do YYYY, h:mm:ss A"); // "Saturday, April 28th 2024, 10:29:19 am"
}

export const AdminTransaction = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getInvoices = async () => {
    try {
      const res = await getAllInvoices();
      console.log("res=>", res);
      setInvoices(res);
      console.log(invoices);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching invoices: ", error.message);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      getInvoices();
    }, 300); // Adjust the time based on your needs

    return () => clearTimeout(handler);
  }, []);

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = (details) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);

    // Customer Details
    doc.text(`Customer Name: ${details.customerName}`, 14, 42);
    doc.text(`Billing Address: ${details.billingAddress}`, 14, 52);
    doc.text(`Contact Number: ${details.contactNumber}`, 14, 62);

    // Table for Items
    autoTable(doc, {
      startY: 72,
      head: [["Item Name", "Price", "Quantity", "Amount"]],
      body: details.items.map((item) => [
        item.itemName,
        item.price.toFixed(2),
        item.quantity,
        item.amount.toFixed(2),
      ]),
      theme: "striped",
    });

    // Subtotal and Total
    let finalY = doc.lastAutoTable.finalY; // Get the final Y position from the table
    doc.text(`Subtotal: LKR${details.subtotal.toFixed(2)}`, 14, finalY + 10);
    doc.text(`Total: LKR${details.total.toFixed(2)}`, 14, finalY + 20);

    // Save the PDF
    doc.save("invoice.pdf");
  };

  return (
    <ResponsiveDrawer>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer name"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-28 shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white :text-white :bg-gray-800">
            All Invoices
            {/* <p className="mt-1 text-sm font-normal text-gray-500 :text-gray-400">
        Browse a list of tickets designed to help you work and play, stay
        organized, get answers, keep in touch, grow your business, and
        more.
      </p> */}
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Billing Address
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Download PDF
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <tr className="bg-white border-b :bg-gray-800 :border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                  >
                    {invoice.customerName}
                  </th>
                  <td className="px-6 py-4">{invoice.billingAddress}</td>
                  <td className="px-6 py-4 capitalize">
                    {invoice.contactNumber}
                  </td>
                  <td className="px-6 py-4">LKR {invoice.subtotal}</td>
                  <td className="px-6 py-4">{formatDate(invoice.date)}</td>

                  <td className="px-6 py-4">
                    <a
                      onClick={() => generatePDF(invoice)}
                      className="font-medium text-primary :text-blue-500 cursor-pointer"
                    >
                      <DownloadForOfflineIcon />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <div className="w-full text-md text-gray-600 font-semibold m-10 text-center">
                You dont have any Invoices!
              </div>
            )}
          </tbody>
        </table>
      </div>
    </ResponsiveDrawer>
  );
};
