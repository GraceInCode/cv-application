import jsPDF from 'jspdf'
import html2canvas from 'html2canvas-pro';
import { useState } from 'react'
import { User, GraduationCap, Briefcase, Edit3, Check, Mail, Phone, Download, Eye, } from 'lucide-react'


  // CVPreview Modal Component
  const CVPreview = ({ generalInfo, education, experience, onClose }) => {
    const handleDownload = async () => {
      const cvElement = document.querySelector('.cv-preview')

      try {
        // Convert the CV preview to canvas
        const canvas = await html2canvas(cvElement, {
          scale: 2, // Increase scale for better quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff', // Set background color to white
        })

        // Create a new jsPDF instance
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4')

        const pdfWodth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width * 0.75 // Adjust width for better fit
        const imgHeight = canvas.height * 0.75 // Adjust height for better fit
        const ratio = Math.min(pdfWodth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWodth - imgWidth * ratio) / 2
        const imgY = 0;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
        pdf.save(`${generalInfo.name || 'CV'}.pdf`)
      } catch (error) {
        console.error('Error generating PDF:', error)
        // Fallback to simple text PDF generation
        const doc = new jsPDF()
        doc.setFontSize(16)
        doc.text('CV Preview', 20, 20)
        doc.setFontSize(12)
        doc.text(`Name: ${generalInfo.name || 'Your Name'}`, 20, 30)
        doc.text(`Email: ${generalInfo.email || 'your.email@example.com'}`, 20, 40)
        doc.text(`Phone: ${generalInfo.phone || '+1 (555) 123-4567'}`, 20, 50)
        doc.text('Education:', 20, 70)
        doc.text(`${education.degree || 'Your Degree'}`, 20, 80)
        doc.text(`${education.school || 'Your School/University'}`, 20, 90)
        doc.text('Experience:', 20, 110)
        doc.text(`${experience.position || 'Position'}`, 20, 120)
        doc.text(`${experience.company || 'Company'}`, 20, 130)
        doc.text(`Responsibilities: ${experience.responsibilities || 'Your main responsibilities and achievements will be displayed here.'}`, 20, 140)
        doc.save(`${generalInfo.name || 'CV'}.pdf`)
      }
    }

    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
        <div className='bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold'>CV Preview</h2>
              <div className='flex space-x-2'>
                <button
                  onClick={handleDownload}
                  className='flex items-center bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors cursor-pointer'
                >
                  Downlaod PDF
                </button>
                <button
                  onClick={onClose}
                  className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors cursor-pointer text-white'
                >
                  Close
                </button>
              </div>
            </div>
          </div >


          <div className='cv-preview p-8 bg-white'>
            {/* General Information Section */}
            <div className='mb-8'>
              <div className='text-center mb-6'>
                <h1 className='text-4xl font-bold text-gray-800 mb-2'>
                  {generalInfo.name || 'Your name'}
                </h1>
                <div className='flex justify-center space-x-6 text-gray-600'>
                  <div className='flex items-center'>
                    <Mail className='w-5 h-5 mr-2' />
                    {generalInfo.email || 'your.email@example.com'}
                  </div>
                  <div className='flex items-center'>
                    <Phone className='w-5 h-5 mr-2' />
                    {generalInfo.phone || '+1 (555) 123-4567'}
                  </div>
                </div>
              </div>
            </div>
  
            {/* Education Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-1">
                  Education
                </h2>
              </div>
              <div className="ml-9">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {education.degree || 'Your Degree'}
                  </h3>
                  <p className="text-blue-600 font-medium text-lg">
                    {education.school || 'Your School/University'}
                  </p>
                  <p className="text-gray-600">
                    {education.dates || 'Study Period'}
                  </p>
                </div>
              </div>
            </div>
  
            {/* Experience Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-purple-600 pb-1">
                  Professional Experience
                </h2>
              </div>
              <div className="ml-9">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {experience.position || 'Your Position'}
                    </h3>
                    <span className="text-gray-500 bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {experience.dates || 'Employment Period'}
                    </span>
                  </div>
                  <p className="text-purple-600 font-medium text-lg mb-3">
                    {experience.company || 'Your Company'}
                  </p>
                  <div className="text-gray-700 leading-relaxed">
                    {experience.responsibilities || 'Your main responsibilities and achievements will be displayed here.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // GeneralInfo Component
  const GeneralInfo = ({ data, onSubmit, isEditing, onEdit}) => {
    const [formData, setFormData] = useState({
      name: data.name || '',
    email: data.email || '',
    phone: data.phone || ''
  })

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  if (isEditing) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg border border-blue-100">
        <div className='flex items-center mb-4'>
          <User className='w-6 h-6 text-blue-600 mr-2' />
          <h2 className='text-2xl font-bold text-gray-800'>Personal Information</h2>
        </div>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
            <input 
            type="text" 
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Enter your full name'
            required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
            <input 
            type="email" 
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='your.email@example.com'
            required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
            <input 
            type="tel" 
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='+1 (555) 123-4567'
            required
            />
          </div>
          <button
          type='button'
          onClick={handleSubmit}
          className='flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer'
          >
            <Check className='w-4 h-4 mr-2' />
            Save Information
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg border border-blue-100'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <User className='w-6 h-6 text-blue-600 mr-2' />
          <h2 className='text-2xl font-bold text-gray-800'>Personal Information</h2>
        </div>
        <button
        onClick={onEdit}
        className='flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer'
        >
          <Edit3 className='w-4 h-4 mr-1' />
          Edit
        </button>
      </div>
      <div className='space-y-3'>
        <div className='flex items-center'>
          <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <span className='text-xl font-semibold text-gray-800'>{data.name}</span>
        </div>
        <div className='flex items-center'>
          <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <span className='text-gray-700'>{data.email}</span>
        </div>
        <div className='flex items-center'>
          <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
            <Phone className="w-4 h-4 text-blue-600" />
          </div>
          <span className='text-gray-700'>{data.phone}</span>
        </div>
      </div>
    </div>
  )
}

// Education Component
const Education = ({ data, onSubmit, isEditing, onEdit }) => {
  const [formData, setFormData] = useState({
    school: data.school || '',
    degree: data.degree || '',
    dates: data.dates || ''
  })

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  if (isEditing) {
    return (
      <div className='bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl shadow-lg border border-green-100'>
        <div className='flex items-center mb-4'>
          <GraduationCap className='w-6 h-6 text-green-600 mr-2' />
          <h2 className='text-2xl font-bold text-gray-800'>Education</h2>
        </div>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>School/University</label>
            <input
            type="text"
            value={formData.school}
            onChange={(e) => handleChange('school', e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
            placeholder='University of Example'
            required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Degree/Title of Study</label>
            <input
            type="text"
            value={formData.degree}
            onChange={(e) => handleChange('degree', e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
            placeholder='Bachelor of Science'
            required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Study Period</label>
            <input
            type="text"
            value={formData.dates}
            onChange={(e) => handleChange('dates', e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
            placeholder='September 2018 - June 2022'
            required
            />
          </div>
          <button
          type='button'
          onClick={handleSubmit}
          className='flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors cursor-pointer'
          >
            <Check className='w-4 h-4 mr-2' />
            Save Education
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl shadow-lg border border-green-100'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <GraduationCap className='w-6 h-6 text-green-600 mr-2' />
          <h2 className='text-2xl font-bold text-gray-800'>Education</h2>
        </div>
        <button
        onClick={onEdit}
        className='flex items-center text-green-600 hover:text-green-800 transition-colors cursor-pointer'
        >
          <Edit3 className='w-4 h-4 mr-1' />
          Edit
        </button>
      </div>
      <div className='bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold text-gray-800 mb-1'>{data.degree}</h3>
        <p className='text-green-700 font-medium mb-1'>{data.school}</p>
        <p className='text-gray-600 text-sm'>{data.dates}</p>
      </div>
    </div>
  )
} 

// Experience Component
const Experience = ({ data, onSubmit, isEditing, onEdit }) => {
  const [formData, setFormData] = useState({
    company: data.company || '',
    position: data.position || '',
    dates: data.dates || '',
    responsibilities: data.responsibilities || ''
  })

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  if (isEditing) {
    return (
      <div className='bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg border border-purple-100'>
        <div className='flex items-center mb-4'>
          <Briefcase className='w-6 h-6 text-purple-600 mr-2' />
          <h2 className='text-2xl font-bold text-gray-800'>Professional Experience</h2>
        </div>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              placeholder='Tech Company Inc.'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Position Title</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              placeholder='Software Engineer'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Employment Period</label>
            <input
              type="text"
              value={formData.dates}
              onChange={(e) => handleChange('dates', e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              placeholder='January 2020 - Present'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Main Responsibilities</label>
            <textarea
              value={formData.responsibilities}
              onChange={(e) => handleChange('responsibilities', e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              placeholder='Describe your key responsibilities and achievements'
              required
            />
          </div>
          <button
            type='button'
            onClick={handleSubmit}
            className='flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer'
          >
            <Check className='w-4 h-4 mr-2' />
            Save Experience
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg border border-purple-100'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <Briefcase className='w-6 h-6 text-purple-600 mr-2' />
          <h2 className='text-2xl font-bold text-gray-800'>Professional Experience</h2>
        </div>
        <button
          onClick={onEdit}
          className='flex items-center text-purple-600 hover:text-purple-800 transition-colors cursor-pointer'
        >
          <Edit3 className='w-4 h-4 mr-1' />
          Edit
        </button>
      </div>
      <div className='bg-white p-4 rounded-lg'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-lg font-semibold text-gray-800'>{data.position}</h3>
          <span className='text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded'>{data.dates}</span>
        </div>
        <p className='text-purple-700 font-medium mb-2'>{data.company}</p>
        <p className='text-gray-600 text-sm leading-relaxed'>{data.responsibilities}</p>
      </div>
    </div>
  )
}


// Main App Component
const CVBuilder = () => {
  const [generalInfo, setGeneralInfo] = useState({})
  const [education, setEducation] = useState({})
  const [experience, setExperience] = useState({})
  const [showPreview, setShowPreview] = useState(false)

  const [editingSection, setEditingSection] = useState({
    general: true,
    education: true,
    experience: true
  })

  const handleGeneralInfoSubmit = (data) => {
    setGeneralInfo(data)
    setEditingSection({...editingSection, general: false })
  }

  const handleEducationSubmit = (data) => {
    setEducation(data)
    setEditingSection({...editingSection, education: false })
  }

  const handleExperienceSubmit = (data) => {
    setExperience(data)
    setEditingSection({...editingSection, experience: false })
  }

  const handleEdit = (section) => {
    setEditingSection({...editingSection, [section]: true })
  }

  const isComplete = !editingSection.general && !editingSection.education && !editingSection.experience

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview)
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Professional CV builder</h1>
          <p className='text-gray-600'>Create your CV effortlessly with interactive builder</p>
          
          {isComplete && (
            <div className='mt-4 p-3 bg-green-100 border border-green-300 rounded-lg'>
              <p className='text-green-800 font-medium'>🎉 Your CV is complete! You can edit any section by clicking the Edit button.</p>
            </div>
          )}

          {isComplete && (
            <div className='mt-4'>
              <button
               onClick={handlePreviewToggle}
               className='flex items-center mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg'
               >
                <Eye className='w-5 h-5 mr-2' />
                Preview & Download CV
               </button>
            </div>
          )}
        </div>

        <div className='space-y-8'>
          <GeneralInfo 
            data={generalInfo}
            onSubmit={handleGeneralInfoSubmit}
            isEditing={editingSection.general}
            onEdit={() => handleEdit('general')}
          />

          <Education
           data={education}
           onSubmit={handleEducationSubmit}
           isEditing={editingSection.education}
           onEdit={() => handleEdit('education')}
          />

          <Experience
            data={experience}
            onSubmit={handleExperienceSubmit}
            isEditing={editingSection.experience}
            onEdit={() => handleEdit('experience')}
          />
        {showPreview && (
          <CVPreview 
            generalInfo={generalInfo}
            education={education}
            experience={experience}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  </div>
  )
}

export default CVBuilder