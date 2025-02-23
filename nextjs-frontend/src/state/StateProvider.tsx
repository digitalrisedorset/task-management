import {FlashMessageProvider} from "@/state/FlassMessageState";
import {TopicStateProvider} from "@/state/TopicStateProvider";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return  <FlashMessageProvider>
                <TopicStateProvider>
                 {children}
                </TopicStateProvider>
            </FlashMessageProvider>;
}