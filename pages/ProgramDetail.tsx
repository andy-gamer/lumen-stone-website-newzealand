
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, CheckCircle, Shield, Globe, Users, ArrowLeft } from 'lucide-react';
import { DataService } from '../services/db';
import { Program } from '../types';

const ProgramDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
        if (id) {
            setLoading(true);
            const data = await DataService.getProgramById(id);
            setProgram(data);
            setLoading(false);
        }
    };
    fetchProgram();
  }, [id]);

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-lumen-dark/20 border-t-lumen-dark rounded-full animate-spin"></div>
          </div>
      );
  }

  if (!program) {
    return <div className="p-20 text-center min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Program not found</h2>
        <Link to="/programs" className="text-lumen-accent underline">Back to list</Link>
    </div>;
  }

  return (
    <div className="bg-white font-sans">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link to="/programs" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-bold transition-colors">
          <ArrowLeft size={20} /> Back to Courses
        </Link>
      </div>

      {/* Modern Hero Section */}
      <div className="container mx-auto px-4 py-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
               <span className="inline-block px-4 py-1 rounded-full bg-lumen-accent/10 text-lumen-accent font-bold text-sm mb-6">
                 {program.type}
               </span>
               <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight font-serif">{program.title}</h1>
               <div className="flex flex-wrap gap-6 text-gray-600 font-medium mb-8">
                 <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg"><MapPin size={18} className="text-lumen-accent" /> {program.country}, {program.city}</span>
                 <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg"><Users size={18} className="text-lumen-accent" /> {program.ageRange}</span>
                 <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg"><Clock size={18} className="text-lumen-accent" /> {program.duration}</span>
               </div>
               <div className="text-3xl font-extrabold text-lumen-dark mb-8">{program.price}</div>
               <div className="flex gap-4">
                  <Link 
                    to="/booking"
                    state={{ interestedProgram: program.title }}
                    className="px-8 py-4 bg-lumen-dark text-white rounded-full font-bold shadow-glow hover:shadow-lg transition-all hover:-translate-y-1 tracking-wider"
                  >
                    Enroll Now
                  </Link>
                  <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-50">
                    Download Brochure
                  </button>
               </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-lumen-accent rounded-[50px] transform rotate-3 translate-x-4 translate-y-4 opacity-10"></div>
               <img src={program.image} alt={program.title} className="relative w-full rounded-[50px] shadow-2xl object-cover z-10" />
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-gray-100 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-16">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Highlights</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {program.highlights?.map((h, i) => (
                <li key={i} className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:border-lumen-accent/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                     <CheckCircle className="text-green-600" size={16} />
                  </div>
                  <span className="text-gray-700 font-bold text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">About Course</h2>
             <p className="text-gray-500 leading-loose text-lg mb-8 text-justify">{program.description}</p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-3xl text-center">
                  <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"><Globe size={24}/></div>
                  <h4 className="font-bold mb-1 text-gray-900">International</h4>
                  <p className="text-xs text-gray-500">Global Student Mix</p>
                </div>
                 <div className="bg-orange-50 p-6 rounded-3xl text-center">
                  <div className="w-12 h-12 bg-white text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"><Shield size={24}/></div>
                  <h4 className="font-bold mb-1 text-gray-900">Safe & Secure</h4>
                  <p className="text-xs text-gray-500">24/7 Guardian</p>
                </div>
                 <div className="bg-purple-50 p-6 rounded-3xl text-center">
                  <div className="w-12 h-12 bg-white text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"><Calendar size={24}/></div>
                  <h4 className="font-bold mb-1 text-gray-900">Activities</h4>
                  <p className="text-xs text-gray-500">Weekend Trips</p>
                </div>
             </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Schedule Preview</h2>
            <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-bold">Time</th>
                    <th className="px-6 py-4 font-bold">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-lumen-accent">09:00 - 12:00</td>
                    <td className="px-6 py-4 font-medium">分級英語課程 (ESL / Academic English)</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-lumen-accent">12:00 - 13:30</td>
                    <td className="px-6 py-4 font-medium">Lunch & Social Time</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-lumen-accent">13:30 - 16:30</td>
                    <td className="px-6 py-4 font-medium">Afternoon Activities / Workshops / City Tour</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-8">
            <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 font-serif">What's Included</h3>
              <div className="space-y-4 mb-8 text-sm text-gray-600 font-medium">
                <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl">
                  <span>Tuition Fee</span> <CheckCircle size={18} className="text-green-500"/>
                </div>
                <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl">
                  <span>Accommodation</span> <CheckCircle size={18} className="text-green-500"/>
                </div>
                <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl">
                  <span>Meals (Partial)</span> <CheckCircle size={18} className="text-green-500"/>
                </div>
                <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl">
                  <span>Insurance</span> <CheckCircle size={18} className="text-green-500"/>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                 <p className="text-gray-500 text-xs mb-2 uppercase tracking-widest font-bold">Total Price</p>
                 <p className="text-2xl font-extrabold text-gray-900 mb-4">{program.price}</p>
                 <Link 
                    to="/booking"
                    state={{ interestedProgram: program.title }}
                    className="block w-full bg-lumen-dark text-white py-3 rounded-xl font-bold hover:bg-black transition-colors"
                  >
                    Book Consultation
                  </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-3xl border border-orange-100">
              <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Next Intake
              </h4>
              <p className="text-sm text-orange-800/80 mb-4">Limited spots available for Summer 2024.</p>
              <div className="space-y-2">
                <div className="bg-white/60 px-4 py-2 rounded-xl text-sm font-bold text-orange-900">2024.07.01 - 2024.07.28</div>
                <div className="bg-white/60 px-4 py-2 rounded-xl text-sm font-bold text-orange-900">2024.08.01 - 2024.08.28</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
