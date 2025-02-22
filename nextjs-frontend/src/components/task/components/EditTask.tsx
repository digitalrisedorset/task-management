import {useForm} from "@/components/global/hooks/useForm";
import {Form} from "@/components/global/styles/Form";
import {Feedback} from "@/components/global/components/Feedback";
import {useUpdateTask} from "@/components/task/graphql/useUpdateTask";
import {KeystoneTask} from "@/components/task/types/task";
import {router} from "next/client";
import {TopicSelect} from "@/components/task/components/Task/TopicSelect";
import {useTaskTopicState} from "@/state/TopicStateProvider";

export interface EditTaskProps {
    task: KeystoneTask
}

export const EditTask: React.FC<EditTaskProps> = ({task}: EditTaskProps) => {
     const { inputs, handleChange, resetForm } = useForm({
         label: task.label,
         description: task.description,
         estimatedTime: Number(task.estimatedTime),
         priority: Number(task.priority)
     })
    const [updateTask] = useUpdateTask()
    //const [improvedDescription, setimprovedDescription] = useState('')
    const {topicState} = useTaskTopicState();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await updateTask({
            variables: {
                "data": {
                    label: inputs?.label,
                    description: inputs?.description,
                    topic: {
                        connect: {
                            id: topicState.activeTopicId || task.topic.id
                        }
                    },
                    estimatedTime: Number(inputs?.estimatedTime),
                    priority: Number(inputs?.priority)
                },
                "where": {
                    "id": task.id
                },
            }
        }).catch(console.error);
        resetForm();
        router.push({pathname: `/`});
    }

    // const handleTextImprovement = async (e: any) => {
    //     e.preventDefault();
    //     const newtext = await improveText(inputs.description)
    //     setimprovedDescription(newtext)
    // }

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
                        value={inputs?.label}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        required
                        name="description"
                        rows={6}
                        placeholder="Description"
                        value={inputs?.description}
                        onChange={handleChange}
                    />
                </label>
                {/*<label htmlFor="improved-description">*/}
                {/*    Improved Description*/}
                {/*    <textarea*/}
                {/*        required*/}
                {/*        name="improved-description"*/}
                {/*        rows={6}*/}
                {/*        placeholder="AI Input"*/}
                {/*        value={improvedDescription}*/}
                {/*    />*/}
                {/*</label>*/}
                <label htmlFor="improved-description">
                    Task Topic
                    <TopicSelect task={task}/>
                </label>
                {/*<button type="button" className="openai-button" onClick={handleTextImprovement}>Suggest Improvements
                </button>*/}
                <label htmlFor="estimatedTime">
                    Estimated Time
                    <input
                        required
                        type="number"
                        name="estimatedTime"
                        placeholder="Estimated Time"
                        value={inputs?.estimatedTime}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="priority">
                    Priority
                    <input
                        required
                        type="number"
                        name="priority"
                        placeholder="Priority"
                        value={inputs?.priority}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    );
}
