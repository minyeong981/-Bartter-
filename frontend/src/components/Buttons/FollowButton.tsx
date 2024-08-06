import GeneralButton from "./GeneralButton";

export default function followButton(
    {isfollow, onClick} :
    { isfollow : boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>
    }) {
    return (
        <div>
            <GeneralButton disabled={isfollow} onClick= {onClick} buttonStyle={{style:'primary', size: 'tiny'}}>팔로우</GeneralButton>
        </div>
    )
}