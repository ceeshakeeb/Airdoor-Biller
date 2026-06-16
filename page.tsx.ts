"use client";

import React, { useState } from "react";

export default function InvoiceMaker() {
  const [docType, setDocType] = useState("PROFORMA");
  const [invoiceDate, setInvoiceDate] = useState("2026-06-11");
  const [billTo, setBillTo] = useState("Vert Air Systems\nErnakulam");
  const [shipTo, setShipTo] = useState("OEN\nErnakulam");

  const [items, setItems] = useState([
    {
      id: 1,
      description: "Labour charges for Erection and copper piping of VRF unit",
      qty: 24,
      unit: "HP",
      unitPrice: 2600,
    },
    {
      id: 2,
      description: "Labour charges for Installation and piping and pressure testing of ductable split",
      qty: 17,
      unit: "TR",
      unitPrice: 1000,
    },
  ]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateAmount = (qty, price) => qty * price;
  const subtotal = items.reduce((acc, item) => acc + calculateAmount(item.qty, item.unitPrice), 0);
  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const total = subtotal + cgst + sgst;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-10 shadow-lg border border-gray-200">
        
        {/* Header Section */}
        <div className="flex justify-between border-b pb-6 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-2 uppercase tracking-wide">Airdoor</h1>
            <p className="text-sm">First Floor Building No 11/540 Gandhi Nagar Road</p>
            <p className="text-sm">Pallilamkara, North Kalamassery. Kalamassery PO. 683503</p>
            <p className="text-sm">Ernakulam, Kerala</p>
            <p className="text-sm font-medium mt-1">8592888839, 8592888840</p>
            <p className="text-sm">Airdoor@outlook.com</p>
          </div>
          <div className="text-right flex flex-col items-end">
            <select 
              className="text-2xl font-bold text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none mb-4 text-right"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              <option value="PROFORMA">PROFORMA</option>
              <option value="TAX INVOICE">TAX INVOICE</option>
              <option value="QUOTATION">QUOTATION</option>
              <option value="PURCHASE ORDER">PURCHASE ORDER</option>
            </select>
            <div className="flex gap-2 text-sm">
              <span className="font-semibold">Date:</span>
              <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="border p-1" />
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="flex justify-between mb-8">
          <div className="w-5/12">
            <h3 className="font-bold border-b bg-gray-100 p-1 mb-2">BILL TO</h3>
            <textarea 
              className="w-full h-24 p-2 border border-gray-200 focus:outline-none resize-none" 
              value={billTo} 
              onChange={(e) => setBillTo(e.target.value)} 
            />
          </div>
          <div className="w-5/12">
            <h3 className="font-bold border-b bg-gray-100 p-1 mb-2">SHIP TO</h3>
            <textarea 
              className="w-full h-24 p-2 border border-gray-200 focus:outline-none resize-none" 
              value={shipTo} 
              onChange={(e) => setShipTo(e.target.value)} 
            />
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8 border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white text-left text-sm">
              <th className="p-2 border">#</th>
              <th className="p-2 border w-1/2">Description</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Unit Price</th>
              <th className="p-2 border text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b text-sm">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">
                  <textarea 
                    className="w-full bg-transparent focus:outline-none resize-none" 
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                  />
                </td>
                <td className="p-2 border">
                  <input type="number" className="w-16 bg-transparent focus:outline-none" value={item.qty} onChange={(e) => handleItemChange(index, "qty", Number(e.target.value))} />
                </td>
                <td className="p-2 border">
                  <input type="text" className="w-12 bg-transparent focus:outline-none" value={item.unit} onChange={(e) => handleItemChange(index, "unit", e.target.value)} />
                </td>
                <td className="p-2 border">
                  ₹<input type="number" className="w-20 bg-transparent focus:outline-none ml-1" value={item.unitPrice} onChange={(e) => handleItemChange(index, "unitPrice", Number(e.target.value))} />
                </td>
                <td className="p-2 border text-right font-medium">₹{calculateAmount(item.qty, item.unitPrice).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="flex justify-end mb-8">
          <div className="w-1/3">
            <div className="flex justify-between py-1 border-b">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span>CGST @ 9%</span>
              <span>₹{cgst.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span>SGST @ 9%</span>
              <span>₹{sgst.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg border-b-2 border-gray-800 mt-2">
              <span>TOTAL</span>
              <span>₹{total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>

        {/* Footer & Payment Info */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-sm">
            <h4 className="font-bold text-blue-900 border-b pb-1 mb-2">PAYMENT INFORMATION</h4>
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <span className="font-semibold">Bank Name:</span> <span>IDBI BANK MALAPPURAM</span>
              <span className="font-semibold">A/C Name:</span> <span>Airdoor Airconditioning Solutions</span>
              <span className="font-semibold">A/C No.:</span> <span>0209102000008235</span>
              <span className="font-semibold">IFSC Code:</span> <span>IBKL0000209</span>
              <span className="font-semibold">Branch:</span> <span>DOWN HILL MALAPPURAM</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="italic text-gray-600 mb-8">Thank you for your business!</p>
            <p className="font-bold border-t-2 border-gray-300 pt-2 px-8 inline-block">Airdoor Mep Solutions<br/><span className="text-sm font-normal">Authorised Signatory</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}