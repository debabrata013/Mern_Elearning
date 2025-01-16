import React, { useState ,useEffect} from "react";
import couponService from "../api/couponService";
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

const AddCouponPage = ({ couponToEdit, onBack }) => {
  const [formData, setFormData] = useState({
    title: couponToEdit?.title || "",
    couponCode: couponToEdit?.couponCode || "",
    discount: couponToEdit?.discount || "",
    numberOfStudentAllow: couponToEdit?.numberOfStudentAllow || "",
    startDate: couponToEdit?.startDate || "",
    endDate: couponToEdit?.endDate || "",
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
      let response;
      if (couponToEdit) {
        // Update existing coupon
       response = await api.updateCoupon(couponToEdit.id, formData);

      } else {
        // Add a new coupon
        // await axios.post("/api/coupons", formData);
        response=  await couponService.createcoupon(formData)
      }
      alert("Coupon saved successfully!",response);
      onBack();
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
        {couponToEdit ? "Edit Coupon" : "Add Coupon"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Coupon Title *</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            className={`w-full p-2 border rounded-lg focus:outline-none ${
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
          <label className="block mb-2 font-semibold">Coupon Code *</label>
          <input
            type="text"
            name="couponCode"
            placeholder="Enter Code"
            className={`w-full p-2 border rounded-lg focus:outline-none ${
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
          <label className="block mb-2 font-semibold">Discount (%) *</label>
          <input
            type="number"
            name="discount"
            placeholder="Enter Discount"
            className={`w-full p-2 border rounded-lg focus:outline-none ${
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
          <label className="block mb-2 font-semibold">
            Number of Students Allowed *
          </label>
          <input
            type="number"
            name="numberOfStudentAllow"
            placeholder="Enter Max Users"
            className={`w-full p-2 border rounded-lg focus:outline-none ${
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
          <label className="block mb-2 font-semibold">Coupon Period *</label>
          <div className="flex space-x-2">
            <input
              type="date"
              name="startDate"
              className={`w-1/2 p-2 border rounded-lg focus:outline-none ${
                errors.startDate ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.startDate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="endDate"
              className={`w-1/2 p-2 border rounded-lg focus:outline-none ${
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
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};
const CouponDashboard = () => {
  const [coupons, setCoupons] = useState([]); // Initialize as an empty array
  const [isAdding, setIsAdding] = useState(false);
  const [couponToEdit, setCouponToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await couponService.getAllcoupons();
        console.log("API Response:", response.coupons);
        setCoupons(response.coupons || []); // Fallback to empty array if response is invalid
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setCoupons([]); // Set to empty array on error
      }
    };
    fetchCoupons();
  }, []);

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleAddCoupon = () => {
    setCouponToEdit(null);
    setIsAdding(true);
  };

  const handleSaveCoupon = async (coupon) => {
    try {
      if (couponToEdit) {
        // Update an existing coupon
        const response = await couponService.updateCoupon(
          couponToEdit.id,
          coupon
        ); // Replace with your API call
        setCoupons((prev) =>
          prev.map((c) => (c.id === couponToEdit.id ? response.data : c))
        );
      } else {
        // Add a new coupon
        const response = await couponService.createCoupon(coupon); // Replace with your API call
        setCoupons((prev) => [...prev, response.data]);
      }
      setIsAdding(false);
    } catch (error) {
      console.error("Error saving coupon:", error);
    }
  };

  const handleEditCoupon = (index) => {
    setCouponToEdit(coupons[index]);
    setIsAdding(true);
  };

  const handleDeleteCoupon = async (index) => {
    const couponToDelete = coupons[index];
    try {
      await couponService.deleteCoupon(couponToDelete.id); // Replace with your API call
      setCoupons((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  const handleToggleStatus = async (index) => {
    const updatedCoupon = { ...coupons[index], active: !coupons[index].active };
    try {
      const response = await couponService.updatecoupon(
        updatedCoupon.id,
        updatedCoupon
      ); // Replace with your API call
      setCoupons((prev) =>
        prev.map((c, i) => (i === index ? response.data : c))
      );
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  
  
  return isAdding ? (
    <AddCouponPage
      couponToEdit={couponToEdit}
      onSaveCoupon={handleSaveCoupon}
      onBack={() => setIsAdding(false)}
    />
  ) : (
    <HomePage
      coupons={filteredCoupons || []} // Ensure it's always an array
      onAddCoupon={handleAddCoupon}
      onEditCoupon={handleEditCoupon}
      onDeleteCoupon={handleDeleteCoupon}
      onToggleStatus={handleToggleStatus}
      onSearch={setSearchTerm}
    />
  );
};

export default CouponDashboard;
