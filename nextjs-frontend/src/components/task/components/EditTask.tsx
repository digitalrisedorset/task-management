import {useForm} from "@/components/global/hooks/useForm";
import {Form} from "@/components/global/styles/Form";
import {Feedback} from "@/components/global/components/Feedback";
import {useUpdateTask} from "@/components/task/graphql/useUpdateTask";
import {KeystoneTask} from "@/components/task/types/task";
import {router} from "next/client";
import {TopicSelect} from "@/components/task/components/Task/TopicSelect";
import {useTaskTopicState} from "@/state/TopicStateProvider";
import {TextArea} from "@/components/global/components/Input/TextArea";
import React from "react";

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
    //const [improvedDescription, setImprovedDescription] = useState('')
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

    // const handleTextImprovement = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (inputs.description!== '') {
    //         const newtext = await improveText(inputs.description as string)
    //         setImprovedDescription(newtext)
    //     }
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
                    <TextArea
                        name="description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                {/*<label htmlFor="improved-description">*/}
                {/*    Improved Description*/}
                {/*    <textarea*/}
                {/*        name="improved-description"*/}
                {/*        rows={6}*/}
                {/*        placeholder="AI Input"*/}
                {/*        value={improvedDescription}*/}
                {/*        onChange={(e: ChangeEventHandler<HTMLTextAreaElement>) => setImprovedDescription(e.target.value)}*/}
                {/*    />*/}
                {/*</label>*/}
                {/*<button type="button" className="openai-button" onClick={handleTextImprovement}>Suggest Improvements*/}
                {/*</button>*/}
                <label htmlFor="improved-description">
                    Task Topic
                    <TopicSelect task={task}/>
                </label>
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
