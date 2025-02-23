import React from "react";
import {EmptyListingStyles} from "@/components/task/styles/TaskFilterStyles";

export const NoTask: React.FC = () => {
    return (
        <EmptyListingStyles>
            <h1>No Events were found matching your criterias</h1>
        </EmptyListingStyles>
    )
}