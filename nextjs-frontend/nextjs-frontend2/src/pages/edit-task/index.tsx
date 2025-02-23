import {useRouter} from "next/router";
import {sanitiseString} from "@/lib/string";
import {EditTask} from "@/components/task/components/EditTask";
import {useTask} from "@/components/task/graphql/useTask";
import {Loading} from "@/components/global/components/Loading";

export default function Task() {
    const router = useRouter();

    const taskId = sanitiseString(router.query.taskId);

    const { data, loading } = useTask(taskId);

    if (loading) return <Loading />

    return (<EditTask task={data?.task} />)
}