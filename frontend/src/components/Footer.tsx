import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch, faBuilding, faUsers } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {

    return (
        <>
            <footer className="footer footer-center p-10 bg-neutral text-neutral-content bottom-0  mb-0">
                <aside>
                    <p className="font-bold text-lg">
                        School of Applied Technology
                    </p>
                    <p><br />Pontus Löfgren <br />Xinnan Luo <br />Zerophymyr Falk <br />Patricia van Marlen</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                    <div className="tooltip" data-tip="Github repository">
                            <a href="https://github.com/RefLink-GradProject/RefLink-App">
                                <FontAwesomeIcon icon={faCodeBranch} size='xl' />
                            </a>
                        </div>
                        <div className="tooltip" data-tip="Github organization">
                            <a href="https://github.com/RefLink-GradProject">
                            <FontAwesomeIcon icon={faUsers} size='xl' />
                            </a>
                        </div>
                        <div className="tooltip " data-tip="&lt;/Salt&gt;">
                            <a href="https://salt.dev/">
                            <FontAwesomeIcon icon={faBuilding} size='xl' />
                            </a>
                        </div>
                    </div>
                </nav>
            </footer>

        </>
    )
}
