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
  BookOpen
} from "lucide-react";

const CourseDoubts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resolved, setResolved] = useState([]);
  const [unresolved, setUnresolved] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <Loader className="h-8 w-8 animate-spin text-blue-500 mb-2" />
          <p className="text-gray-500">Loading doubts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6  m-auto  bg-slate-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-slate-800 flex items-center justify-center">
        <BookOpen className="mr-2 text-blue-500" size={24} />
        <span>Course Doubts & Questions</span>
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Unresolved</p>
            <p className="text-2xl font-bold text-amber-600">{unresolved.length}</p>
          </div>
          <div className="bg-amber-100 p-2 rounded-full">
            <AlertCircle className="text-amber-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Resolved</p>
            <p className="text-2xl font-bold text-emerald-600">{resolved.length}</p>
          </div>
          <div className="bg-emerald-100 p-2 rounded-full">
            <CheckCircle className="text-emerald-600" size={24} />
          </div>
        </div>
      </div>

      {/* ❌ Unresolved Doubts */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4 flex items-center">
          <HelpCircle className="text-amber-500 mr-2" size={24} />
          <span>Unresolved Doubts</span>
        </h2>
        
        {unresolved.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unresolved.map((doubt, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(doubt._id)}
                className="bg-white aspect-square flex flex-col rounded-xl shadow-md p-4 border-t-4 border-amber-500 transition duration-300 hover:shadow-lg hover:translate-y-px cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 flex-1">
                    {doubt.title}
                  </h3>
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium flex items-center whitespace-nowrap ml-2">
                    <Clock size={12} className="mr-1" /> Pending
                  </span>
                </div>
                
                <p className="text-slate-600 mb-4 flex-grow line-clamp-3">{doubt.description}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-slate-600">
                      <User size={14} className="mr-1" />
                      <span className="truncate max-w-24">{doubt.askedBy?.userName || "Anonymous"}</span>
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
                    <span>
                      {formatDate(doubt.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
            <AlertCircle className="mx-auto mb-2 text-amber-500" size={32} />
            <p className="text-slate-600">No unresolved doubts at the moment.</p>
            <p className="text-sm text-slate-400 mt-1">All questions have been addressed!</p>
          </div>
        )}
      </section>

      {/* ✅ Resolved Doubts */}
      <section className="mt-10">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4 flex items-center">
          <CheckCircle className="text-emerald-500 mr-2" size={24} />
          <span>Resolved Doubts</span>
          <span className="ml-2 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
            {resolved.length}
          </span>
        </h2>

        {resolved.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resolved.map((doubt, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(doubt._id)}
                className="bg-white aspect-square flex flex-col rounded-xl shadow-md border border-slate-100 p-4 transition duration-300 hover:shadow-lg hover:border-emerald-200 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 flex-1">
                    {doubt.title}
                  </h3>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium flex items-center whitespace-nowrap ml-2">
                    <CheckCircle size={12} className="mr-1" /> Resolved
                  </span>
                </div>
                
                <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">
                  {doubt.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <span className="flex items-center">
                      <User size={14} className="mr-1" />
                      <span className="truncate max-w-24">{doubt.askedBy?.userName || "Anonymous"}</span>
                    </span>
                    <span>
                      {formatDate(doubt.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
            <CheckCircle className="mx-auto mb-2 text-slate-300" size={32} />
            <p className="text-slate-600">No resolved doubts yet.</p>
            <p className="text-sm text-slate-400 mt-1">Questions will appear here once they're resolved.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CourseDoubts;