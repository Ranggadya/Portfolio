import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../supabase';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 3;

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('Certifikat')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching certificates:', error);
        } else {
          setCertificates(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const projects = [];

  const totalPages = Math.ceil(certificates.length / certificatesPerPage);
  const startIndex = (currentPage - 1) * certificatesPerPage;
  const endIndex = startIndex + certificatesPerPage;
  const currentCertificates = certificates.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const ProjectCard = ({ project }) => (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 transform group-hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2 font-light">{project.description}</p>
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-block w-auto"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-lg opacity-50 blur-sm group-hover/btn:opacity-90 transition-all duration-300"></div>
            <div className="relative bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 px-4 py-2 flex items-center gap-2 hover:border-white/20 transition-all duration-300">
              <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium text-sm">
                Lihat
              </span>
              <ExternalLink size={16} className="text-gray-200 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const CertificateCard = ({ certificate }) => (
    <div className="group relative h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img 
            src={certificate.img || 'https://images.unsplash.com/photo-1586380879823-b0dc8c8c7d5e?w=600&h=400&fit=crop'} 
            alt={certificate.title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1586380879823-b0dc8c8c7d5e?w=600&h=400&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-xl rounded-full p-3 border border-white/20 group-hover:bg-black/70 transition-all duration-300">
            <Award className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4 leading-tight">
              {certificate.title}
            </h3>
          </div>
          <a 
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-block w-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-lg opacity-50 blur-sm group-hover/btn:opacity-90 transition-all duration-300"></div>
            <div className="relative bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 px-4 py-3 flex items-center justify-center gap-2 hover:border-white/20 transition-all duration-300">
              <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium text-sm">
                Lihat Sertifikat
              </span>
              <ExternalLink size={16} className="text-gray-200 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      id="Portofolio" 
      className="scroll-mt-24 h-auto pb-[10%] bg-[#030014] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm:mt-0"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center lg:mb-8 mb-2">
          <div className="inline-block relative group">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
              Portfolio
            </h2>
          </div>
          <p className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Explore my projects and certifications
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full mx-auto pt-8 sm:pt-12 relative">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'projects'
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg transform scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Code size={20} />
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'certificates'
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg transform scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Award size={20} />
                  Certificates
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[60vh]">
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="transition-all duration-500 opacity-100 translate-y-0">
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">No projects found</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div className="transition-all duration-500 opacity-100 translate-y-0">
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/60"></div>
                  </div>
                ) : certificates.length > 0 ? (
                  <div className="space-y-8">
                    {/* Certificates Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {currentCertificates.map((certificate) => (
                        <CertificateCard key={certificate.id} certificate={certificate} />
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-center pt-8">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                              currentPage === 1
                                ? 'text-gray-500 cursor-not-allowed opacity-50'
                                : 'text-white bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 hover:scale-105'
                            }`}
                          >
                            <ChevronLeft size={18} className={`transition-transform duration-300 ${
                              currentPage > 1 ? 'group-hover:-translate-x-1' : ''
                            }`} />
                            <span className="text-sm">Previous</span>
                          </button>

                          {/* Page Indicator */}
                          <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-lg font-medium text-sm transition-all duration-300 ${
                                  currentPage === page
                                    ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg scale-105'
                                    : 'text-gray-300 bg-black/40 backdrop-blur-xl border border-white/10 hover:text-white hover:bg-white/10 hover:scale-105'
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                              currentPage === totalPages
                                ? 'text-gray-500 cursor-not-allowed opacity-50'
                                : 'text-white bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 hover:scale-105'
                            }`}
                          >
                            <span className="text-sm">Next</span>
                            <ChevronRight size={18} className={`transition-transform duration-300 ${
                              currentPage < totalPages ? 'group-hover:translate-x-1' : ''
                            }`} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">No certificates found</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;