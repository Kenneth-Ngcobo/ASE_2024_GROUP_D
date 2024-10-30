export const sortRecipes = (recipes, sortBy, sortOrder) => {
    if (!recipes?.length) return recipes;

    const sorted = [...recipes];
    const compareValues = (a, b, order = 'ascending') => {
        const multiplier = order === 'ascending' ? 1 : -1;
        return (a - b) * multiplier;
    };

    const sortingStrategies = {
        createdAt: (a, b) => {
            const dateA = new Date(a.published || 0).getTime();
            const dateB = new Date(b.published || 0).getTime();
            return compareValues(dateB, dateA, 'descending'); // Newest first by default
        },
        prepTime: (a, b) => {
            const timeA = parseInt(a.prep) || 0;
            const timeB = parseInt(b.prep) || 0;
            return compareValues(timeA, timeB, sortOrder);
        },
        cookTime: (a, b) => {
            const timeA = parseInt(a.cook) || 0;
            const timeB = parseInt(b.cook) || 0;
            return compareValues(timeA, timeB, sortOrder);
        },
        instructions: (a, b) => {
            const lenA = Array.isArray(a.instructions) ? a.instructions.length : 0;
            const lenB = Array.isArray(b.instructions) ? b.instructions.length : 0;
            return compareValues(lenA, lenB, sortOrder);
        }
    };

    return sorted.sort(sortingStrategies[sortBy] || (() => 0));
};
