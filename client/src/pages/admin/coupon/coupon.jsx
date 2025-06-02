import React, { useState, useEffect } from "react";
import couponService from "../api/couponService"; // Update the import path
import toast from "react-hot-toast";

const HomePage = ({
  coupons,
  onAddCoupon,
  onEditCoupon,
  onDeleteCoupon,
  onToggleStatus,
  onSearch,
}) => {

    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
        toast.dismiss(); // Dismiss all toasts on unmount/route change
      };
    }, [location]);
  
    

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-3xl font-bold text-center text-[#5491CA] mb-6">Coupons</h1>
      {coupons.length > 0 && (
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search coupons by title"
            className="w-1/2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[#5491CA]/30"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}
      {coupons.length === 0 ? (
        <div className="text-center border-2 border-dashed border-gray-300 p-8 rounded-lg">
          <p className="text-lg mb-4">No Coupons Found</p>
          <button
            onClick={onAddCoupon}
            className="bg-[#5491CA] text-white py-2 px-4 rounded hover:bg-[#4a82b6] transition-colors"
          >
            + Add Coupon
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <button
            className="bg-[#5491CA] text-white py-2 px-4 rounded mb-4 hover:bg-[#4a82b6] transition-colors"
            onClick={onAddCoupon}
          >
            + Add Coupon
          </button>
          <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-[#5491CA] text-white">
                <th className="p-3 border border-gray-300">#</th>
                <th className="p-3 border border-gray-300">Title</th>
                <th className="p-3 border border-gray-300">Coupon Type</th>
                <th className="p-3 border border-gray-300">Coupon Code</th>
                <th className="p-3 border border-gray-300">Discount</th>
                <th className="p-3 border border-gray-300">Period</th>
                <th className="p-3 border border-gray-300">Usage</th>
                <th className="p-3 border border-gray-300">Status</th>
                <th className="p-3 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300 text-center">{index + 1}</td>
                  <td className="p-3 border border-gray-300">{coupon.title}</td>
                  <td className="p-3 border border-gray-300">{coupon.type || "Standard"}</td>
                  <td className="p-3 border border-gray-300">{coupon.couponCode || coupon.code}</td>
                  <td className="p-3 border border-gray-300">{coupon.discount}%</td>
                  <td className="p-3 border border-gray-300">
                    {coupon.startDate || coupon.period?.start} - {coupon.endDate || coupon.period?.end}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {coupon.numberOfStudentAllow ? 
                      `0/${coupon.numberOfStudentAllow}` : 
                      coupon.usage ? `${coupon.usage.current}/${coupon.usage.limit}` : "0/0"}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    <button
                      className={`py-1 px-2 rounded text-white ${
                        coupon.active ? "bg-green-600" : "bg-red-500"
                      }`}
                      onClick={() => onToggleStatus(index)}
                    >
                      {coupon.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    <button
                      className="bg-[#b1a9f1] text-white py-1 px-2 rounded mr-2 hover:bg-[#9f97e8] transition-colors"
                      onClick={() => onEditCoupon(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors"
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

const AddCouponPage = ({ couponToEdit, onBack }) => {
  const [formData, setFormData] = useState({
    title: couponToEdit?.title || "",
    couponCode: couponToEdit?.couponCode || couponToEdit?.code || "",
    discount: couponToEdit?.discount || "",
    numberOfStudentAllow: couponToEdit?.numberOfStudentAllow || couponToEdit?.usage?.limit || "",
    startDate: couponToEdit?.startDate || couponToEdit?.period?.start || "",
    endDate: couponToEdit?.endDate || couponToEdit?.period?.end || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

try {
  if (couponToEdit) {
    // Update existing coupon
    await couponService.updateCoupon(couponToEdit.couponCode, formData); // Use the service
    toast.success("Coupon updated successfully!");
  } else {
    // Add a new coupon
    await couponService.createCoupon(formData); // Use the service
    toast.success("Coupon created successfully!");
  }
  onBack();
} catch (error) {
  console.error("Error saving coupon:", error);
  if (error.response && error.response.data.errors) {
    setErrors(error.response.data.errors);
  } else {
    toast.error("An unexpected error occurred.");
  }
} finally {
  setLoading(false);
}

  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center text-[#5491CA] mb-6">
        {couponToEdit ? "Edit Coupon" : "Add Coupon"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Coupon Title *</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#5491CA]/30 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Coupon Code *</label>
          <input
            type="text"
            name="couponCode"
            placeholder="Enter Code"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#5491CA]/30 ${
              errors.couponCode ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.couponCode}
            onChange={handleChange}
          />
          {errors.couponCode && (
            <p className="text-red-500 text-sm mt-1">{errors.couponCode}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Discount (%) *</label>
          <input
            type="number"
            name="discount"
            placeholder="Enter Discount"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#5491CA]/30 ${
              errors.discount ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.discount}
            onChange={handleChange}
          />
          {errors.discount && (
            <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Number of Students Allowed *
          </label>
          <input
            type="number"
            name="numberOfStudentAllow"
            placeholder="Enter Max Users"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#5491CA]/30 ${
              errors.numberOfStudentAllow ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.numberOfStudentAllow}
            onChange={handleChange}
          />
          {errors.numberOfStudentAllow && (
            <p className="text-red-500 text-sm mt-1">
              {errors.numberOfStudentAllow}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Coupon Period *</label>
          <div className="flex space-x-2">
            <input
              type="date"
              name="startDate"
              className={`w-1/2 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#5491CA]/30 ${
                errors.startDate ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.startDate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="endDate"
              className={`w-1/2 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#5491CA]/30 ${
                errors.endDate ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#5491CA] text-white py-2 px-4 rounded hover:bg-[#4a82b6] transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

const CouponDashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [couponToEdit, setCouponToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await couponService.getAllCoupons(); // Use the service
      setCoupons(response.coupons || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      setCoupons([]);
    }
  };

  const handleAddCoupon = () => {
    setCouponToEdit(null);
    setIsAdding(true);
  };

  const handleEditCoupon = (index) => {
    setCouponToEdit(coupons[index]);
    setIsAdding(true);
  };

const handleDeleteCoupon = async (index) => {
  if (!window.confirm("Are you sure you want to delete this coupon?")) return;

  const couponToDelete = coupons[index];
  try {
    await couponService.deleteCoupon(couponToDelete.couponCode);
    toast.success("Coupon deleted successfully!");
    fetchCoupons();
  } catch (error) {
    console.error("Error deleting coupon:", error);
    toast.error("Failed to delete coupon. Please try again.");
  }
};

const handleToggleStatus = async (index) => {
  const coupon = coupons[index];
  const updatedStatus = !coupon.active;

  try {
    await couponService.updateCoupon(coupon.couponCode, { ...coupon, active: updatedStatus });
    toast.success(`Coupon marked as ${updatedStatus ? "Active" : "Inactive"}!`);
    fetchCoupons();
  } catch (error) {
    console.error("Error toggling status:", error);
    toast.error("Failed to update coupon status. Please try again.");
  }
};


  return isAdding ? (
    <AddCouponPage
      couponToEdit={couponToEdit}
      onBack={() => {
        setIsAdding(false);
        fetchCoupons(); // Refresh the list
      }}
    />
  ) : (
    <HomePage
      coupons={coupons.filter((coupon) =>
        coupon.title.toLowerCase().includes(searchTerm.toLowerCase())
      )}
      onAddCoupon={handleAddCoupon}
      onEditCoupon={handleEditCoupon}
      onDeleteCoupon={handleDeleteCoupon}
      onToggleStatus={handleToggleStatus}
      onSearch={setSearchTerm}
    />
  );
};

export default CouponDashboard;