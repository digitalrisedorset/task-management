import {useRouter} from "next/router";
import {sanitiseString} from "@/lib/string";
import {Loading} from "@/components/global/components/Loading";
import {useTask} from "@/components/task/graphql/useTask";
import {Task} from "@/components/task/components/Task";

export default function View() {
    const router = useRouter();

    const taskId = sanitiseString(router.query.taskId);

    const { data, loading } = useTask(taskId);

    if (loading) return <Loading />

    return (<Task task={data?.task} />)
}