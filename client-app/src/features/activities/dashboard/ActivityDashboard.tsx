import React, { SyntheticEvent, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityStore from '../../../app/stores/activityStore'

interface IProps {
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (selectedActivity: IActivity | null) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}


const ActivityDashboard: React.FC<IProps> = ({
    setEditMode,
    setSelectedActivity,
    editActivity,
    deleteActivity,
    submitting,
    target,
}) => {

    const activityStore = useContext(ActivityStore);
    const { editMode, selectedActivity } = activityStore;

    return (
        <Grid>

            {/* List */}
            <Grid.Column width={10}>
                <ActivityList
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                    target={target}
                />
            </Grid.Column>

            {/* Details and Form  */}
            <Grid.Column width={6}>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetails
                            setEditMode={setEditMode}
                            setSelectedActivity={setSelectedActivity}
                    />
                }
                {
                    editMode &&
                    <ActivityForm
                        key={selectedActivity ? selectedActivity.id : 0}
                        initialActivity={selectedActivity}
                        setEditMode={setEditMode}
                        editActivity={editActivity}
                        submitting={submitting}
                    />
                }
                
            </Grid.Column>
        </Grid>
    );
};


export default observer(ActivityDashboard);