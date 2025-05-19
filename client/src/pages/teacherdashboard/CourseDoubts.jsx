// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { 
//   HelpCircle, 
//   CheckCircle, 
//   Clock, 
//   User, 
//   ThumbsUp, 
//   MessageCircle, 
//   AlertCircle,
//   Loader,
//   BookOpen
// } from "lucide-react";

// const CourseDoubts = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [resolved, setResolved] = useState([]);
//   const [unresolved, setUnresolved] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDoubts = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`http://localhost:4400/api/doubts/course/${id}`);
//         const allDoubts = res.data;

//         const resolvedDoubts = allDoubts.filter(d => d.isResolved);
//         const unresolvedDoubts = allDoubts.filter(d => !d.isResolved);

//         setResolved(resolvedDoubts);
//         setUnresolved(unresolvedDoubts);
//       } catch (err) {
//         console.error("Error fetching doubts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoubts();
//   }, [id]);

//   const handleCardClick = (doubtId) => {
//     navigate(`/doubts/${doubtId}/chat`);
//   };

//   // Format date to be more readable
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="flex flex-col items-center">
//           <Loader className="h-8 w-8 animate-spin text-blue-500 mb-2" />
//           <p className="text-gray-500">Loading doubts...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6  m-auto  bg-slate-50 min-h-screen">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-slate-800 flex items-center justify-center">
//         <BookOpen className="mr-2 text-blue-500" size={24} />
//         <span>Course Doubts & Questions</span>
//       </h1>

//       {/* Top Stats */}
//       <div className="grid grid-cols-2 gap-4 mb-8">
//         <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-500">Unresolved</p>
//             <p className="text-2xl font-bold text-amber-600">{unresolved.length}</p>
//           </div>
//           <div className="bg-amber-100 p-2 rounded-full">
//             <AlertCircle className="text-amber-600" size={24} />
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-500">Resolved</p>
//             <p className="text-2xl font-bold text-emerald-600">{resolved.length}</p>
//           </div>
//           <div className="bg-emerald-100 p-2 rounded-full">
//             <CheckCircle className="text-emerald-600" size={24} />
//           </div>
//         </div>
//       </div>

//       {/* ❌ Unresolved Doubts */}
//       <section className="mb-10">
//         <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4 flex items-center">
//           <HelpCircle className="text-amber-500 mr-2" size={24} />
//           <span>Unresolved Doubts</span>
//         </h2>
        
//         {unresolved.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {unresolved.map((doubt, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleCardClick(doubt._id)}
//                 className="bg-white aspect-square flex flex-col rounded-xl shadow-md p-4 border-t-4 border-amber-500 transition duration-300 hover:shadow-lg hover:translate-y-px cursor-pointer"
//               >
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 flex-1">
//                     {doubt.title}
//                   </h3>
//                   <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium flex items-center whitespace-nowrap ml-2">
//                     <Clock size={12} className="mr-1" /> Pending
//                   </span>
//                 </div>
                
//                 <p className="text-slate-600 mb-4 flex-grow line-clamp-3">{doubt.description}</p>
                
//                 <div className="mt-auto">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="flex items-center text-slate-600">
//                       <User size={14} className="mr-1" />
//                       <span className="truncate max-w-24">{doubt.askedBy?.userName || "Anonymous"}</span>
//                     </span>
//                     <span className="flex items-center text-slate-600">
//                       <ThumbsUp size={14} className="mr-1" />
//                       {doubt.upvotes}
//                     </span>
//                   </div>
                  
//                   <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
//                     <span className="flex items-center">
//                       <MessageCircle size={14} className="mr-1" />
//                       Reply
//                     </span>
//                     <span>
//                       {formatDate(doubt.createdAt)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
//             <AlertCircle className="mx-auto mb-2 text-amber-500" size={32} />
//             <p className="text-slate-600">No unresolved doubts at the moment.</p>
//             <p className="text-sm text-slate-400 mt-1">All questions have been addressed!</p>
//           </div>
//         )}
//       </section>

//       {/* ✅ Resolved Doubts */}
//       <section className="mt-10">
//         <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4 flex items-center">
//           <CheckCircle className="text-emerald-500 mr-2" size={24} />
//           <span>Resolved Doubts</span>
//           <span className="ml-2 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
//             {resolved.length}
//           </span>
//         </h2>

