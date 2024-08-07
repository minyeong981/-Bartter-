import GeneralButton from "./GeneralButton";

export default function followButton(
    {isfollow, onClick} :
    { isfollow : boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>
    }) {
    return (
        <div>
           { isfollow ? ( 
            <GeneralButton 
            onClick= {onClick} 
            buttonStyle={{style:'outlined', size: 'tiny'}}
            >
                언팔로우
            </GeneralButton>)
            : 
            (<GeneralButton 
            onClick= {onClick} 
            buttonStyle={{style:'primary', size: 'tiny'}}
            >
                팔로우
            </GeneralButton>)}
        </div>
    )
}