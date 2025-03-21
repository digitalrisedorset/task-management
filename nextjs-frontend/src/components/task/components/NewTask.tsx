import {useRouter} from "next/router";
import {useForm} from "@/components/global/hooks/useForm";
import {Form} from "@/components/global/styles/Form";
import {Feedback} from "@/components/global/components/Feedback";
import {useCreateTask} from "@/components/task/graphql/useTaskCreate";
import {TextArea} from "@/components/global/components/Input/TextArea";
import {useTaskTopic} from "@/components/tasktopic/graphql/useTaskTopic";
import {Loading} from "@/components/global/components/Loading";

export const NewTask: React.FC = () => {
    const router = useRouter();
    const { inputs, handleChange, resetForm } = useForm({
        label: '',
        description: '',
    });
    const [createTask] = useCreateTask(inputs)
    const {data , loading} = useTaskTopic()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await createTask().catch(console.error);
        resetForm();
        router.push({pathname: `/tasks`});
    }

    if (loading) return <Loading />

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Create New Task</h2>
            <Feedback />
            <fieldset>
                <label htmlFor="topic">
                    Topic
                    <input
                        type="text"
                        name="label"
                        placeholder="Task Topic"
                        value={data.taskTopic.label}
                        readOnly={true}
                    />
                </label>
                <label htmlFor="name">
                    Title
                    <input
                        required
                        type="text"
                        name="label"
                        placeholder="Task Title"
                        autoComplete="label"
                        value={inputs.label}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="email">
                    Description
                    <TextArea
                        name="description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    );
}
