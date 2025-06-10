# CV Builder

A simple and interactive CV builder application built with React and Vite. This application allows users to input their personal information, education, and professional experience to generate a professional CV. The CV can be previewed in real-time and downloaded as a PDF.

Features

Interactive Form: Input personal information, education, and professional experience through an intuitive form.

Real-time Preview: View your CV as you build it, with updates reflected instantly.

PDF Download: Download your completed CV as a PDF with a single click.

Edit Functionality: Edit any section of your CV at any time, even after submission.

Technologies Used

React: For building the dynamic user interface.

Vite: For fast development and optimized builds.

Tailwind CSS: For responsive and modern styling.

jsPDF: For generating downloadable PDF files.

html2canvas-pro: For converting the CV preview into an image for PDF embedding.

Lucide React: For providing sleek, customizable icons.

Installation

To set up the project locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/yourusername/cv-builder.git
```

Navigate to the project directory:

```bash
cd cv-builder
```

Install the dependencies:

```bash
npm install
```

Usage

Run the following commands to work with the project:

Start the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Once the development server is running, open your browser to <http://localhost:5173> (or the port specified by Vite) to use the application.

How It Works

The application is organized into three main sections:

General Information: Enter your name, email, and phone number.

Education: Add details about your academic background, including degree, school, and dates.

Professional Experience: Input your work history, including position, company, dates, and responsibilities.

After completing the forms, you can preview your CV in a modal window. The preview can be downloaded as a PDF using the jsPDF library, which works in tandem with html2canvas-pro to capture the preview as an image and embed it into the PDF. If PDF generation fails, a fallback text-based PDF is provided.

Contributing

Contributions are welcome! To contribute:

Fork the repository.

Create a new branch for your feature or bug fix.

Submit a pull request with a clear description of your changes.

Feel free to open an issue for suggestions or bug reports.

