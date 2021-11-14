import { useDispatch } from "react-redux";


const ArticleSearch = () => {

    const dispatch = useDispatch();

    function handleOptionChange (e: any) {
        dispatch({ type: 'SEARCH_OPTION_CHANGE', payload: e.target.value });
    }

    function handleValueChange (e: any) {
        dispatch({ type: 'SEARCH_VALUE_CHANGE', payload: e.target.value })
    }

    return(
        <div className="search">
            <select onChange={handleOptionChange} className="search-select">
                <option value="title">Title</option>
                <option value="author">Author</option>
            </select>
            <div><i className="gg-search"/></div>
            <input onChange={handleValueChange} className="input" type="text" />
        </div>
    )
};

export default ArticleSearch;