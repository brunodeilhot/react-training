import ArticleList from "./ArticleList";
import ArticleForm from "./ArticleForm";
import './styles/main.scss';

const ArticlesDashboard = () => {

    return (
        <div className="dashboard">
            <ArticleForm />
            <ArticleList />
        </div>

    )

}

export default ArticlesDashboard;