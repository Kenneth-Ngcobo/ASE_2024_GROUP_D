export const sortRecipes = (recipes, sortBy, sortOrder) => {
    if (!recipes || recipes.length === 0) return recipes;

    let sorted = [...recipes];

    switch (sortBy) {
        case 'createdAt':
            // Ensure proper date comparison with fallback
            sorted.sort((a, b) => {
                const createdAtA = new Date(a.published || 0);
                const createdAtB = new Date(b.published || 0);
                return createdAtB - createdAtA; // Newest first by default
            });
            break;
        case 'prepTime':
            sorted.sort((a, b) => {
                // Convert to numbers and handle invalid values
                const timeA = parseInt(a.prep) || 0;
                const timeB = parseInt(b.prep) || 0;
                const diff = timeA - timeB;
                return sortOrder === 'ascending' ? diff : -diff;
            });
            break;
        case 'cookTime':
            sorted.sort((a, b) => {
                // Convert to numbers and handle invalid values
                const timeA = parseInt(a.cook) || 0;
                const timeB = parseInt(b.cook) || 0;
                const diff = timeA - timeB;
                return sortOrder === 'ascending' ? diff : -diff;
            });
            break;
        case 'instructions':
            sorted.sort((a, b) => {
                // Get the length of instructions array, defaulting to 0 if not an array
                const instructionsA = Array.isArray(a.instructions) ? a.instructions.length : 0;
                const instructionsB = Array.isArray(b.instructions) ? b.instructions.length : 0;
                const diff = instructionsA - instructionsB;
                return sortOrder === 'ascending'
                    ? instructionsA - instructionsB
                    : instructionsA - instructionsB;
            });
            break;
        default:
            return recipes;
    }

    return sorted;
};
