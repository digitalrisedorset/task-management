import {useRouter} from "next/router";
import {useForm} from "@/components/global/hooks/useForm";
import {Form} from "@/components/global/styles/Form";
import {Feedback} from "@/components/global/components/Feedback";
import {useCreateTaskTopic} from "@/components/tasktopic/graphql/useTaskTopicCreate";
import {useTaskTopic} from "@/components/tasktopic/graphql/useTaskTopic";

export const NewTaskTopic: React.FC = () => {
    const router = useRouter();
    const { inputs, handleChange, resetForm } = useForm({
        label: '',
    });
    const [createTaskTopic] = useCreateTaskTopic(inputs)
    const topic = useTaskTopic();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await createTaskTopic().catch(console.error);
        resetForm();
        router.push({pathname: `/`});
    }
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Create New Topic</h2>
            <Feedback />
            <fieldset>
                <label htmlFor="name">
                    Title
                    <input
                        required
                        type="text"
                        name="label"
                        placeholder="Topic Title"
                        autoComplete="label"
                        value={inputs.label}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    );
}
