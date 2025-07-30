# Cleveland Food Resources

A comprehensive React application to help people find food assistance programs throughout Greater Cleveland, Ohio.

## 🎯 Purpose

This app connects community members with essential food resources including food banks, soup kitchens, food pantries, and mobile food programs across the Cleveland metropolitan area. Whether someone needs emergency food assistance or regular support, this tool helps them find the right resources quickly and easily.

## 🌟 Features

### Core Functionality
- **Resource Search**: Search by name, location, or services offered
- **Smart Filtering**: Filter by resource type (Food Banks, Soup Kitchens, Food Pantries, Mobile Pantries)
- **Real-time Search**: Results update as you type
- **Detailed Information**: Comprehensive details for each resource including:
  - Contact information (phone, website)
  - Complete address
  - Hours of operation
  - Services offered
  - Eligibility requirements
  - Current status indicators

### User Experience
- **Responsive Design**: Works seamlessly on mobile phones, tablets, and desktop computers
- **Accessibility**: Screen reader friendly with proper ARIA labels and keyboard navigation
- **Visual Indicators**: Shows if locations are likely open now
- **Emergency Information**: Quick access to emergency food assistance contacts
- **Clean Interface**: Easy-to-read cards with organized information

### Technical Features
- **Modern React**: Built with React 19+ using functional components and hooks
- **Performance**: Fast loading and smooth interactions
- **Error Handling**: Graceful handling of loading states and errors
- **Standards Compliant**: Follows web accessibility guidelines

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sebastianpperez/cleveland-food-resources.git
   cd cleveland-food-resources
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the app

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder, ready for deployment.

## 📱 Usage

### Finding Food Resources

1. **Search**: Use the search bar to find resources by:
   - Organization name (e.g., "Greater Cleveland Food Bank")
   - Location (e.g., "Lakewood", "East Cleveland")
   - Services (e.g., "emergency food", "soup kitchen")

2. **Filter**: Use the dropdown to filter by resource type:
   - All Types (default)
   - Food Banks
   - Food Pantries
   - Soup Kitchens
   - Mobile Food Pantries

3. **View Details**: Each resource card shows:
   - Organization name and type
   - Current status (open/closed indication)
   - Complete address
   - Phone number (clickable to call)
   - Website link
   - Hours of operation
   - Services offered
   - Eligibility requirements

### View Options

- **List View**: Default view showing detailed cards for each resource
- **Map View**: Visual map interface (coming soon with interactive map features)

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # App header with title and navigation
│   ├── SearchFilter.js # Search and filter functionality
│   ├── ResourceCard.js # Individual resource display
│   ├── ResourceList.js # List view of resources
│   └── MapView.js      # Map view placeholder
├── data/               # Data and utilities
│   └── foodResources.js # Resource data and search functions
├── styles/             # CSS styling
│   └── App.css        # Main stylesheet
├── App.js             # Main application component
└── index.js           # Application entry point
```

## 📊 Data

The app includes data for 10+ food resources across Greater Cleveland, including:

- **Major Food Banks**: Greater Cleveland Food Bank, Lutheran Metropolitan Ministry
- **Community Food Pantries**: West Side Catholic Center, Lakewood Community Services
- **Soup Kitchens**: St. Augustine Hunger Center, Breakthrough Ministries
- **Mobile Programs**: Harvest for Hunger Mobile Pantry
- **Suburban Resources**: Parma Community Concerns, Vineyard Church Food Pantry

Each resource includes:
- Accurate contact information
- Current hours of operation
- Detailed service descriptions
- Eligibility requirements
- Geographic coordinates for future map integration

## 🔧 Technology Stack

- **Frontend**: React 19, HTML5, CSS3
- **Styling**: Custom CSS with responsive design
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Create React App
- **Package Manager**: npm

### Dependencies
- `react` - Core React library
- `react-dom` - React DOM rendering
- `react-scripts` - Build and development scripts
- `@emotion/react` & `@emotion/styled` - CSS-in-JS styling (ready for future enhancements)

## 🎨 Design Principles

### Accessibility First
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode compatibility
- Reduced motion support for users with vestibular disorders

### Mobile Responsive
- Mobile-first design approach
- Touch-friendly interface elements
- Optimized for small screens
- Fast loading on mobile networks

### User-Centered
- Clear, scannable information hierarchy
- Intuitive search and filtering
- Emergency contact information prominently displayed
- Real-world usage patterns considered

## 🚀 Deployment

This app is ready for deployment on:

### Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify's deploy interface
3. Configure custom domain if needed

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy
3. Configure environment variables if needed

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://yourusername.github.io/cleveland-food-resources"`
3. Add deploy scripts and run: `npm run deploy`

## 🤝 Contributing

We welcome contributions to improve this resource for the Cleveland community!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**: Add new resources, improve functionality, or enhance accessibility
4. **Test thoroughly**: Ensure the app works on mobile and desktop
5. **Submit a pull request**: Describe your changes and their impact

### Types of Contributions Needed

- **Data Updates**: Add new food resources or update existing information
- **Feature Enhancements**: Improve search, add map integration, enhance accessibility
- **Bug Fixes**: Fix issues with responsiveness, functionality, or data accuracy
- **Documentation**: Improve setup instructions, usage guides, or code comments

## 📞 Emergency Resources

If you need immediate food assistance:

- **Greater Cleveland Food Bank**: (216) 738-2265
- **211 Ohio**: Dial 2-1-1 for comprehensive resource referral
- **Feeding America**: Visit feedingamerica.org to find local resources

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Greater Cleveland Food Bank** for their community leadership in hunger relief
- **Local food pantries and soup kitchens** for their essential community service
- **Cleveland community organizations** for resource data and validation
- **React community** for excellent documentation and tools

---

**Made with ❤️ for the Cleveland community**

For questions, suggestions, or to report outdated information, please open an issue or contact the maintainers.