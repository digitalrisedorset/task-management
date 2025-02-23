import NavStyles from "@/components/global/styles/NavStyles";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import Link from "next/link";
import {SignOut} from "@/components/user-authentication/components/SignOut";

export const Nav: React.FC = () => {
    const user = useUser();

    return (
        <NavStyles>
            {user && (
                <>
                    <Link href="/create-task">Create Task</Link>
                    <Link href="/create-topic">Create Topic</Link>
                    <SignOut/>
                </>)}
            {!user && (
                <>
                    <Link href="/signin">Sign In</Link>
                    <Link href="/signup">Sign Up</Link>
                </>
            )}
        </NavStyles>
    );
}