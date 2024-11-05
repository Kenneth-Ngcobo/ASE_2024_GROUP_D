export const SORT_OPTIONS = {
    DEFAULT: 'default',
    CREATED_AT: 'createdAt',
    PREP_TIME: 'prepTime',
    COOK_TIME: 'cookTime',
    INSTRUCTIONS: 'instructions'
};

export const SORT_ORDERS = {
    ASC: 'ascending',
    DESC: 'descending'
};

// Helper to safely parse time values
const parseTime = (timeStr) => {
    const parsed = parseInt(timeStr);
    return isNaN(parsed) ? 0 : parsed;
};

// Helper to safely get array length
const getArrayLength = (arr) => Array.isArray(arr) ? arr.length : 0;

// Enhanced sorting utility with type safety and error handling
export const sortRecipes = (recipes, sortBy = SORT_OPTIONS.DEFAULT, sortOrder = SORT_ORDERS.ASC) => {
    if (!Array.isArray(recipes) || !recipes.length) return recipes;

    const sorted = [...recipes];

    const compareValues = (a, b, order = SORT_ORDERS.ASC) => {
        if (a === b) return 0;
        const multiplier = order === SORT_ORDERS.ASC ? 1 : -1;
        return ((a < b) ? -1 : 1) * multiplier;
    };

    // Define sorting strategies based on sortBy options
    const sortingStrategies = {
        [SORT_OPTIONS.CREATED_AT]: (a, b) => {
            const dateA = new Date(a.published || 0).getTime();
            const dateB = new Date(b.published || 0).getTime();
            return compareValues(dateB, dateA, SORT_ORDERS.DESC);
        },
        [SORT_OPTIONS.PREP_TIME]: (a, b) => {
            const timeA = parseTime(a.prep);
            const timeB = parseTime(b.prep);
            return compareValues(timeA, timeB, sortOrder);
        },
        [SORT_OPTIONS.COOK_TIME]: (a, b) => {
            const timeA = parseTime(a.cook);
            const timeB = parseTime(b.cook);
            return compareValues(timeA, timeB, sortOrder);
        },
        [SORT_OPTIONS.INSTRUCTIONS]: (a, b) => {
            const lenA = getArrayLength(a.instructions);
            const lenB = getArrayLength(b.instructions);
            return compareValues(lenA, lenB, sortOrder);
        }
    };

    // Use the appropriate sorting strategy or a no-op if none is matched
    return sorted.sort(sortingStrategies[sortBy] || (() => 0));
};  
