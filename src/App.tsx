import moment from 'moment';
import ArticlesDashboard from './components/Articles/ArticlesDashboard';
import './styles/main.scss';

const App = () => {

  return (
    <>
      <div className="header">
        <h1>Share your story!</h1>
      </div>
      <ArticlesDashboard />
      <div className="footer">
        <p>Designed and built by Bruno Deilhot &copy; {moment().year()}</p>
      </div>
    </>
  );
}

export default App;
