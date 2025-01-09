import React, { useState } from "react";

const HomePage = ({
  coupons,
  onAddCoupon,
  onEditCoupon,
  onDeleteCoupon,
  onToggleStatus,
  onSearch,
}) => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">Coupons</h1>
      {coupons.length > 0 && (
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search coupons by title"
            className="w-1/2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}
      {coupons.length === 0 ? (
        <div className="text-center border-2 border-dashed border-gray-300 p-8 rounded-lg">
          <p className="text-lg mb-4">No Coupons Found</p>
          <button
            onClick={onAddCoupon}
            className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            + Add Coupon
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded mb-4 hover:bg-blue-700"
            onClick={onAddCoupon}
          >
            + Add Coupon
          </button>
          <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-blue-500">
                <th className="p-4 border border-gray-300">#</th>
                <th className="p-4 border border-gray-300">Title</th>
                <th className="p-4 border border-gray-300">Coupon Type</th>
                <th className="p-4 border border-gray-300">Coupon Code</th>
                <th className="p-4 border border-gray-300">Discount</th>
                <th className="p-4 border border-gray-300">Period</th>
                <th className="p-4 border border-gray-300">Usage</th>
                <th className="p-4 border border-gray-300">Status</th>
                <th className="p-4 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-4 border border-gray-300 text-center">{index + 1}</td>
                  <td className="p-4 border border-gray-300">{coupon.title}</td>
                  <td className="p-4 border border-gray-300">{coupon.type}</td>
                  <td className="p-4 border border-gray-300">{coupon.code}</td>
                  <td className="p-4 border border-gray-300">{coupon.discount}</td>
                  <td className="p-4 border border-gray-300">
                    {coupon.period.start} - {coupon.period.end}
                  </td>
                  <td className="p-4 border border-gray-300">
                    {coupon.usage.current}/{coupon.usage.limit}
                  </td>
                  <td className="p-4 border border-gray-300 text-center">
                    <button
                      className={`py-1 px-2 rounded text-white ${
                        coupon.active ? "bg-green-600" : "bg-red-600"
                      }`}
                      onClick={() => onToggleStatus(index)}
                    >
                      {coupon.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-4 border border-gray-300 text-center">
                    <button
                      className="bg-blue-600 text-white py-1 px-2 rounded mr-2 hover:bg-blue-700"
                      onClick={() => onEditCoupon(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-orange-600 text-white py-1 px-2 rounded hover:bg-orange-700"
                      onClick={() => onDeleteCoupon(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const AddCouponPage = ({ couponToEdit, onSaveCoupon, onBack }) => {
  const [title, setTitle] = useState(couponToEdit?.title || "");
  const [code, setCode] = useState(couponToEdit?.code || "");
  const [discount, setDiscount] = useState(
    couponToEdit?.discount.replace("%", "") || ""
  );
  const [startDate, setStartDate] = useState(couponToEdit?.period?.start || "");
  const [endDate, setEndDate] = useState(couponToEdit?.period?.end || "");
  const [type, setType] = useState(couponToEdit?.type || "Global");
  const [usageLimit, setUsageLimit] = useState(
    couponToEdit?.usage?.limit || 0
  );

  const handleSave = () => {
    if (title && code && discount && startDate && endDate && usageLimit > 0) {
      onSaveCoupon({
        title,
        code,
        discount: `${discount}%`,
        period: { start: startDate, end: endDate },
        active: couponToEdit?.active || false,
        type,
        usage: {
          limit: usageLimit,
          current: couponToEdit?.usage?.current || 0,
        },
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
        {couponToEdit ? "Edit Coupon" : "Add Coupon"}
      </h1>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Coupon Title *</label>
        <input
          type="text"
          placeholder="Enter Title"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Coupon Code *</label>
        <input
          type="text"
          placeholder="Enter Code"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Discount (%) *</label>
        <input
          type="number"
          placeholder="Enter Discount"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Coupon Type *</label>
        <select
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Global">Global</option>
          <option value="Courses">Courses</option>
          <option value="Category">Category</option>
          <option value="Instructor">Instructor</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Number of Students Allowed *
        </label>
        <input
          type="number"
          placeholder="Enter Max Users"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={usageLimit}
          onChange={(e) => setUsageLimit(Number(e.target.value))}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Coupon Period *</label>
        <div className="flex space-x-2">
          <input
            type="date"
            className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          onClick={onBack}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          Back
        </button>
      </div>
    </div>
  );
};

const CouponDashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [couponToEdit, setCouponToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddCoupon = () => {
    setCouponToEdit(null);
    setIsAdding(true);
  };

  const handleSaveCoupon = (coupon) => {
    if (couponToEdit) {
      setCoupons((prev) =>
        prev.map((c) => (c === couponToEdit ? coupon : c))
      );
    } else {
      setCoupons([...coupons, coupon]);
    }
    setIsAdding(false);
  };

  const handleEditCoupon = (index) => {
    setCouponToEdit(coupons[index]);
    setIsAdding(true);
  };

  const handleDeleteCoupon = (index) => {
    setCoupons(coupons.filter((_, i) => i !== index));
  };

  const handleToggleStatus = (index) => {
    const updatedCoupons = [...coupons];
    updatedCoupons[index].active = !updatedCoupons[index].active;
    setCoupons(updatedCoupons);
  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return isAdding ? (
    <AddCouponPage
      couponToEdit={couponToEdit}
      onSaveCoupon={handleSaveCoupon}
      onBack={() => setIsAdding(false)}
    />
  ) : (
    <HomePage
      coupons={filteredCoupons}
      onAddCoupon={handleAddCoupon}
      onEditCoupon={handleEditCoupon}
      onDeleteCoupon={handleDeleteCoupon}
      onToggleStatus={handleToggleStatus}
      onSearch={setSearchTerm}
    />
  );
};

export default CouponDashboard;
