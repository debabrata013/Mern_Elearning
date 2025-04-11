const CourseLearningPage = () => {
  // const { courseId } = useParams();
  const location = useLocation();
  const [course, setCourse] = useState(location.state?.course || null);
 /// const [loading, setLoading] = useState(false); // already loaded? no need to wait
  const [currentSection, setCurrentSection] = useState(0);

  // useEffect(() => {
  //   // Fetch only if course is not passed via navigate state
  //   if (!course) {
  //     const fetchCourse = async () => {
  //       try {
  //         const response = await fetch(`/api/courses/${courseId}`);
  //         const data = await response.json();
  //         setCourse(data);
  //       } catch (error) {
  //         console.error("Failed to fetch course", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchCourse();
  //   }
  // }, [course, courseId]);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="w-12 h-12 border-4 border-[#7670AC] border-t-transparent rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  if (!course) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-[#5491CA]">Course Not Found</h2>
        <p className="text-gray-600">Try accessing a different course.</p>
      </div>
    );
  }

  const section = course.sections?.[currentSection] || {
    title: "No content",
    description: "No data available",
    videoUrl: "",
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        sections={course.sections || []}
        activeSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-[#5491CA] mb-4">
          {course.title}
        </h1>
        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
        <p className="text-gray-600 mb-6">{section.description}</p>

        {section.videoUrl ? (
          <div className="aspect-video w-full max-w-4xl rounded-lg overflow-hidden shadow-md border">
            <iframe
              src={section.videoUrl}
              title={section.title}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500">
            No video content available.
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseLearningPage;
