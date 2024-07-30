import { FaSearch } from "react-icons/fa";

interface SearchSuggestionsProps {
    query: string;
    suggestions: string[];
    onSearch: (searchTerm: string) => void
}
export default function SearchSuggestion({query, suggestions, onSearch} :SearchSuggestionsProps) {
    return (
        <div>
            { suggestions.map((suggestion, index) => (

                <div key={index} onClick={() => onSearch(suggestion)}>
                    <FaSearch />
                    {suggestion}
                    </div>
            ))}
        </div>
    )
}