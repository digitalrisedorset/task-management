import {useRouter} from "next/router";
import {useForm} from "@/components/global/hooks/useForm";
import {Form} from "@/components/global/styles/Form";
import {Feedback} from "@/components/global/components/Feedback";
import {useCreateTask} from "@/components/task/graphql/useTaskCreate";

export const NewTask: React.FC = () => {
    const router = useRouter();
    const { inputs, handleChange, resetForm } = useForm({
        label: '',
        description: '',
    });
    const [createTask] = useCreateTask(inputs)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await createTask().catch(console.error);
        resetForm();
        router.push({pathname: `/`});
    }
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Create New Task</h2>
            <Feedback />
            <fieldset>
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
                    <textarea
                        required
                        name="description"
                        rows={6}
                        placeholder="Description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    );
}