//         {resolved.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {resolved.map((doubt, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleCardClick(doubt._id)}
//                 className="bg-white aspect-square flex flex-col rounded-xl shadow-md border border-slate-100 p-4 transition duration-300 hover:shadow-lg hover:border-emerald-200 cursor-pointer"
//               >
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 flex-1">
//                     {doubt.title}
//                   </h3>
//                   <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium flex items-center whitespace-nowrap ml-2">
//                     <CheckCircle size={12} className="mr-1" /> Resolved
//                   </span>
//                 </div>
                
//                 <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">
//                   {doubt.description}
//                 </p>
                
//                 <div className="mt-auto">
//                   <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs text-slate-500">
//                     <span className="flex items-center">
//                       <User size={14} className="mr-1" />
//                       <span className="truncate max-w-24">{doubt.askedBy?.userName || "Anonymous"}</span>
//                     </span>
//                     <span>
//                       {formatDate(doubt.createdAt)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
//             <CheckCircle className="mx-auto mb-2 text-slate-300" size={32} />
//             <p className="text-slate-600">No resolved doubts yet.</p>
//             <p className="text-sm text-slate-400 mt-1">Questions will appear here once they're resolved.</p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default CourseDoubts;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  User, 
  ThumbsUp, 
  MessageCircle, 
  AlertCircle,
  Loader,
  BookOpen,
  ArrowLeft,
  Filter
} from "lucide-react";

