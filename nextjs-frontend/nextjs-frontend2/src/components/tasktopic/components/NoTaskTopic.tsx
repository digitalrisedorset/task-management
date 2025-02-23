import React from "react";
import {EmptyListingStyles} from "@/components/tasktopic/styles/TaskTopicFilterStyles";

export const NoTaskTopic: React.FC = () => {
    return (
        <EmptyListingStyles>
            <h1>No Events were found matching your criterias</h1>
        </EmptyListingStyles>
    )
}