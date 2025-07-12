# Deployment Instructions for ReWear

## Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## 1. Install Dependencies
```sh
npm install
```

## 2. Development Server
To start the app locally:
```sh
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## 3. Production Build
To build for production:
```sh
npm run build
```
The static files will be generated in the `dist/` directory.

## 4. Preview Production Build
To preview the production build locally:
```sh
npm run preview
```

## 5. Deployment
You can deploy the contents of the `dist/` folder to any static hosting provider:
- **Netlify**: Drag-and-drop the `dist/` folder or connect your repo.
- **Vercel**: Import your project and set build command to `npm run build`, output to `dist`.
- **GitHub Pages**: Use a plugin or action to publish the `dist/` folder.

### Environment Variables
If you add any environment variables, create a `.env` file in the project root and document them in this file.

## 6. Admin Access
To use the admin panel, a user must have `isAdmin: true` in their user object. By default, there is no admin user—set this manually in your user data for testing.

---

For further questions or issues, see the README or contact the maintainer.