const CourseDoubts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resolved, setResolved] = useState([]);
  const [unresolved, setUnresolved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("unresolved");

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4400/api/doubts/course/${id}`);
        const allDoubts = res.data;

        const resolvedDoubts = allDoubts.filter(d => d.isResolved);
        const unresolvedDoubts = allDoubts.filter(d => !d.isResolved);

        setResolved(resolvedDoubts);
        setUnresolved(unresolvedDoubts);
      } catch (err) {
        console.error("Error fetching doubts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoubts();
  }, [id]);

  const handleCardClick = (doubtId) => {
    navigate(`/doubts/${doubtId}/chat`);
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md">
          <Loader className="h-10 w-10 animate-spin text-blue-500 mb-4" />
          <p className="text-slate-700 font-medium">Loading doubts...</p>
          <p className="text-slate-500 text-sm mt-2">Please wait while we fetch the data</p>
        </div>
      </div>
    );
  }

  // ...unchanged imports

return (
  <div className="bg-slate-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header with Back Button */}
      <div className="mb-6">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-[#7670AC] hover:text-[#5491CA] transition-colors mb-4 group"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4 mr-1 transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to courses</span>
        </button>
        
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center">
          <BookOpen className="mr-3 text-[#5491CA] hidden sm:block" size={28} />
          <span>Course Doubts & Questions</span>
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-300 border border-slate-100">
          <div>
            <p className="text-sm text-slate-500">Total Questions</p>
            <p className="text-2xl font-bold text-slate-800">{resolved.length + unresolved.length}</p>
          </div>
          <div className="bg-[#5491CA]/20 p-2 rounded-full">
            <HelpCircle className="text-[#5491CA]" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-300 border border-slate-100">
          <div>
            <p className="text-sm text-slate-500">Unresolved</p>
            <p className="text-2xl font-bold text-[#7670AC]">{unresolved.length}</p>
          </div>
          <div className="bg-[#7670AC]/20 p-2 rounded-full">
            <AlertCircle className="text-[#7670AC]" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-300 border border-slate-100">
          <div>
            <p className="text-sm text-slate-500">Resolved</p>
            <p className="text-2xl font-bold text-[#5491CA]">{resolved.length}</p>
          </div>
          <div className="bg-[#5491CA]/20 p-2 rounded-full">
            <CheckCircle className="text-[#5491CA]" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-300 border border-slate-100">
          <div>
            <p className="text-sm text-slate-500">Response Rate</p>
            <p className="text-2xl font-bold text-[#7670AC]">
              {unresolved.length + resolved.length > 0 
                ? Math.round((resolved.length / (unresolved.length + resolved.length)) * 100) 
                : 0}%
            </p>
          </div>
          <div className="bg-[#7670AC]/20 p-2 rounded-full">
            <MessageCircle className="text-[#7670AC]" size={24} />
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden mb-6">
        <div className="flex rounded-lg bg-slate-200 p-1">
          <button
            onClick={() => setActiveTab("unresolved")}
            className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center transition-colors ${
              activeTab === "unresolved" 
                ? "bg-white text-[#7670AC] shadow-sm" 
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <AlertCircle size={16} className={`mr-1 ${activeTab === "unresolved" ? "text-[#7670AC]" : ""}`} />
            Unresolved ({unresolved.length})
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center transition-colors ${
              activeTab === "resolved" 
                ? "bg-white text-[#5491CA] shadow-sm" 
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <CheckCircle size={16} className={`mr-1 ${activeTab === "resolved" ? "text-[#5491CA]" : ""}`} />
            Resolved ({resolved.length})
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {/* Unresolved Section */}
        <section className={`${activeTab === "resolved" ? "hidden md:block" : ""}`}>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <div className="bg-[#7670AC]/20 p-1.5 rounded-lg mr-3">
              <HelpCircle className="text-[#7670AC]" size={20} />
            </div>
            <span>Unresolved Doubts</span>
            <span className="ml-3 text-xs bg-[#7670AC]/20 text-[#7670AC] px-2 py-0.5 rounded-full">
              {unresolved.length}
            </span>
          </h2>

          {unresolved.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unresolved.map((doubt, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(doubt._id)}
                  className="bg-white flex flex-col rounded-xl shadow-sm p-5 border-l-4 border-[#7670AC] transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7670AC] focus:ring-offset-2"
                  tabIndex={0}
                  aria-label={`Unresolved doubt: ${doubt.title}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 flex-1">
                      {doubt.title}
                    </h3>
                    <span className="bg-[#7670AC]/20 text-[#7670AC] px-2 py-1 rounded-full text-xs font-medium flex items-center whitespace-nowrap ml-2">
                      <Clock size={12} className="mr-1" /> Pending
                    </span>
                  </div>

                  <p className="text-slate-600 mb-4 flex-grow line-clamp-3 text-sm">{doubt.description}</p>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="flex items-center text-slate-600">
                        <User size={14} className="mr-1" />
                        <span className="truncate max-w-20">{doubt.askedBy?.userName || "Anonymous"}</span>
                      </span>
                      <span className="flex items-center text-slate-600">
                        <ThumbsUp size={14} className="mr-1" />
                        {doubt.upvotes}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                      <span className="flex items-center">
                        <MessageCircle size={14} className="mr-1" />
                        Reply
                      </span>
                      <span>{formatDate(doubt.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
              <div className="bg-[#7670AC]/10 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <AlertCircle className="text-[#7670AC]" size={32} />
              </div>
              <p className="text-slate-700 font-medium">No unresolved doubts at the moment.</p>
              <p className="text-sm text-slate-500 mt-1">All questions have been addressed!</p>
            </div>
          )}
        </section>

        {/* Resolved Section */}
        <section className={`${activeTab === "unresolved" ? "hidden md:block" : ""}`}>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <div className="bg-[#5491CA]/20 p-1.5 rounded-lg mr-3">
              <CheckCircle className="text-[#5491CA]" size={20} />
            </div>
            <span>Resolved Doubts</span>
            <span className="ml-3 text-xs bg-[#5491CA]/20 text-[#5491CA] px-2 py-0.5 rounded-full">
              {resolved.length}
            </span>

            <div className="ml-auto flex items-center">
              <button className="text-xs flex items-center text-slate-500 hover:text-slate-700 bg-white py-1 px-2 rounded border border-slate-200 shadow-sm hover:shadow transition-all">
                <Filter size={12} className="mr-1" /> Filter
              </button>
            </div>
          </h2>

          {resolved.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resolved.map((doubt, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(doubt._id)}
                  className="bg-white flex flex-col rounded-xl shadow-sm border border-slate-100 p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:ring-offset-2"
                  tabIndex={0}
                  aria-label={`Resolved doubt: ${doubt.title}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-1.5">
                        <span className="bg-[#5491CA]/20 text-[#5491CA] px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                          <CheckCircle size={12} className="mr-1" /> Resolved
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">
                        {doubt.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">
                    {doubt.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs text-slate-500">
                      <span className="flex items-center">
                        <User size={14} className="mr-1" />
                        <span className="truncate max-w-20">{doubt.askedBy?.userName || "Anonymous"}</span>
                      </span>
                      <span>{formatDate(doubt.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
              <div className="bg-slate-50 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <CheckCircle className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-700 font-medium">No resolved doubts yet.</p>
              <p className="text-sm text-slate-500 mt-1">Questions will appear here once they're resolved.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  </div>
);

};

export default CourseDoubts;