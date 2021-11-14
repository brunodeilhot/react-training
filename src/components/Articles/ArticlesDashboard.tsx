import ArticleList from "./ArticleList";
import ArticleForm from "./ArticleForm";
import ArticleSearch from "./ArticleSearch";
import './styles/main.scss';

const ArticlesDashboard = () => {

    return (
        <div className="dashboard">
            <ArticleForm />
            <ArticleSearch />
            <ArticleList />
        </div>

    )

}

export default ArticlesDashboard;