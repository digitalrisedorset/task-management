import {useTasks} from "@/components/task/graphql/useUserTasks";
import {Loading} from "@/components/global/components/Loading";
import {Task} from "@/components/task/components/Task";
import {NoTask} from "@/components/task/components/NoTask";
import {TaskList} from "@/components/task/styles/TaskFilterStyles";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {KeystoneTask} from "@/components/task/types/task";

export const UserTaskList: React.FC = () => {
    const { data, loading } = useTasks()
    const user = useUser()

    if (loading) return <Loading />
    if (!user) return <>Protected content</>

    return (<TaskList>
        {data?.tasks.length > 0 && data?.tasks.map(
            (task: KeystoneTask) => <Task key={task.id} task={task} />
        )}
        {data?.tasks.length === 0 && <NoTask />}
    </TaskList>
    )
}