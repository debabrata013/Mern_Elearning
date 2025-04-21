// pages/ResourceViewer.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ResourceViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resourceUrl = location.state?.url;

  useEffect(() => {
    if (!resourceUrl) {
      navigate("/"); // redirect to home if no url
    }
  }, [resourceUrl, navigate]);

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-[#5491CA]">📄 Resource Viewer</h2>
      <iframe
        src={resourceUrl}
        title="Resource"
        className="w-full h-[85vh] rounded-lg border"
      ></iframe>
    </div>
  );
};

export default ResourceViewer;
