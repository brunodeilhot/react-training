import { IArticleProps, IDefaultState } from "../../../model/interface";
import Avatar from "./Avatar";
import Story from "./Story";
import { useSelector } from "react-redux";
import './styles/main.scss';

const Article = ({ id, title, author, story, created, edited }: IArticleProps) => {


    const userState = useSelector((state: IDefaultState ) => state.users)

    const userData = userState.filter(
            (user: any) => user.id === author
        );

    const user = {...userData[0]}

    return (
        <div className="article">
            <Avatar
                name={user.name}
                picture={user.picture}
                joined={user.joined}
            />
            <Story
                id={id}
                title={title}
                story={story}
                created={created}
                edited={edited}
            />
        </div>
    )
}

export default Article;