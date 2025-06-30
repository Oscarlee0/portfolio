# Frontend Developer Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean design with smooth animations and integrates with Contentful CMS for dynamic project management.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Optimized for all device sizes
- **Dynamic Content**: Projects managed through Contentful CMS
- **Contact Form**: Netlify Forms integration for seamless contact handling
- **Performance**: Built with Vite for fast development and optimized builds
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **CMS**: Contentful
- **Deployment**: Netlify
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Add your Contentful credentials to `.env`:
```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

5. Start the development server:
```bash
npm run dev
```

## 🎨 Customization

### Content Management
Projects are managed through Contentful CMS. The content type should include:
- `title` (Text)
- `description` (Long text)
- `image` (Media)
- `technologies` (Text, multiple values)
- `liveUrl` (Text)
- `githubUrl` (Text)
- `category` (Text)
- `featured` (Boolean)

### Styling
The design uses Tailwind CSS for styling. Key design elements:
- Gradient backgrounds and buttons
- Smooth hover animations
- Responsive grid layouts
- Custom SVG illustrations

## 🚀 Deployment

### Netlify Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

The contact form will automatically work with Netlify Forms once deployed.

## 📧 Contact Form

The contact form uses Netlify Forms for handling submissions. Messages will be sent to the email configured in the form handler. Features include:
- Spam protection with honeypot field
- Loading states and success/error messages
- Fallback to mailto for offline functionality

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/your-portfolio/issues).

## 📞 Contact

Oscar Obetta - obetta.oscar11@gmail.com

Project Link: [https://github.com/yourusername/your-portfolio](https://github.com/yourusername/your-portfolio)