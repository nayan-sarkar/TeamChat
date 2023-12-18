import './Avatar.css';

export default function Avatar(props){
    return (
        <div className = "avatar">
            <img
                src = {props.src}
                alt = "user-avatar"
            />
        </div>
    )
}