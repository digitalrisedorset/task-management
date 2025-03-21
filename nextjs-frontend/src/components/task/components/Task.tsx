import {getDate} from "@/lib/date";
import {TaskStyles} from "@/components/task/styles/TaskFilterStyles";
import {KeystoneTask} from "@/components/task/types/task";
import {useRouter} from "next/router";
import {useUpdateTask} from "@/components/task/graphql/useUpdateTask";
import {useTasks} from "@/components/task/graphql/useUserTasks";

interface TaskProps {
    task: KeystoneTask
}

export const Task: React.FC<TaskProps> = ({task}: TaskProps) => {
    const router = useRouter()
    const [updateTask] = useUpdateTask()
    const { refetch } = useTasks();

    async function handleClick(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        router.push({pathname: `/edit-task/${task.id}`});
    }

    async function handleComplete(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        await updateTask({
            variables: {
                "data": { completedAt: new Date().toISOString() },
                "where": { "id": task.id }
            }
        }).catch(console.error);

        refetch();
    }

    return (
        <TaskStyles>
            <span className="title">{task.label}</span>
            <span className="priority">{task.priority}</span>
            {task.estimatedTime>0 && <span className="estimatedTime">{task.estimatedTime} mins</span>}
            <span className="description">{task.description}</span>
            <span className="date-created">created at:<br/> {getDate(task.createdAt)}</span>
            {task.completedAt !== null &&
                <span className="date-completed">completed at:<br/> {getDate(task.completedAt)}</span>}
            <button type="button" onClick={handleClick}>
                Edit
            </button>
            {task.completedAt === null && <button type="button" onClick={handleComplete}>
                Complete
            </button>}
        </TaskStyles>
    )
}