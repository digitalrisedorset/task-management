import {TaskTopicStyles} from "@/components/tasktopic/styles/TaskTopicFilterStyles";
import {KeystoneTaskTopic} from "@/components/tasktopic/types/tasktopic";

interface TaskTopicProps {
    tasktopic: KeystoneTaskTopic
}

export const TaskTopic: React.FC<TaskTopicProps> = ({tasktopic}: TaskTopicProps) => {
    return (
        <TaskTopicStyles>
            <span className="title">{tasktopic.label}</span>
        </TaskTopicStyles>
    )
}