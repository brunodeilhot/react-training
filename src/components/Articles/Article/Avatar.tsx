import { IAvatar } from "../../../model/interface";
import moment from "moment";

const Avatar = ({ name, picture, joined }: IAvatar) => {

    return(
        <div className="col-2-30 avatar">
            <div>
                <img src={picture} alt="Avatar"/>
                <span>{name}</span>
            </div>
            <div className="meta">
                <p>Joined {moment(joined).fromNow()}</p>
            </div>
        </div>
    )
};

export default Avatar;