import {createContext, ReactNode, useContext} from "react";
import {useImmer} from "use-immer";

interface TaskTopicInfoState {
    activeTopicId: string | undefined,
}

interface TaskTopicState {
    topicState: TaskTopicInfoState,
    resetActiveTaskTopic: () => void
    toggleActiveTaskTopic: (id: string) => void
}

const intialState: TaskTopicInfoState = {
    activeTopicId: ''
}

const LocalStateContext = createContext<TaskTopicState | undefined>(undefined);
const LocalStateProvider = LocalStateContext.Provider;

interface TaskTopicStateProviderProps {
    children: ReactNode;
}

const TopicStateProvider: React.FC<TaskTopicStateProviderProps> = ({ children }) => {
    const [state, setState] = useImmer<TaskTopicInfoState>(intialState);

    const toggleActiveTaskTopic = (id: string) => {
        setState(draft => { draft.activeTopicId = id });
    }

    const resetActiveTaskTopic = () => {
        setState(draft => { draft.activeTopicId = undefined });
    }

    return <LocalStateProvider
        value={{
            resetActiveTaskTopic,
            toggleActiveTaskTopic,
            topicState: state
        }}
    >{children}</LocalStateProvider>
}

function useTaskTopicState(): TaskTopicState {
    const context = useContext(LocalStateContext)
    if (!context) {
        throw new Error("useTaskTopicState must be used within a LocalStateProvider");
    }
    return context;
}

export { TopicStateProvider, useTaskTopicState }