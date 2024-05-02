
export default function Alert({ alertType, alertContent }: Props) {

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 ">
                <div role="alert" className={"alert w-1/2 " + alertType} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{alertContent}</span>
                </div>
            </div>
        </>
    )
}


type Props = {
    alertType: "alert-info" | "alert-success" | "alert-warning" | "alert-error";
    alertContent: string;
}