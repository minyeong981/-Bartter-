
import GeneralButton from "./GeneralButton";

export default function followButton(
    {isfollow, onClick, isDisabled} :
    { isfollow : boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    isDisabled?:boolean;
    }) {
    return ( isfollow ? ( 
            <GeneralButton 
            onClick= {onClick} 
            buttonStyle={{style:'outlined', size: 'tiny'}}
            disabled={isDisabled}
            >
                언팔로우
            </GeneralButton>)
            : 
            (<GeneralButton 
            onClick= {onClick} 
            buttonStyle={{style:'primary', size: 'tiny'}}
            disabled={isDisabled}
            >
                팔로우
            </GeneralButton>)
    )
}