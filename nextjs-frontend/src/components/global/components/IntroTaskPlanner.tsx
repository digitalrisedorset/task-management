import {IntroStyle} from "@/components/global/components/home/styles/HomeStyles";
import {TaskStyles} from "@/components/global/styles/NavStyles";
import Link from "next/link";
import {useUser} from "@/components/user-authentication/hooks/useUser";

const IntroTaskPlanner: React.FC = () => {
    const user = useUser()

    const nextStep = user? '/tasks': '/signin'

    return (
        <IntroStyle>
            <div className="content">
                <h2>The Task Planner</h2>
                <p className="general">A simple and practical pocket tool for you to have a list of your priorities at your hands in all places</p>
                <TaskStyles>
                    <Link href={nextStep}>View your tasks</Link>
                </TaskStyles>
                <p className="ethos">Keep your tasks organised and unlock your full potential by freeing your mind with remembering where these sits in the schedule</p>
            </div>
            <div className="illustration">

            </div>
        </IntroStyle>
    )
}

export default IntroTaskPlanner