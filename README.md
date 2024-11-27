# Project Overview:

Kwamaimai is a dynamic recipe web application for designed users to discover, share, and interact with recipes. The application combines robust search and filtering capabilities with social features, allowing users to rate, review, and save their favorite recipes.

#### Technology Stack

##### Frontend:

- React:
- Next.js

##### Database:

- MongoDB:

##### Backend & API:

- Next.js API Routes

#### Features:

- Search
- Filter
- Sort
- Sign-up/ Log-in
- Favouriting
- Rate & Review
- Edit description
- Edit user profile
- Add to shopping list
- Image Carousel
- Offline usage
- Pagination
- Navigation to recipe details

# Demo

Link: [https://kwamaimai.vercel.app/]

# Installation Instructions

1. Clone the repository:
   git clone <repository_url>

2. Navigate to the project folder:
   ase_group-d

3. Install Dependencies:
   npm install

4. Run the development server
   npm run dev

# Environmental Variables setup

Environment variables are crucial for configuring the app for local development. Here's a step-by-step guide to set up and manage them effectively:

NB! Please use the contact given to get the pairs for the environment variables

1. In the root directory of your project, look for a file named .env or .env.local
2. If no .env file exists, create one.
3. In the .env.local file, write key-value with pairs. Each line represents one environment variable:

#### Server Configuration

- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=your_secret_key

#### Google OAuth

- AUTH_GOOGLE_ID=your_google_client_id
- AUTH_GOOGLE_SECRET=your_google_client_secret

#### Database Configuration

- MONGODB_URI=your_connection_string

# Project Structure

root/
├── .next/
├── app/
├── api/
│ ├── auth/
│ │ └── nextauth/route.js
│ ├── checkuser/route.js
│ └── login/route.js
├── components/
│ ├── ui/
│ │ ├── alert.js
│ │ └── button.js
│ ├── BackButton.js
│ ├── Carousel.js
│ ├── CategoryList.js
│ ├── CollapsibleSection.js
│ ├── EditableRecipeDetails.js
│ ├── FavoriteButton.js
│ ├── FilterButton.js
│ ├── Footer.js
│ ├── Header.js
│ ├── ImageGallery.js
│ ├── IngredientList.js
│ ├── LoadingSpinner.js
│ ├── Pagination.js
│ ├── RecipeCarousel.js
│ ├── RecipeGrid.js
│ ├── Recipes.js
│ ├── ReviewsSection.js
│ ├── SearchBar.js
│ ├── SortControl.js
│ ├── StepsDropdown.js
│ ├── TagList.js
│ ├── ThemeButton.js
│ ├── UserModal.js
│ └── editdetails/
│ └── page.js
├── fonts/
├── hook/
├── images/
├── Recipe/[id]/
├── styles/global.css
├── api.js
├── error.js
├── layout.js
├── loading.js
├── not-found.js
├── page.js
├── providers.js
├── review.js
├── lib/
│ ├── AuthMiddleware.js
│ ├── utils.js
├── components/
├── public/
├── auth.js
├── db.js
├── next.config.mjs
├── packgae-lock.json
├── package.json
├── postcss.config.mjs
├── ReadMe.md
├── tailwind.config.js
├── testConnection.js

# API Documentation

This section outlines the key API endpoints available in the application, their purpose, how to use them, and what responses to expect.

#### BASE URL

http://localhost:3000

##### API Endpoints

This section outlines the key API endpoints available in the application, their purpose, how to use them, and what responses to expect. Each endpoint is hosted on /api/ under the Next.js framework, utilizing serverless functions.

#### 1. Authentication Endpoints

- Route: /api/auth/login, /api/auth/register
- Description: Handles user authentication processes, including login and registration.

##### Methods:

- POST /api/auth/login: Validates user credentials and returns an authentication token.
- POST /api/auth/register: Creates a new user account.
  - Request Body (example):
    json
    Copy code
    {
    "email": "user@example.com",
    "password": "securePassword"
    }

##### Responses:

- 200 OK: Returns authentication token.
- 401 Unauthorized: Invalid credentials.

#### 2. Recipe Endpoints

- Route: /api/recipes
- Description: Handles CRUD operations for recipes.

##### Methods:

- GET /api/recipes: Retrieves a list of recipes.
- POST /api/recipes: Adds a new recipe (requires authentication).
  - Request Body (example for POST):
    json
    Copy code
    {
    "title": "Chocolate Cake",
    "ingredients": ["flour", "sugar", "cocoa powder"],
    "instructions": "Mix ingredients and bake."
    }
    Responses:
    200 OK: List of recipes or confirmation of new recipe creation.
    400 Bad Request: Missing or invalid data.

#### 3. Profile Endpoints

- Route: /api/profile
- Description: Provides user profile data and allows updates.

##### Methods:

- GET /api/profile: Retrieves the current user’s profile.
- PUT /api/profile: Updates user information.

##### Responses:

- 200 OK: User profile details or update confirmation.
- 401 Unauthorized: No valid authentication token provided.

#### 4. Favorites

- Route: /api/favorites
- Description: Manages users' favorite recipes.

##### Methods:

- GET /api/favorites: Retrieves the user’s favorite recipes.
- POST /api/favorites: Adds a recipe to favorites.
- DELETE /api/favorites: Removes a recipe from favorites.

##### - Responses:

- 200 OK: Success messages or list of favorite recipes.

#### 5. Allergens

- Route: /api/allergens
- Description: Allows users to set and manage allergens to filter recipes.

##### Methods:

- GET /api/allergens: Retrieves the user’s allergen list.
- POST /api/allergens: Updates the user’s allergen list.

##### Responses:

- 200 OK: Success messages or updated allergen list.

#### 6. Manifest

- Route: /api/manifest
- Description: Provides application metadata or configuration.

##### Responses:

- 200 OK: JSON containing app version, settings, etc.

#### 7. Reviews

- Route: /api/reviews
- Description: Handles user reviews for recipes.

##### Methods:

- GET /api/reviews?recipeId=<id>: Retrieves reviews for a specific recipe.
- POST /api/reviews: Adds a new review to a recipe.

##### Responses:

200 OK: List of reviews or confirmation of new review.

#### 8. Update

- Route: /api/update
- Description: Checks and applies updates to the application or data.

#### 9. Categories

- Route: /api/recipes/categories
- Description: Retrieves available recipe categories.

##### Methods:

- GET /api/recipes/categories: Fetches a list of recipe categories.

##### Responses:

- 200 OK: List of categories.

#### 10. Ingredients

- Route: /api/ingredients
- Description: Provides ingredient data, including substitutes and availability.

#### 11. Recommendations

- Route: /api/recommendations
- Description: Suggests recipes based on user preferences, history, or trending recipes.

#### 12. Tags

- Route: /api/tags
- Description: Manages recipe tags for better categorization and filtering.

# Contact Information

Email: [groupd.ase@gmail.com]

<!--
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
 -->
